---
icon: /icons/docker/docker_16x16.png
title: docker安装mysql-redis-nginx-nacos-mq-es
category: Docker
date: 2020-01-01
tag:
- Docker
---

# [csdn 博客地址](https://blog.csdn.net/qq_42476834/article/details/112675953)

# docker安装 MySQL、Redis、Nginx、nacos、es+kibana、seata

docker桌面镜像加速

```json
  "registry-mirrors": [
     "https://04eo9xup.mirror.aliyuncs.com",
     "https://098cc8006500f4db0f2fc01937bbce40.mirror.swr.myhuaweicloud.com"
  ]
```



>--name="容器新名字"：为容器指定一个名称；
>-i：以交互模式运行容器，通常与-t或者-d同时使用；
>-t：为容器重新分配一个伪输入终端，通常与-i同时使用；
>-d: 后台运行容器，并返回容器ID；
>-P: 随机端口映射，容器内部端口随机映射到主机的端口
>-p: 指定端口映射，格式为：主机(宿主)端口:容器端口

## mysql:5.7.x

https://hub.docker.com/search?q=mysql&type=image

> docker pull registry.cn-chengdu.aliyuncs.com/jinfang/mysql:5.7.38

查看镜像

```bash
root@kong:/data/software# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               5.7.38              697daaecf703        16 hours ago        448MB
```

运行创建容器

```bash
# 设置 /etc/mysql/my.cnf 和 /etc/mysql/conf.d/my.cnf 与设置从后者采取优先。
################################ Linux端 #################################
docker run -p 3306:3306 --name mysql \
-v /media/jf123/deepin/rj/docker/mysql/data:/var/lib/mysql \
--restart=always \
-e MYSQL_ROOT_PASSWORD=root \
-d registry.cn-chengdu.aliyuncs.com/jinfang/mysql:5.7.38 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_general_ci \
--symbolic-links=0 \
--max_connections=1000 \
--explicit_defaults_for_timestamp=true
################################## window端 ###############################
 docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
 OPTIONS:	-a -e -c -d -p -P -m
 
#################################################################

# 使用config
docker run -p 3306:3306 --name mysql -v E:\docker\mysql\data:/var/lib/mysql -v E:\docker\mysql\conf:/etc/mysql/ --restart=always -e MYSQL_ROOT_PASSWORD=root -d registry.cn-chengdu.aliyuncs.com/jinfang/mysql:5.7.38

# 使用命令配置（推荐）
docker run -p 33061:3306 --name mysql -v E:\\docker\\mysql\\log:/var/log/mysql -v E:\\docker\\mysql\\data:/var/lib/mysql --restart=always -e MYSQL_ROOT_PASSWORD=root -d registry.cn-chengdu.aliyuncs.com/jinfang/mysql:5.7.38 --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci
```

在主机里配置mysql:

/docker/mysql/conf$  sudo vim my.cnf

```bash
[client]
default_character-set=utf8

[mysql]
default-character-set=utf8mb4

[mysqld]
#log-bin=mysql-bin
#server-id=1
#binlog_format=ROW
init_connect='SET collation_connection=utf8mb4_general_ci'
init_connect='SET NAMES utf8mb4'
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci
skip-character-set-client-handshake
skip-name-resolve
default-storage-engine=INNODB
symbolic-links=0
max_connections=1000
explicit_defaults_for_timestamp=true
```

重启MySQL容器，容器查看：docker exec -it mysql /bin/bash

## redis:buster

使用教程：https://hub.docker.com/_/redis?tab=description

> docker pull redis:buster	docker pull redis:latest
>
> docker pull registry.cn-chengdu.aliyuncs.com/jinfang/redis:latest
>
> docker tag  redis:latest registry.cn-chengdu.aliyuncs.com/jinfang/redis:latest 
>
> docker push registry.cn-chengdu.aliyuncs.com/jinfang/redis:latest

查看镜像

```bash
root@kong:/data/software# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               5.7.38              697daaecf703        16 hours ago        448MB
redis               buster              ef47f3b6dc11        17 hours ago        104MB
```

运行

```bash
mkdir -p /mydoc/redis/conf
touch /mydoc/redis/conf/redis.conf
#################linux
docker run -p 6491:6379 --name redis \
--restart=always \
-v /media/jf123/deepin/rj/docker/redis/data:/data \
-v /media/jf123/deepin/rj/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
-d registry.cn-chengdu.aliyuncs.com/jinfang/redis:latest redis-server /etc/redis/redis.conf
#################window
docker run -p 6491:6379 --name redis --restart=always -v E:\docker\redis\data:/data -v E:\docker\redis\conf\redis.conf:/etc/redis/redis.conf -d registry.cn-chengdu.aliyuncs.com/jinfang/redis:latest redis-server /etc/redis/redis.conf
```

> Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:6379 -> 0.0.0.0:0: listen tcp 0.0.0.0:6379: bind: An attempt was made to access a socket in a way forbidden by its access permissions.

## docker 端口占用问题

查看TCP：netsh interface ipv4 show excludedportrange protocol=tcp

      开始端口    结束端口
     --------  ----------
      5891        5990
      5991        6090
      6091        6190
      6191        6290
      6291        6390
      6391        6490

更改：docker run -p 6491:6379

查看容器

docker logs --since 30m redis

```bash
root@kong:/data/software# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
ce812650e93c        redis:buster        "docker-entrypoint.s…"   15 seconds ago      Up 13 seconds       0.0.0.0:6379->6379/tcp              redis
```

（存在问题：重启后数据清空）所以要

-- 持久化

vim /mydoc/redis/conf/redis.conf

```bash
appendonly yes
```

登陆容器，登陆redis客户端

```bash
root@kong:/mydoc# docker exec -it f04aeda2074b redis-cli
127.0.0.1:6379> set a val_123
OK
127.0.0.1:6379> get a
"val_123"

退出-重启
127.0.0.1:6379> exit
root@kong:/mydoc# docker restart redis
redis
root@kong:/mydoc# docker exec -it 53466246e9a2 redis-cli
127.0.0.1:6379> get a
"val_123"
```

## redisinsight web端管理

```bash
docker run -p 8001:8001 --name redisinsight --restart=always -v E:\docker\redisinsight:/db -d registry.cn-chengdu.aliyuncs.com/jinfang/redisinsight:latest
```

http://127.0.0.1:8001/



## nginx:perl

mkdir -p nginx/conf | logs

> docker pull registry.cn-chengdu.aliyuncs.com/jinfang/nginx:perl

日志格式：

```
$time_iso8601
172.17.0.1 - - [2022-01-20T03:13:28+00:00] 

autoindex_localtime on;
172.17.0.1 - - [2022-01-20T03:16:05+00:00]

$time_local
172.17.0.1 - - [20/Jan/2022:03:05:54 +0000]

$time_iso8601+自定义格式
```

运行

```bash
##############window
docker run --name nginx -d -p 80:80 --restart=always -v E:\docker\nginx\html:/usr/share/nginx/html -v E:\docker\nginx\conf.d:/etc/nginx/conf.d -v E:\docker\nginx\conf/nginx.conf:/etc/nginx/nginx.conf -v E:\docker\nginx\logs:/var/log/nginx registry.cn-chengdu.aliyuncs.com/jinfang/nginx:perl
##############linux
docker run --name nginx -d -p 80:80  \
--restart=always \
-v /etc/localtime:/etc/localtime:ro \
-v /media/jf123/deepin/rj/docker/nginx/html:/usr/share/nginx/html \
-v /media/jf123/deepin/rj/docker/nginx/conf.d:/etc/nginx/conf.d \
-v /media/jf123/deepin/rj/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /media/jf123/deepin/rj/docker/nginx/logs:/var/log/nginx registry.cn-chengdu.aliyuncs.com/jinfang/nginx:perl

```

>docker logs --tail="10" nginx
>
>docker exec -it nginx /bin/bash

E:\docker\nginx\conf\nginx.conf

```nginx
#user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  1024;
}
http {
	server_tokens off;
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
	
    ## $time_iso8601、$time_local
	log_format  main  '$remote_addr - $remote_user [$time_iso8601] "$request" '
					  '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    log_format  mylog '{"date_time": "$year-$month-$day $hour:$minutes:$seconds",'
                      '"host": "$server_addr",'
                      '"client_ip": "$remote_addr",'
                      '"client_id": "$remote_user",'
                      '"url": "$request_uri",'
                      '"request": "$request",'
                      '"referer": "$http_referer",'
                      '"request_time": "$request_time",'
                      '"status": "$status",'
                      '"size": "$body_bytes_sent",'
                      '"info": "$http_user_agent",'
                      '"x_forwarded_for": "$http_x_forwarded_for"'
                      '}';
    sendfile        on;
	#tcp_nopush     on;
	keepalive_timeout  65;

	client_max_body_size 50m;
	client_body_buffer_size 256k;
	client_header_timeout 3m;
	client_body_timeout 3m;
	proxy_connect_timeout 300s;
	proxy_read_timeout 300s;
	proxy_send_timeout 300s;
	proxy_buffer_size 64k;
	proxy_buffers 4 32k;
	proxy_busy_buffers_size 64k;
	proxy_temp_file_write_size 64k;
	proxy_ignore_client_abort on;
	proxy_set_header Host $host;
	proxy_set_header X-Forwarder-For $remote_addr;

    gzip  on;
    include /etc/nginx/conf.d/*.conf;
}
```

