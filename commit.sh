#!bin/bash

set -e

echo -------
echo commit git
echo

git pull

git status

git add -A

pnpm run commit

git push -u origin main

echo -------
echo ok!

