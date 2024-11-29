#!/bin/sh

echo "delete docs"
rm -rf docs
echo "build project ithome2024-demos starts"
ng build --project=$1 --output-path docs
cp ./docs/browser/index.html  ./docs/browser/404.html
cp ./docs/browser/*  ./docs
rm -rf ./docs/browser
echo 'build project finishes'