E:\docker\nginx\conf.d\自己的配置文件.conf

```nginx
upstream util_server { 
    server 192.168.101.4:51320;
}
upstream util_dev_server {
    server 192.168.101.4:51321;
}
upstream util_test_server {
    server 192.168.101.4:51322;
}

server {
    listen       80;
    server_name  www.util.cn;
    charset utf-8;
    include /etc/nginx/conf.d/time.txt;
    access_log  /var/log/nginx/util.log  mylog;	# buffer=32k;
    
    location /util/ {
        proxy_pass http://util_server/util/;
    }
    location /util-dev/ {
        proxy_pass http://util_dev_server/util-dev/;
    }
    location /util-test/ {
        proxy_pass http://util_test_server/-util-test/;
    }
	
	#error_page  404              /404.html;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

time.txt

```
if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})") {
	set $year $1;
	set $month $2;
	set $day $3;
	set $hour $4;
	set $minutes $5;
	set $seconds $6;
}
```

跨域 : 在server location下添加add_header

```
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Headers X-Requested-With;
add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
```



## nacos

当前推荐的稳定版本为1.4.x或2.0.x。[官网文档](https://nacos.io/zh-cn/docs/quick-start.html)
 [推荐参考：docker安装nacos2.0.x + mysql5.7](https://blog.csdn.net/qq_42476834/article/details/121149424)
 [docker 镜像](https://hub.docker.com/r/nacos/nacos-server)

> docker pull registry.cn-chengdu.aliyuncs.com/jinfang/nacos-server:1.4.2
>
> docker pull registry.cn-chengdu.aliyuncs.com/jinfang/nacos-server:2.0.3

```bash
-----------------------------------
window
-----------------------------------
############使用配置项
docker run --env MODE=standalone --name nacos --restart=always -v E:\docker\nacos\data:/home/nacos/data -v E:\docker\nacos\logs:/home/nacos/logs -e PREFER_HOST_MODE=ip -e SPRING_DATASOURCE_PLATFORM=mysql -e MYSQL_DATABASE_NUM=1 -e MYSQL_SERVICE_HOST=192.168.101.4 -e MYSQL_SERVICE_PORT=3306 -e MYSQL_SERVICE_DB_NAME=nacos_config -e MYSQL_SERVICE_USER=root -e MYSQL_SERVICE_PASSWORD=root -d -p 8848:8848 registry.cn-chengdu.aliyuncs.com/jinfang/nacos-server:1.4.2
############使用本地config文件配置
docker run --env MODE=standalone --name nacos --restart=always -v E:\docker\nacos\conf:/home/nacos/conf -v E:\docker\nacos\data:/home/nacos/data -v E:\docker\nacos\logs:/home/nacos/logs -d -p 8848:8848 registry.cn-chengdu.aliyuncs.com/jinfang/nacos-server:1.4.2


-----------------------------------
Linux
-----------------------------------
docker run --env MODE=standalone  --name nacos \
--restart=always \
-v /media/jf123/deepin/rj/docker/nacos/data:/home/nacos/data \
-v /media/jf123/deepin/rj/docker/nacos/logs:/home/nacos/logs \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_DATABASE_NUM=1 \
-e MYSQL_SERVICE_HOST=192.168.101.4 \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_DB_NAME=nacos_config \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=root \
-e JVM_XMS=1g \
-e JVM_XMX=1g \
-e JVN_XMN=512m \
-d -p 8848:8848 registry.cn-chengdu.aliyuncs.com/jinfang/nacos-server:1.4.2
############使用本地config文件配置
docker run --env MODE=standalone --name nacos \
--restart=always \
-v /media/jf123/deepin/rj/docker/nacos/conf:/home/nacos/conf \
-v /media/jf123/deepin/rj/docker/nacos/data:/home/nacos/data \
-v /media/jf123/deepin/rj/docker/nacos/logs:/home/nacos/logs \
-d -p 8848:8848 registry.cn-chengdu.aliyuncs.com/jinfang/nacos-server:1.4.2
```

> docker exec -it nacos /bin/bash
>
>  docker exec -it web /bin/bash

登陆：http://localhost:8848/nacos 账号、密码：nacos

## rabbitmq:3.8.x-management

https://www.rabbitmq.com/networking.html

下载镜像

```bash
docker pull registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.9.20-management
-----------
docker pull rabbitmq:3.8.34-management
docker tag rabbitmq:3.8.34-management registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.8.34-management
docker push registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.8.34-management
-----------
docker pull rabbitmq:3.9.20-management
docker tag rabbitmq:3.9.20-management registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.9.20-management
docker push registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.9.20-management
-----------
docker pull rabbitmq:3.10.5-management
docker tag rabbitmq:3.10.5-management registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.10.5-management
docker push registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.10.5-management
--------------------
docker rmi rabbitmq:3.8.34-management
docker rmi rabbitmq:3.9.20-management
docker rmi rabbitmq:3.10.5-management
```

运行容器

```bash
docker run -d --name rabbitmq3.9.20 --restart=always -p 5671:5671 -p 5672:5672 -p 4369:4369 -p 25672:25672 -p 15672:15672 registry.cn-chengdu.aliyuncs.com/jinfang/rabbitmq:3.9.20-management

