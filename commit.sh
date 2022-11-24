#!bin/bash

set -e

tag=origin
branch=main

echo -------
echo commit git
echo

echo -e "\n======> 拉取新代码...\n"
git pull

echo -e "\n======> 查看本地状态...\n"

git status

echo -e "\n======> 添加更改到本地仓库缓存..."

git add -A

echo -e "\n======> 设置提交消息:\n"

pnpm run commit

echo -e "\n======> 提交到远程 ${branch} 分支\n"

git push -u $tag $branch

echo
echo -------
echo ok!

