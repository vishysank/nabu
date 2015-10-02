#!/usr/bin/env sh
REV=`git rev-parse --short HEAD`
git ls-files | tr "\\n" " " | xargs zip -r build/${REV}.zip