4369, 25672 (Erlang发现&集群端口)
5672, 5671 (AMQP端口)
15672 (web管理后台端口)
61613, 61614 (STOMP协议端口)
1883, 8883 (MQTT协议端口)
```

http://localhost:15672/#/	账号：guest

## elasticsearch+kibana

安装

https://www.elastic.co/cn/downloads/elasticsearch#ga-release

```shell
docker pull elasticsearch:7.17.4
docker pull kibana:7.17.4
```

```shell
docker tag elasticsearch:7.17.4 registry.cn-chengdu.aliyuncs.com/jinfang/elasticsearch:7.17.4
docker push registry.cn-chengdu.aliyuncs.com/jinfang/elasticsearch:7.17.4
docker rmi elasticsearch:7.17.4
```

```shell
docker tag kibana:7.17.4 registry.cn-chengdu.aliyuncs.com/jinfang/kibana:7.17.4
docker push registry.cn-chengdu.aliyuncs.com/jinfang/kibana:7.17.4
docker rmi kibana:7.17.4
```

```shell
docker pull registry.cn-chengdu.aliyuncs.com/jinfang/elasticsearch:7.17.4 存储和检索数据
docker pull registry.cn-chengdu.aliyuncs.com/jinfang/kibana:7.17.4 可视化数据
```


配置

### elasticsearch

```bash
###############linux
mkdir -p /data/docker/elasticsearch/config
mkdir -p /data/docker/elasticsearch/data
mkdir -p /data/docker/elasticsearch/plugins
mkdir -p /data/docker/elasticsearch/logs
chmod -R 775 /data/docker/elasticsearch
------------------------------------------------
echo "http.host: 0.0.0.0" >> /data/docker/elasticsearch/config/elasticsearch.yml
------------------------------------------------
docker run --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms512m -Xmx1g" \
--restart=always \
-v /media/jf123/deepin/rj/docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /media/jf123/deepin/rj/docker/elasticsearch/data:/usr/share/elasticsearch/data \
-v /media/jf123/deepin/rj/docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-v /media/jf123/deepin/rj/docker/elasticsearch/logs:/usr/share/elasticsearch/logs \
-d registry.cn-chengdu.aliyuncs.com/jinfang/elasticsearch:7.17.4

###############window
docker run --name es --restart=always -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms512m -Xmx1g" -v E:\docker\elasticsearch\config\elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v E:\docker\elasticsearch\data:/usr/share/elasticsearch/data -v E:\docker\elasticsearch\plugins:/usr/share/elasticsearch/plugins -d registry.cn-chengdu.aliyuncs.com/jinfang/elasticsearch:7.17.4
```

elasticsearch.yml

```yaml
http.host: 0.0.0.0
```

http://localhost:9200

http://localhost:9200/_cat/nodes

### kibana

```bash
docker run --name kibana --restart=always -e "ELASTICSEARCH_HOSTS=http://192.168.0.5:9200" -p 5601:5601 -d registry.cn-chengdu.aliyuncs.com/jinfang/kibana:7.17.4
```

http://localhost:5601

kibana.yml

```yaml
version: '2'
services:
  kibana:
    image: kibana:7.17.4
    volumes:
      - ./kibana.yml:/usr/share/kibana/config/kibana.yml
```

### ik 分词器

下载：https://github.com/medcl/elasticsearch-analysis-ik/releases

https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.4/elasticsearch-analysis-ik-7.17.4.zip

解压到es：plugins

重启 es

