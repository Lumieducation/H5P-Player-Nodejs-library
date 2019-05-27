base="$(dirname $0)"

"$base/download-core.sh" 1.22.0
node "$base/scrape-examples.js" > "$base/examples.json"