---
icon: redis
title: linux安装Redis
category: 中间件
date: 2021-07-26
tag:
- Redis
---



# Redis

参考文献：

[cnblogs.com/heqiuyongl](https://www.cnblogs.com/heqiuyong/p/10463334.html)

[blog.csdn.net/qq](https://blog.csdn.net/qq_42476834/article/details/106033330)

## 第一步：下载redis安装包

[https://redis.io/download/](https://redis.io/download/)

wget http://download.redis.io/releases/redis-6.2.4.tar.gz

```ABAP
5.0.0-14
6.0.0-16
6.2.0-7
7.0.0-4
```



## 第二步：解压压缩包

```shell
#赋予权限
chmod +x redis-6.2.4.tar.gz
#解压
tar -zxvf redis-6.2.4.tar.gz -C /usr/local/
```



## 第三步：yum安装gcc依赖

```shell
yum -y install gcc
```



## 第四步：跳转到redis解压目录下

```shell
[root@admin soft]# cd /usr/local/redis-6.2.4/
[root@admin redis-6.2.4]# ls -al
-rw-rw-r--   1 root root 28118 6月   1 2021 00-RELEASENOTES
-rw-rw-r--   1 root root    51 6月   1 2021 BUGS
-rw-rw-r--   1 root root  5026 6月   1 2021 CONDUCT
-rw-rw-r--   1 root root  3384 6月   1 2021 CONTRIBUTING
-rw-rw-r--   1 root root  1487 6月   1 2021 COPYING
drwxrwxr-x   7 root root   145 6月   1 2021 deps
drwxrwxr-x   4 root root    45 6月   1 2021 .github
-rw-rw-r--   1 root root   483 6月   1 2021 .gitignore
-rw-rw-r--   1 root root    11 6月   1 2021 INSTALL
-rw-rw-r--   1 root root   151 6月   1 2021 Makefile
-rw-rw-r--   1 root root  6888 6月   1 2021 MANIFESTO
-rw-rw-r--   1 root root 21567 6月   1 2021 README.md
-rw-rw-r--   1 root root 93724 6月   1 2021 redis.conf
-rwxrwxr-x   1 root root   275 6月   1 2021 runtest
-rwxrwxr-x   1 root root   279 6月   1 2021 runtest-cluster
-rwxrwxr-x   1 root root  1046 6月   1 2021 runtest-moduleapi
-rwxrwxr-x   1 root root   281 6月   1 2021 runtest-sentinel
-rw-rw-r--   1 root root 13768 6月   1 2021 sentinel.conf
drwxrwxr-x   3 root root  4096 6月   1 2021 src
drwxrwxr-x  11 root root   182 6月   1 2021 tests
-rw-rw-r--   1 root root  3055 6月   1 2021 TLS.md
drwxrwxr-x   9 root root  4096 6月   1 2021 utils
```



## 第五步：编译安装

```shell
[root@admin redis-6.2.4]# make MALLOC=libc
cd src && make all
make[1]: 进入目录“/usr/local/redis-6.2.4/src”
    CC Makefile.dep
make[1]: 离开目录“/usr/local/redis-6.2.4/src”
make[1]: 进入目录“/usr/local/redis-6.2.4/src”
***省略***
    CC cli_common.o
    LINK redis-cli
    CC redis-benchmark.o
    LINK redis-benchmark
    INSTALL redis-check-rdb
    INSTALL redis-check-aof

Hint: It's a good idea to run 'make test' ;)

make[1]: 离开目录“/usr/local/redis-6.2.4/src”
```



## 第六步、安装并指定安装目录

```shell
[root@admin redis-6.2.4]# make install PREFIX=/usr/local/redis-6.2.4
cd src && make install
make[1]: 进入目录“/usr/local/redis-6.2.4/src”
    CC Makefile.dep
make[1]: 离开目录“/usr/local/redis-6.2.4/src”
make[1]: 进入目录“/usr/local/redis-6.2.4/src”

Hint: It's a good idea to run 'make test' ;)

    INSTALL redis-server
    INSTALL redis-benchmark
    INSTALL redis-cli
make[1]: 离开目录“/usr/local/redis-6.2.4/src”
```



## 第七步、启动服务

### 7.1前台启动

~~~bash
cd /usr/local/redis-6.2.4/bin/
./redis-server
~~~

### 7.2后台启动

从 redis 的源码目录中复制 redis.conf 到 redis 的安装目录

~~~bash
cp /usr/local/redis-6.2.4/redis.conf /usr/local/redis-6.2.4/bin/
~~~

修改 redis.conf 文件，把 daemonize no 改为 daemonize yes

~~~bash
vim /usr/local/redis-6.2.4/bin/redis.conf
~~~

指定后台启动文件

```shell
./redis-server /usr/local/redis-6.2.4/bin/redis.conf
```



## 第八步、关闭redis进程

查看redis进程

ps -ef | grep redis

使用 kill 掉进程



## 第九步、创建创建软链接

~~~bash
ln -s /usr/local/redis-6.2.4/bin/redis-cli /usr/bin/redis
~~~



## 第十步、设置开机启动

添加开机启动服务

`vim /etc/systemd/system/redis.service`

~~~shell
[Unit]
Description=redis-server
After=network.target
[Service]
Type=forking
ExecStart=/usr/local/redis-6.2.4/bin/redis-server /usr/local/redis-6.2.4/bin/redis.conf
PrivateTmp=true
[Install]
WantedBy=multi-user.target
~~~

~~~bash
设置开机启动
[root@localhost bin]# systemctl daemon-reload
[root@localhost bin]# systemctl start redis.service
[root@localhost bin]# systemctl enable redis.service
~~~

## 第十一步、服务操作命令

`systemctl start redis.service`   #启动redis服务

`systemctl stop redis.service`   #停止redis服务

`systemctl restart redis.service`   #重新启动服务

`systemctl status redis.service`   #查看服务当前状态

`systemctl enable redis.service`   #设置开机自启动

`systemctl disable redis.service`   #停止开机自启动



重启服务测试
