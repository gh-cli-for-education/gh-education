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

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:gh-cli-for-education/gh-education.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>

# git remote -v get data
git push -f git@github.com:$VITE_ORGANIZATION/$VITE_REPOSITORY.git master:gh-pages
# firebase deploy

cd -