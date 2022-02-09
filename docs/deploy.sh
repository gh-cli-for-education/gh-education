#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd $HOME/campus-virtual/2122/pl2122/pl2122apuntes/docs/src/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git branch -M main

# if you are deploying to https://<USERNAME>.github.io
git push --force --set-upstream git@github.com:ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -