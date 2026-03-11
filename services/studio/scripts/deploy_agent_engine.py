import argparse
import os
import sys
from pathlib import Path

import vertexai
from vertexai import agent_engines


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-id", required=True)
    parser.add_argument("--region", default="us-central1")
    parser.add_argument("--display-name", default="studio-google-search-agent")
    parser.add_argument("--staging-bucket", required=True)
    parser.add_argument("--agent-path", default="app/google_search_agent")
    parser.add_argument("--requirements-file")
    parser.add_argument("--model", default="gemini-2.5-flash")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    agent_path = (repo_root / args.agent_path).resolve()
    if not agent_path.exists():
        raise FileNotFoundError(f"Agent path not found: {agent_path}")

    requirements_path = (
        (repo_root / args.requirements_file).resolve()
        if args.requirements_file
        else (agent_path / "requirements.txt").resolve()
    )
    if not requirements_path.exists():
        raise FileNotFoundError(f"Requirements file not found: {requirements_path}")

    sys.path.insert(0, str(agent_path.parent))

    os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "TRUE"
    os.environ["DEMO_AGENT_MODEL"] = args.model

    from google_search_agent.agent import agent

    vertexai.init(
        project=args.project_id,
        location=args.region,
        staging_bucket=args.staging_bucket,
    )

    remote_app = agent_engines.create(
        agent_engine=agent,
        requirements=str(requirements_path),
        extra_packages=[str(agent_path)],
        display_name=args.display_name,
        env_vars={
            "GOOGLE_GENAI_USE_VERTEXAI": "TRUE",
            "DEMO_AGENT_MODEL": args.model,
        },
    )

    print(f"Deployment finished: {remote_app.resource_name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())