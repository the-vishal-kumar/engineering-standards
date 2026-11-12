#!/usr/bin/env bash
# Docs checks. Each one runs a pinned tool in Docker, so Docker is the only
# local requirement. CI runs the same script.
#
#   scripts/check-docs.sh            # all checks
#   scripts/check-docs.sh lint-md    # one check: lint-md | links | mermaid
set -euo pipefail
cd "$(dirname "$0")/.."

markdownlint_image="davidanson/markdownlint-cli2:v0.18.1"
lychee_image="lycheeverse/lychee:0.24.2"
user="$(id -u):$(id -g)"

lint_md() {
  docker run --rm --user "$user" -v "$PWD":/workdir "$markdownlint_image" "**/*.md"
}

links() {
  docker run --rm --user "$user" -e GITHUB_TOKEN -v "$PWD":/src -w /src \
    "$lychee_image" --no-progress --config lychee.toml .
}

mermaid() {
  scripts/check-mermaid.sh
}

case "${1:-all}" in
  lint-md) lint_md ;;
  links) links ;;
  mermaid) mermaid ;;
  all) lint_md && links && mermaid ;;
  -h | --help) sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//' ;;
  *) echo "unknown check: $1 (use lint-md, links, mermaid or all)" >&2; exit 2 ;;
esac
