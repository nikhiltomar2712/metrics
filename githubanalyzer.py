#!/usr/bin/env python3
import os
import sys
import json
from github_metrics import analyze_repository_health


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 githubanalyzer.py <owner/repo> [--token TOKEN]")
        sys.exit(1)

    repo_path = sys.argv[1]
    token = os.getenv("GITHUB_TOKEN")
    if "--token" in sys.argv:
        token_idx = sys.argv.index("--token")
        if token_idx + 1 < len(sys.argv):
            token = sys.argv[token_idx + 1]

    if "/" not in repo_path:
        print("Invalid repository format. Use: owner/repo")
        sys.exit(1)

    owner, repo = repo_path.split("/", 1)
    result = analyze_repository_health(owner, repo, token)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
