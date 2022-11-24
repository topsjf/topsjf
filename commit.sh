#!bin/bash

set -e

tag=origin
branch=main

echo -------
echo commit git
echo

echo -e "\r\n拉取新代码..."
git pull

echo -e "\r\n查看本地状态..."

git status

echo -e "\r\n添加更改到本地仓库缓存..."

git add -A

echo -e "\r\n设置提交消息:"

pnpm run commit

echo -e "\r\n提交到 ${branch} 远程仓库"

git push -u $tag $branch

echo
echo -------
echo ok!

