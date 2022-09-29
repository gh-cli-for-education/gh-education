#!/usr/bin/env sh
DEPLOYREPO="ULL-MII-SYTWS/ull-mii-sytws"
COURSEDEPLOYREPO="ULL-MII-SYTWS-2223/ULL-MII-SYTWS-2223"

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH/src/.vuepress/dist
#cd $HOME/campus-virtual/2122/pl2122/pl2122apuntes/docs/src/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git branch -M main

# if you are deploying to https://<USERNAME>.github.io
git push --force --set-upstream git@github.com:${DEPLOYREPO}.github.io.git main

git push --force --set-upstream git@github.com:${COURSEDEPLOYREPO}.github.io.git main

# git push --force --set-upstream git@github.com:ULL-ESIT-PL-2223/ULL-ESIT-PL-2223.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -