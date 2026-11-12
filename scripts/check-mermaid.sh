#!/usr/bin/env bash
# Renders every ```mermaid block in tracked Markdown files with mermaid-cli,
# so a syntax error fails CI instead of showing "Unable to render" on GitHub.
set -euo pipefail

image="${MERMAID_IMAGE:-minlag/mermaid-cli:11.17.1}"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

count=0
while IFS= read -r -d '' file; do
  count=$(awk -v dir="$work" -v src="$file" -v n="$count" '
    /^```mermaid[[:space:]]*$/ { inblock = 1; n++; out = sprintf("%s/%03d.mmd", dir, n); print src ":" NR > (dir "/" sprintf("%03d", n) ".src"); next }
    inblock && /^```[[:space:]]*$/ { inblock = 0; close(out); next }
    inblock { print > out }
    END { print n }
  ' "$file")
done < <(git ls-files -z -- '*.md')

if [ "$count" -eq 0 ]; then
  echo "No mermaid blocks found."
  exit 0
fi

chmod 755 "$work"
chmod 644 "$work"/*
docker run --rm -v "$work":/diagrams:ro --entrypoint sh "$image" -c '
  status=0
  for f in /diagrams/*.mmd; do
    src="$(cat "${f%.mmd}.src")"
    if /home/mermaidcli/node_modules/.bin/mmdc -p /puppeteer-config.json -q -i "$f" -o "/tmp/$(basename "$f").svg" >/tmp/log 2>&1; then
      echo "ok    $src"
    else
      echo "FAIL  $src"; grep -v "^ *at " /tmp/log | sed "s/^/      /"; status=1
    fi
  done
  exit $status
'
echo "Checked $count mermaid block(s)."
