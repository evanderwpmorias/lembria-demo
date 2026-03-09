import { defineWebSocketHandler } from "h3";
import { InMemoryRunner, StreamingMode, type RunConfig,   } from "@google/adk";
import type { Peer } from "crossws";
import { createUserContent } from "@google/genai";

import { agent } from "@/server/agents/liveAgent/agent";


const config: RunConfig = {
  streamingMode: StreamingMode.BIDI,
    // supportCfc: true,
};


const runner = new InMemoryRunner({ 
    agent: agent,
    appName: "lembria-demo",
});

const decoder = new TextDecoder();

const extractTextFromPayload = (payload: unknown): string | null => {
  if (typeof payload === "string") {
    return payload;
  }

  if (payload instanceof Uint8Array) {
    return decoder.decode(payload);
  }

  if (payload instanceof ArrayBuffer) {
    return decoder.decode(new Uint8Array(payload));
  }

  if (payload && typeof payload === "object") {
    if ("text" in payload && typeof payload.text === "function") {
      const text = payload.text();
      return typeof text === "string" ? text : null;
    }

    if ("data" in payload) {
      return extractTextFromPayload((payload as { data?: unknown }).data);
    }
  }

  return null;
};

const normalizeIncomingMessage = (message: unknown): string | null => {
  const rawText = extractTextFromPayload(message)?.trim();

  if (!rawText) {
    return null;
  }

  if (!rawText.startsWith("{")) {
    return rawText;
  }

  try {
    const parsed = JSON.parse(rawText) as {
      message?: unknown;
      text?: unknown;
      prompt?: unknown;
      type?: unknown;
    };

    if (parsed.type === "ping") {
      return "ping";
    }

    const candidate = [parsed.message, parsed.text, parsed.prompt].find(
      (value): value is string => typeof value === "string" && value.trim().length > 0,
    );

    return candidate?.trim() ?? rawText;
  } catch {
    return rawText;
  }
};

// Store sessions per peer
const sessions = new Map<string, any>();

// Learn more: https://nitro.build/guide/routing
export default defineWebSocketHandler({
  async open(peer: Peer) {
    console.log("[ws] open", peer.id);
    
    // Create session for this peer
    const session = await runner.sessionService.createSession({
      userId: peer.id,
      appName: "lembria-demo"
    });
    
    sessions.set(peer.id, session);
    peer.send(JSON.stringify({ user: "system", message: "Connected to Lembria Demo Agent" }));
  },

  async message(peer: Peer, message: any) {
    console.log("[ws] message", peer.id, message);

    const text = normalizeIncomingMessage(message);

    if (!text) {
      peer.send(JSON.stringify({
        user: "system",
        message: "Error: Empty or unsupported message payload",
      }));
      return;
    }
    
    // Handle ping
    if (text.toLowerCase() === "ping") {
      peer.send(JSON.stringify({ user: "system", message: "pong" }));
      return;
    }
    
    const session = sessions.get(peer.id);
    console.log("[ws] session for peer", peer.id, session);
    if (!session) {
      peer.send(JSON.stringify({ user: "system", message: "Error: No session found" }));
      return;
    }
    
    try {
      // Run the agent with the input
      const events = runner.runAsync({
        sessionId: session.id,
        userId: peer.id,
        newMessage: createUserContent(text),
        runConfig: config,
      });
      
      for await (const event of events) {
        const messageText = event.content?.parts
          ?.map((part) => part.text || "")
          .join("")
          .trim();

        if (!messageText) {
          continue;
        }

        peer.send(JSON.stringify({ 
          user: event.author || "agent", 
          message: messageText 
        }));
      }
    } catch (error: any) {
      console.error("[ws] error processing message:", error);
      peer.send(JSON.stringify({ user: "system", message: `Error: ${error.message}` }));
    }
  },

  close(peer: Peer, event: any) {
    console.log("[ws] close", peer.id, event);
    sessions.delete(peer.id);
  },

  error(peer: Peer, error: Error) {
    console.log("[ws] error", peer.id, error);
  },
});