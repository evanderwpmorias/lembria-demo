"""Google Search Agent definition for ADK Gemini Live API Toolkit demo."""

import os

from google.adk.agents import Agent
from google.adk.tools import google_search


def _default_model() -> str:
    """Choose a sensible default model for the current runtime."""
    use_vertex = os.getenv("GOOGLE_GENAI_USE_VERTEXAI", "FALSE").upper() == "TRUE"
    if use_vertex:
        return "gemini-2.5-flash"
    return "gemini-2.5-flash-native-audio-preview-12-2025"

# Default models for Live API with native audio support:
# - Gemini Live API: gemini-2.5-flash-native-audio-preview-12-2025
# - Vertex AI Agent Engine / text workloads: gemini-2.5-flash
agent = Agent(
    name="google_search_agent",
    model=os.getenv("DEMO_AGENT_MODEL", _default_model()),
    tools=[google_search],
    instruction="You are a helpful assistant that can search the web.",
)
