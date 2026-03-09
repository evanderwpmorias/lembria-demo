import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false,
  experimental: {
    websocket: true
  },
  alias: {
    '@': __dirname,
    '~': __dirname,
  },
  runtimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY,
    googleGenaiUseVertexai: process.env.GOOGLE_GENAI_USE_VERTEXAI,
    agentModel: process.env.DEMO_AGENT_MODEL,
  }
});
