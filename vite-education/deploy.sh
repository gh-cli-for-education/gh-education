#!/bin/bash

# abort on errors
set -e

set -o allexport
source .env
set +o allexport

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:$VITE_ORGANIZATION/$VITE_REPOSITORY.git $VITE_BRANCH:gh-pages
# firebase deploy

cd -