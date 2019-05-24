base="$(dirname $0)"
mkdir -p "$base/tmp"
mkdir -p "$base/tmp/core"
mkdir -p "$base/core"

rm -rf "$base/tmp"/*
rm -rf "$base/core"/*

version=$1

url=https://github.com/h5p/h5p-php-library/archive/$version.zip

wget $url -O"$base/tmp/core.zip"
unzip -a "$base/tmp/core.zip" -d"$base/tmp/core"
mv "$base/tmp/core/h5p-php-library-$version"/* "$base/core/"

rm -rf "$base/tmp"