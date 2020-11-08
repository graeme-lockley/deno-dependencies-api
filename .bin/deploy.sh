#!/bin/bash

if [ "$HEROKU_USER" == "" ]
then
    echo "error: HEROKU_USER not set"
    exit 1
fi

if [ "$HEROKU_PASSWORD" == "" ]
then
    echo "error: HEROKU_PASSWORD not set"
    exit 1
fi

echo "machine api.heroku.com" > ~/.netrc
echo "  login $HEROKU_USER" >> ~/.netrc
echo "  password $HEROKU_PASSWORD" >> ~/.netrc
echo "machine git.heroku.com" >> ~/.netrc
echo "  login $HEROKU_USER" >> ~/.netrc
echo "  password $HEROKU_PASSWORD" >> ~/.netrc

# heroku login -i

export REPO_NAME=deno-dependencies-api

heroku git:clone -a $REPO_NAME

cd $REPO_NAME

git config user.email "graeme.lockley@gmail.com"
git config user.name "Graeme Lockley"

echo "v1.5.0" > runtime.txt

cp ../Procfile .
cp ../control.ts .
cp ../server.ts .

git add .
git commit -m "deploy"
git push