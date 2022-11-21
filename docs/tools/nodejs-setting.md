---
icon: edit
title: nodejs配置
category: 开发工具
date: 2020-01-06
tag:
- nodejs
---

## linux 配置

Node.js  [安装-教程](https://blog.csdn.net/qq_42476834/article/details/110789382)

[官网下载](http://nodejs.cn/download/)

```bash
tar -zxvf 下载的tar包路径 -C 存放目标路劲
sudo ln -s /soft/nodejs/bin/node /usr/local/bin/ && sudo ln -s /soft/nodejs/bin/npm /usr/local/bin/ && ls /usr/local/bin/

## sudo rm -rf /usr/local/bin/node && sudo rm -rf /usr/local/bin/npm && sudo rm -rf /usr/local/bin/cnpm

node -v && npm -v

更新node： npm install -g npm 

node    : 	npm
16.15.1:8.2.0
v16.13.2：8.1.2
v14.18.1：6.14.15
v14.17.1：6.14.14
v14.17.0：6.14.13
v14.15.5：6.14.11
v14.15.0：6.14.8
```

设置淘宝镜像源
```shell
npm config set registry https://registry.npm.taobao.org
```
需要换回时改为官方的镜像源
```shell
npm config set registry https://registry.npmjs.org
```
查看配置：npm config list

`npx -p npm@6 npm i --legacy-peer-deps`

### 安装 pnpm

```
corepack enable
corepack prepare pnpm@7.14.2 --activate
```
卸载：`corepack disable pnpm`

### 安装 cnpm

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
sudo ln -s /rj/nodejs/bin/cnpm /usr/local/bin/ && ls /usr/local/bin/

cnpm -v
```

> "user" config from /home/jf123/.npmrc

### 全局模块的位置

创建文件夹：`node_global`、`node_cache`

npm config -help -s 

参数

> npm config set 
>
> npm config get 
>
> npm config delete cache && npm config delete prefix 
>
> npm config list
>
> npm config edit

```shell
npm config set prefix "/rj/nodejs/node_global" 

npm config set cache "/rj/nodejs/node_cache"

npm config list
```

### 配置环境变量

`sudo vim /etc/profile`

```bash
export NODE_PATH=/rj/nodejs/
export PATH=$PATH:${NODE_PATH}/bin #:${NODE_M_PATH}
```

`source /etc/profile`

`node -v && npm -v`

```
npm i -g element-ui -S && npm install -g webpack && npm install -D webpack-cli -g
```
> `npm install -g vue-cli` 会存放在`/rj/nodejs/node_global/{bin,lib}`目录下

## window配置

[下载msi v14.18.3 安装](https://cdn.npm.taobao.org/dist/node/v14.18.3/node-v14.18.3-x64.msi)

[下载msi 16.13.2 安装](https://cdn.npm.taobao.org/dist/node/v16.13.2/node-v16.13.2-x64.msi)

### 配置npm淘宝源

`npm config set registry http://registry.npm.taobao.org`

### 全局模块的位置

创建文件夹：`node_global`、`node_cache`

*最好赋予nodejs文件权限，不然系统自动创建文件时报错*

```shell
npm config set prefix "D:\rj-win\nodejs\node_global"
npm config set cache "D:\rj-win\nodejs\node_cache"
```

### 配置环境变量

NODE_PATH ： `D:\rj-win\nodejs\node_global\node_modules` 

path： `D:\rj-win\nodejs\` 


## vue 模块化开发

项目打包 webpack：`npm install -g webpack` 、`npm install -D webpack-cli -g`

程序 @vue/cli-init： `npm install -g vue-cli`

引入 elementui：`npm i -g element-ui -S`



