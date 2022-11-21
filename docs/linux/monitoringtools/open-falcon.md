---
icon: edit
title: Open-Falcon监控平台
category: 运维监控工具
date: 2022-10-03
tag:
- Open-Falcon
---

# Open-Falcon监控平台



## 环境准备

### 安装 redis

https://redis.io/download/

[docker安装教程](https://note-jf.github.io/tools/docker/docker-install-mysql-redis-nginx-nacos-mq-es.html)

```
mkdir -p /mydoc/redis/conf
touch /mydoc/redis/conf/redis.conf
#################linux
docker run -p 6491:6379 --name redis \
--restart=always \
-v /data/docker/redis/data:/data \
-v /data/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
-d registry.cn-chengdu.aliyuncs.com/jinfang/redis:latest redis-server /etc/redis/redis.conf
```



```bash
docker exec -it 4529e2c29cbb redis-cli
```



### 安装mysql

[tar方式-参考地址](https://note-jf.github.io/database/mysql/install.html)

```
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[client]
default-character-set=utf8mb4

[mysqld]

#删除前导，以设置主要用于报表服务器的选项。
#对于事务和快速选择，服务器默认值更快。
#根据需要调整尺寸，实验以找到最佳值。
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
#默认
port=3306
#数据目录
datadir=/var/lib/mysql
#该条配置需在[client]段同时配置
socket=/var/lib/mysql/mysql.sock
#多客户访问同一数据库，该选项默认开启
symbolic-links=0
#默认
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
#打开时，和max_connections对比，取大数
open_files_limit=65535
#max_connections=1000
#开启慢查询日志相关，默认10秒，慢查询日志路径，记录没有使用索引的sql
slow_query_log=on
long_query_time=10
slow_query_log_file=/var/log/mysql/slow_query.log
log-queries-not-using-indexes=1
#InnoDB为独立表空间模式，每个数据库的每个表都会生成一个数据空间
default_storage_engine=InnoDB
innodb_file_per_table=on
#生产中要改，建议为操作系统内存的70%-80%，需重启服务生效
innodb_buffer_pool_size=1G
#忽略主机名解析，提高访问速度（注意配置文件中使用主机名将不能解析）
skip_name_resolve=on
#忽略表单大小写
lower_case_table_names=0
#设定默认字符为utf8mb4
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci

#SQL_MODEL

sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```



## 单体安装 open-falcon

[下载](https://github.com/open-falcon/falcon-plus/releases)

https://github.com/open-falcon/falcon-plus/releases/download/v0.3/open-falcon-v0.3.tar.gz

https://github.com/open-falcon/falcon-plus/releases/download/v0.2.1/open-falcon-v0.2.1.tar.gz

一、创建工作目录

export FALCON_HOME=/data/work

export WORKSPACE=$FALCON_HOME/open-falcon

mkdir -p $WORKSPACE

二、解压二进制包

cd /data/software

tar -xzvf open-falcon-v0.3.tar.gz -C $WORKSPACE

三、配置数据库账号和密码

```bash
cd $WORKSPACE

grep -Ilr 3306 ./ | xargs -n1 -- sed -i 's/root:/root:root12/g'
grep -Ilr 6379 ./ | xargs -n1 -- sed -i 's/127.0.0.1:6379/127.0.0.1:6491/g'
```

四、启动

查看目录下包括Open-Falcon的所有组件，我们先默认全部启动，之后我们一个一个讲解如何分布式部署以及启动

```bash
[root@master open-falcon]# ls
agent  aggregator  alarm  api  gateway  graph  hbs  judge  nodata  open-falcon  plugin  public  transfer
```

./open-falcon start

```bash
./open-falcon start
[falcon-graph] 15489
[falcon-hbs] 15494
[falcon-judge] 15521
[falcon-transfer] 15531
[falcon-nodata] 15534
[falcon-aggregator] 15551
[falcon-agent] 15554
[falcon-gateway] 15569
[falcon-api] 15576
[falcon-alarm] 15586
```



- 检查所有模块的启动状况

./open-falcon check

```bash
./open-falcon check
        falcon-graph       DOWN               - 
          falcon-hbs       DOWN               - 
        falcon-judge         UP           15521 
     falcon-transfer         UP           15531 
       falcon-nodata       DOWN               - 
   falcon-aggregator       DOWN               - 
        falcon-agent         UP           15554 
      falcon-gateway         UP           15569 
          falcon-api       DOWN               - 
        falcon-alarm       DOWN               - 
```



五、更多命令行工具

```shell
# ./open-falcon [start|stop|restart|check|monitor|reload] module
./open-falcon start graph
./open-falcon start hbs
./open-falcon start judge
./open-falcon start transfer
./open-falcon start nodata
./open-falcon start aggregator
./open-falcon start agent
./open-falcon start gateway
./open-falcon start api
./open-falcon start alarm

./open-falcon check
        falcon-graph         UP           35697 
          falcon-hbs         UP           35711 
        falcon-judge         UP           35719 
     falcon-transfer         UP           35728 
       falcon-nodata         UP           35740 
   falcon-aggregator       DOWN               - 
        falcon-agent         UP           38715 
      falcon-gateway         UP           40052 
          falcon-api       DOWN               - 
        falcon-alarm       DOWN               - 

For debugging , You can check $WorkDir/$moduleName/log/logs/xxx.log
```





## 分布式安装 open-falcon







