---
icon: edit
title: git配置
category: 开发工具
date: 2020-01-01
tag:
- Git
---


<!-- more -->

## git配置

**安装Git**

```bash
sudo apt-get install git
git --version
```

**Git 全局设置**

name#这里随便取

email#这里是邮箱

```bash
git config --global user.name "jinfang"
git config --global user.email "topjfk@163.com"
```

查看config配置消息：`git config --list`

如果有多个name值时执行：
```
git config --global --replace-all user.name "jinfang"
git config --global --replace-all user.email "topjfk@163.com"
```

**创建公钥-私钥**

```bash
ssh-keygen -t rsa -b 4096 -C "topjfk@163.com"    
# 按3次回车，创建ssh免密
```

**添加私钥(可选)**
```
ssh-add ~/.ssh/id_rsa   
eval `ssh-agent -s`
```

**查看公钥**

```bash
cat ~/.ssh/id_rsa.pub

```

**查看私钥**

```shell
cat ~/.ssh/id_rsa
```

把 id_rsa.pub 内容复制到：gitee --> 安全设置 --> SSH公钥 --> 添加公钥 --> 把id_rsa.pub内容粘贴进来。

- [gitee ssh配置页](https://gitee.com/profile/sshkeys)
- [github ssh配置页](https://github.com/settings/keys)


**校验公钥应用是否生效**

```bash
ssh -T git@gitee.com

ssh -T git@github.com
```

提示输入yes，以后提交代码就不用输入账号密码

```bash
PS C:\Users\k> ssh -T git@gitee.com
Hi jin! You've successfully authenticated, but GITEE.COM does not provide shell access.'

PS C:\Users\k> ssh -T git@github.com
Hi top! You've successfully authenticated, but GitHub does not provide shell access.'
```


## 强制推送

[解决 Push rejected: Push to xxxx/master was rejected](https://blog.csdn.net/qq_42476834/article/details/108263267)

```bash
git pull origin develop –allow-unrelated-histories
git push -u origin develop -f
```

## Gitee 推送

创建 git 仓库:

```bash
mkdir xxx
cd xxx
git init 
touch README.md
git add -A
git commit -m "first commit"
git remote add origin https://gitee.com/xxx/xxx.git
或者
git remote set-url origin https://自己的token@gitee.com/用户（组织）名称/仓库名称.git


git push -u origin "master"
```

已有仓库:

```bash
git remote add origin https://gitee.com/xxx/xxx.git
或者
git remote set-url origin https://自己的token@gitee.com/用户（组织）名称/仓库名称.git

git push -u origin "master"

```

## GitHub 推送

未有仓库:

```bash
### 创建本地项目
mkdir topsjf.github.io
cd topsjf.github.io
git init
git add -A
### 提交本地代码
git commit -m '提交代码了丫'
### 创建分支
git branch -M main

### https与远程仓库关联
git remote add origin https://github.com/topsjf/topsjf.git
git remote set-url origin https://自己的token@github.com/topsjf/topsjf.git
### 使用ssh连接
git remote add origin git@github.com:topsjf/topsjf.git
git remote set-url origin git@github.com:topsjf/topsjf.git

### 推送
git push -f origin main

```

已有仓库:

```shell
git remote add origin git@github.com:topsjf/topsjf.git
git branch -M main
git push -u origin main
```


