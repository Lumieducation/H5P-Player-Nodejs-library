base=$(dirname $0)
mkdir -p "$base/tmp"
mkdir -p "$base/contents"
rm -rf "$base/tmp"/*

url=$1
echo "Downloading $url"

name=$(basename "$url")
wget "$url" -O"$base/tmp/$name"
unzip -a "$base/tmp/$name" -d"$base/contents/$name"

rm -rf "$base/tmp"