---
icon: edit
title: Zabbix监控平台
category: 运维监控工具
date: 2022-10-03
tag:
- Zabbix
---

# Zabbix监控平台

## 环境准备

- [MySQL安装参考](https://note-jf.github.io/database/mysql/install.html)
- [Nginx参考](https://note-jf.github.io/tools/docker/docker-install-mysql-redis-nginx-nacos-mq-es.html)、[Nginx配置](https://note-jf.github.io/middleware/nginx.html)



## tar 安装

[官网](https://www.zabbix.com/cn)

https://cdn.zabbix.com/zabbix/sources/stable/

https://www.zabbix.com/download_sources



### 安装



1、解压安装包

```
mkdir /usr/lib/zabbix
rm -rf /usr/lib/zabbix
```

```shell
tar -zxvf zabbix-6.0.9.tar.gz -C /usr/lib/zabbix && mv /usr/lib/zabbix/zabbix-6.0.9/* /usr/lib/zabbix &&  rm -rf /usr/lib/zabbix/zabbix-6.0.9 && ls /usr/lib/zabbix

tar -zxvf zabbix-6.2.3.tar.gz -C /usr/lib/zabbix && mv /usr/lib/zabbix/zabbix-6.2.3/* /usr/lib/zabbix &&  rm -rf /usr/lib/zabbix/zabbix-6.2.3 && ls /usr/lib/zabbix
```

2、创建zabbix用户

```shell
groupadd --system zabbix

useradd --system -g zabbix -d /usr/lib/zabbix -s /sbin/nologin -c "Zabbix Monitoring System" zabbix
```

Zabbix进程不需要主目录，因此我们不建议创建它。但是，如果您正在使用一些需要它的功能（例如，将MySQL凭据存储在$HOME/.my.cnf中），您可以使用以下命令创建它。

```shell
mkdir -m u=rwx,g=rwx,o=rx -p /usr/lib/zabbix
chmod -R 775 /usr/lib/zabbix

chown -R zabbix:zabbix /usr/lib/zabbix
```



3、创建数据库

**参考下面的--配置 zabbix 数据库**



4、编译安装

```bash
yum groupinstall "Development Tools" -y

yum install gcc mysql-devel libevent-devel libcurl-devel libxml2-devel libssh2-devel OpenIPMI-devel net-snmp-devel go java-devel -y
```

cd /usr/local/zabbix

```shell
./configure --help

要为Zabbix server和agent配置源代码，你可以执行类似如下命令：

./configure --prefix=/usr/lib/zabbix --enable-server --enable-agent --with-mysql --enable-ipv6 --with-net-snmp --with-libcurl --with-libxml2 --with-openipmi

要为Zabbix server（和，比如PostgreSQL）配置源代码，你可以执行：

./configure --enable-server --with-postgresql --with-net-snmp

要为Zabbix server（和，比如SQLite）配置源代码，你可以执行：

./configure --prefix=/usr/lib/zabbix --enable-proxy --with-net-snmp --with-sqlite3 --with-ssh2

要为Zabbix agent配置源代码，你可以执行：

./configure --enable-agent

或者Zabbix agent 2：

./configure --enable-agent2

make

make install
```



### 配置 zabbix 数据库

数据库选择mysql5.7.38版本 [MySQL安装参考](https://note-jf.github.io/database/mysql/install.html) ；如果选用5.7.25，zabbix 6.2在启动的时候会提示数据库版本过低；



```shell
mysql -uroot -p

set global validate_password_policy=0; 
set global validate_password_length=3;

#创建zabbix数据库
create database zabbix;
show databases;

#创建zabbix用户
create user 'zabbix'@'%' identified by 'zabbix123';

#设置访问权限,可以通过外部连接 数据库
GRANT ALL PRIVILEGES ON *.* TO 'zabbix'@'%'IDENTIFIED BY 'zabbix123' WITH GRANT OPTION;

#开启bin日志
set global log_bin_trust_function_creators = 1;
show variables like 'log_bin%';

flush privileges;
quit;
```

-  导入初始架构和数据，导入顺序不能乱，否则会报错

```shell
mysql -uroot -p
root12

show databases;
use zabbix;

source /usr/local/zabbix/database/mysql/schema.sql
source /usr/local/zabbix/database/mysql/images.sql
source /usr/local/zabbix/database/mysql/data.sql
source /usr/local/zabbix/database/mysql/double.sql
source /usr/local/zabbix/database/mysql/history_pk_prepare.sql

```

- 关闭

```shell
set global log_bin_trust_function_creators = 0; 
flush privileges;
quit;
```



### 配置 zabbix_server

```shell
[root@master conf]# pwd
/usr/local/zabbix/conf

[root@master zabbix]# egrep -v "^$|^#" conf/zabbix_server.conf
LogFile=/var/log/zabbix/zabbix_server.log
PidFile=/usr/local/zabbix/zabbix_server.pid
DBHost=127.0.0.1
DBName=zabbix
DBUser=zabbix
DBPassword=zabbix123
AllowUnsupportedDBVersions=1
Timeout=4
LogSlowQueries=3000
StatsAllowedIP=127.0.0.1
```

7、创建SERVICE文件内容 

vim /usr/lib/systemd/system/zabbix-server.service

```
[Unit]
Description=Zabbix Server with MySQL DB
After=syslog.target network.target mysqld.service 

[Service]
Type=simple
ExecStart=/usr/local/sbin/zabbix_server -f
User=zabbix

[Install]
WantedBy=multi-user.target
```



- 启动服务

```
systemctl daemon-reload
systemctl restart zabbix-server
systemctl status zabbix-server
```













### 部署zabbix UI







### 部署zabbix_agentd服务













## docker 安装

- Zabbix agent - [zabbix/zabbix-agent](https://hub.docker.com/r/zabbix/zabbix-agent/)
- Zabbix server
  - 支持 MySQL 数据库的 Zabbix server - [zabbix/zabbix-server-mysql](https://hub.docker.com/r/zabbix/zabbix-server-mysql/)
- Zabbix web界面
  - 基于Apache2 Web服务器 的 Zabbix web 界面，支持 MySQL 数据库 - [zabbix/zabbix-web-apache-mysql](https://hub.docker.com/r/zabbix/zabbix-web-apache-mysql/)
  - 基于Nginx Web服务器 的 Zabbix web 界面，支持 MySQL 数据库 - [zabbix/zabbix-web-nginx-mysql](https://hub.docker.com/r/zabbix/zabbix-web-nginx-mysql/)
- Zabbix proxy
  - Zabbix proxy， 支持 MySQL 数据库 - [zabbix/zabbix-proxy-mysql](https://hub.docker.com/r/zabbix/zabbix-proxy-mysql/)
- Zabbix Java 网关 - [zabbix/zabbix-java-gateway](https://hub.docker.com/r/zabbix/zabbix-java-gateway/)



**示例 1**

该示例示范了如何运行 MySQL 数据库支持的 Zabbix Server 、基于 Nginx Web 服务器的 Zabbix Web 界面和 Zabbix Java 网关。

1. 创建专用于 Zabbix 组件容器的网络：

```
docker network create --subnet 172.20.0.0/16 --ip-range 172.20.240.0/20 zabbix-net
```

2. 启动空的 MySQL 服务器实例：

```shell
docker pull registry.cn-chengdu.aliyuncs.com/jinfang/mysql:8.0.30

docker run --name mysql-server -t \
             -e MYSQL_DATABASE="zabbix" \
             -e MYSQL_USER="zabbix" \
             -e MYSQL_PASSWORD="zabbix_pwd" \
             -e MYSQL_ROOT_PASSWORD="root_pwd" \
             -p 8599:80 \
             --network=zabbix-net \
             -d registry.cn-chengdu.aliyuncs.com/jinfang/mysql:5.7.39 \
             --restart unless-stopped \
             --character-set-server=utf8 --collation-server=utf8_bin \
             --default-authentication-plugin=mysql_native_password
```

3. 启动 Zabbix Java 网关实例：

```shell
docker pull zabbix/zabbix-java-gateway:centos-6.2.3

docker run --name zabbix-java-gateway -t \
             --network=zabbix-net \
             --restart unless-stopped \
             -d zabbix/zabbix-java-gateway:centos-6.2.3
```

4. 启动 Zabbix server 实例，并将其关联到已创建的 MySQL server 实例：

```shell
docker pull zabbix/zabbix-server-mysql:6.2.3-centos

docker run --name zabbix-server-mysql -t \
             -e DB_SERVER_HOST="mysql-server" \
             -e MYSQL_DATABASE="zabbix" \
             -e MYSQL_USER="zabbix" \
             -e MYSQL_PASSWORD="zabbix_pwd" \
             -e MYSQL_ROOT_PASSWORD="root_pwd" \
             -e ZBX_JAVAGATEWAY="zabbix-java-gateway" \
             --network=zabbix-net \
             -p 10051:10051 \
             --restart unless-stopped \
             -d zabbix/zabbix-server-mysql:6.2.3-centos
```

Zabbix server 实例将 10051/TCP 端口（Zabbix trapper）暴露给主机。

5. 启动 Zabbix Web 界面，并将其关联到已创建的 MySQL server 和 Zabbix server 实例：

```shell
docker pull zabbix/zabbix-web-nginx-mysql:6.2.3-centos

docker run --name zabbix-web-nginx-mysql -t \
             -e ZBX_SERVER_HOST="zabbix-server-mysql" \
             -e DB_SERVER_HOST="mysql-server" \
             -e MYSQL_DATABASE="zabbix" \
             -e MYSQL_USER="zabbix" \
             -e MYSQL_PASSWORD="zabbix_pwd" \
             -e MYSQL_ROOT_PASSWORD="root_pwd" \
             --network=zabbix-net \
             -p 80:8080 \
             --restart unless-stopped \
             -d zabbix/zabbix-web-nginx-mysql:6.2.3-centos
```

Zabbix web 界面实例将 80/TCP 端口（HTTP）暴露给主机。



docker-compose_v3_centos_mysql_latest.yaml

```yaml
version: '3.5'
services:
 zabbix-server:
  image: zabbix/zabbix-server-mysql:centos-6.2-latest
  ports:
   - "10051:10051"
  volumes:
   - /etc/localtime:/etc/localtime:ro
   - /etc/timezone:/etc/timezone:ro 
   - ./zbx_env/usr/lib/zabbix/alertscripts:/usr/lib/zabbix/alertscripts:ro
   - ./zbx_env/usr/lib/zabbix/externalscripts:/usr/lib/zabbix/externalscripts:ro
   - ./zbx_env/var/lib/zabbix/dbscripts:/var/lib/zabbix/dbscripts:ro
   - ./zbx_env/var/lib/zabbix/export:/var/lib/zabbix/export:rw
   - ./zbx_env/var/lib/zabbix/modules:/var/lib/zabbix/modules:ro
   - ./zbx_env/var/lib/zabbix/enc:/var/lib/zabbix/enc:ro
   - ./zbx_env/var/lib/zabbix/ssh_keys:/var/lib/zabbix/ssh_keys:ro
   - ./zbx_env/var/lib/zabbix/mibs:/var/lib/zabbix/mibs:ro
   - snmptraps:/var/lib/zabbix/snmptraps:rw
  ulimits:
   nproc: 65535
   nofile:
    soft: 20000
    hard: 40000
  deploy:
   resources:
    limits:
      cpus: '0.70'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
  env_file:
   - ./env_vars/.env_db_mysql
   - ./env_vars/.env_srv
  secrets:
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_ROOT_USER
   - MYSQL_ROOT_PASSWORD
#   - client-key.pem
#   - client-cert.pem
#   - root-ca.pem
  depends_on:
   - mysql-server
  networks:
   zbx_net_backend:
     aliases:
      - zabbix-server
      - zabbix-server-mysql
      - zabbix-server-centos-mysql
      - zabbix-server-mysql-centos
   zbx_net_frontend:
#  devices:
#   - "/dev/ttyUSB0:/dev/ttyUSB0"
  stop_grace_period: 30s
  sysctls:
   - net.ipv4.ip_local_port_range=1024 65000
   - net.ipv4.conf.all.accept_redirects=0
   - net.ipv4.conf.all.secure_redirects=0
   - net.ipv4.conf.all.send_redirects=0
  labels:
   com.zabbix.description: "Zabbix server with MySQL database support"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "zabbix-server"
   com.zabbix.dbtype: "mysql"
   com.zabbix.os: "centos"

 zabbix-proxy-sqlite3:
  image: zabbix/zabbix-proxy-sqlite3:centos-6.2-latest
  profiles:
   - all
  ports:
   - "10061:10051"
  volumes:
   - /etc/localtime:/etc/localtime:ro
   - /etc/timezone:/etc/timezone:ro 
   - ./zbx_env/usr/lib/zabbix/externalscripts:/usr/lib/zabbix/externalscripts:ro
   - ./zbx_env/var/lib/zabbix/modules:/var/lib/zabbix/modules:ro
   - ./zbx_env/var/lib/zabbix/enc:/var/lib/zabbix/enc:ro
   - ./zbx_env/var/lib/zabbix/ssh_keys:/var/lib/zabbix/ssh_keys:ro
   - ./zbx_env/var/lib/zabbix/mibs:/var/lib/zabbix/mibs:ro
   - snmptraps:/var/lib/zabbix/snmptraps:rw
  ulimits:
   nproc: 65535
   nofile:
    soft: 20000
    hard: 40000
  deploy:
   resources:
    limits:
      cpus: '0.70'
      memory: 512M
    reservations:
      cpus: '0.3'
      memory: 256M
  env_file:
   - ./env_vars/.env_prx
   - ./env_vars/.env_prx_sqlite3
  depends_on:
   - zabbix-java-gateway
   - zabbix-snmptraps
  networks:
   zbx_net_backend:
    aliases:
     - zabbix-proxy-sqlite3
     - zabbix-proxy-centos-sqlite3
     - zabbix-proxy-sqlite3-centos
   zbx_net_frontend:
  stop_grace_period: 30s
  labels:
   com.zabbix.description: "Zabbix proxy with SQLite3 database support"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "zabbix-proxy"
   com.zabbix.dbtype: "sqlite3"
   com.zabbix.os: "centos"

 zabbix-proxy-mysql:
  image: zabbix/zabbix-proxy-mysql:centos-6.2-latest
  profiles:
   - all
  ports:
   - "10071:10051"
  volumes:
   - /etc/localtime:/etc/localtime:ro
   - /etc/timezone:/etc/timezone:ro
   - ./zbx_env/usr/lib/zabbix/externalscripts:/usr/lib/zabbix/externalscripts:ro
   - ./zbx_env/var/lib/zabbix/modules:/var/lib/zabbix/modules:ro
   - ./zbx_env/var/lib/zabbix/enc:/var/lib/zabbix/enc:ro
   - ./zbx_env/var/lib/zabbix/ssh_keys:/var/lib/zabbix/ssh_keys:ro
   - ./zbx_env/var/lib/zabbix/mibs:/var/lib/zabbix/mibs:ro
   - snmptraps:/var/lib/zabbix/snmptraps:rw
  ulimits:
   nproc: 65535
   nofile:
    soft: 20000
    hard: 40000
  deploy:
   resources:
    limits:
      cpus: '0.70'
      memory: 512M
    reservations:
      cpus: '0.3'
      memory: 256M
  env_file:
   - ./env_vars/.env_db_mysql_proxy
   - ./env_vars/.env_prx
   - ./env_vars/.env_prx_mysql
  depends_on:
   - mysql-server
   - zabbix-java-gateway
   - zabbix-snmptraps
  secrets:
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_ROOT_USER
   - MYSQL_ROOT_PASSWORD
#   - client-key.pem
#   - client-cert.pem
#   - root-ca.pem
  networks:
   zbx_net_backend:
    aliases:
     - zabbix-proxy-mysql
     - zabbix-proxy-centos-mysql
     - zabbix-proxy-mysql-centos
   zbx_net_frontend:
  stop_grace_period: 30s
  labels:
   com.zabbix.description: "Zabbix proxy with MySQL database support"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "zabbix-proxy"
   com.zabbix.dbtype: "mysql"
   com.zabbix.os: "centos"

 zabbix-web-nginx-mysql:
  image: zabbix/zabbix-web-nginx-mysql:centos-6.2-latest
  ports:
   - "80:8080"
   - "443:8443"
  volumes:
   - /etc/localtime:/etc/localtime:ro
   - /etc/timezone:/etc/timezone:ro
   - ./zbx_env/etc/ssl/nginx:/etc/ssl/nginx:ro
   - ./zbx_env/usr/share/zabbix/modules/:/usr/share/zabbix/modules/:ro
  deploy:
   resources:
    limits:
      cpus: '0.70'
      memory: 512M
    reservations:
      cpus: '0.5'
      memory: 256M
  env_file:
   - ./env_vars/.env_db_mysql
   - ./env_vars/.env_web
  secrets:
   - MYSQL_USER
   - MYSQL_PASSWORD
#   - client-key.pem
#   - client-cert.pem
#   - root-ca.pem
  depends_on:
   - mysql-server
   - zabbix-server
  healthcheck:
   test: ["CMD", "curl", "-f", "http://localhost:8080/ping"]
   interval: 10s
   timeout: 5s
   retries: 3
   start_period: 30s
  networks:
   zbx_net_backend:
    aliases:
     - zabbix-web-nginx-mysql
     - zabbix-web-nginx-centos-mysql
     - zabbix-web-nginx-mysql-centos
   zbx_net_frontend:
  stop_grace_period: 10s
  sysctls:
   - net.core.somaxconn=65535
  labels:
   com.zabbix.description: "Zabbix frontend on Nginx web-server with MySQL database support"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "zabbix-frontend"
   com.zabbix.webserver: "nginx"
   com.zabbix.dbtype: "mysql"
   com.zabbix.os: "centos"

 zabbix-agent:
  image: zabbix/zabbix-agent:centos-6.2-latest
  profiles:
   - full
   - all
  ports:
   - "10050:10050"
  volumes:
   - /etc/localtime:/etc/localtime:ro
   - /etc/timezone:/etc/timezone:ro
   - ./zbx_env/etc/zabbix/zabbix_agentd.d:/etc/zabbix/zabbix_agentd.d:ro
   - ./zbx_env/var/lib/zabbix/modules:/var/lib/zabbix/modules:ro
   - ./zbx_env/var/lib/zabbix/enc:/var/lib/zabbix/enc:ro
   - ./zbx_env/var/lib/zabbix/ssh_keys:/var/lib/zabbix/ssh_keys:ro
  deploy:
   resources:
    limits:
      cpus: '0.2'
      memory: 128M
    reservations:
      cpus: '0.1'
      memory: 64M
   mode: global
  env_file:
   - ./env_vars/.env_agent
  privileged: true
  pid: "host"
  networks:
   zbx_net_backend:
    aliases:
     - zabbix-agent
     - zabbix-agent-passive
     - zabbix-agent-centos
  stop_grace_period: 5s
  labels:
   com.zabbix.description: "Zabbix agent"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "zabbix-agentd"
   com.zabbix.os: "centos"

 zabbix-java-gateway:
  image: zabbix/zabbix-java-gateway:centos-6.2-latest
  profiles:
   - full
   - all
  ports:
   - "10052:10052"
  deploy:
   resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
  env_file:
   - ./env_vars/.env_java
  networks:
   zbx_net_backend:
    aliases:
     - zabbix-java-gateway
     - zabbix-java-gateway-centos
  stop_grace_period: 5s
  labels:
   com.zabbix.description: "Zabbix Java Gateway"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "java-gateway"
   com.zabbix.os: "centos"

 zabbix-snmptraps:
  image: zabbix/zabbix-snmptraps:centos-6.2-latest
  profiles:
   - full
   - all
  ports:
   - "162:1162/udp"
  volumes:
   - snmptraps:/var/lib/zabbix/snmptraps:rw
  deploy:
   resources:
    limits:
      cpus: '0.5'
      memory: 256M
    reservations:
      cpus: '0.25'
      memory: 128M
  networks:
   zbx_net_frontend:
    aliases:
     - zabbix-snmptraps
   zbx_net_backend:
  stop_grace_period: 5s
  labels:
   com.zabbix.description: "Zabbix snmptraps"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "snmptraps"
   com.zabbix.os: "centos"

 zabbix-web-service:
  image: zabbix/zabbix-web-service:centos-6.2-latest
  profiles:
   - full
   - all
  ports:
   - "10053:10053"
  cap_add:
   - SYS_ADMIN
  volumes:
   - ./zbx_env/var/lib/zabbix/enc:/var/lib/zabbix/enc:ro
  deploy:
   resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
  env_file:
   - ./env_vars/.env_web_service
  networks:
   zbx_net_backend:
    aliases:
     - zabbix-web-service
     - zabbix-web-service-centos
  stop_grace_period: 5s
  labels:
   com.zabbix.description: "Zabbix web service"
   com.zabbix.company: "Zabbix LLC"
   com.zabbix.component: "web-service"
   com.zabbix.os: "centos"

 mysql-server:
  image: mysql:8.0-oracle
  command:
   - mysqld
   - --character-set-server=utf8mb4
   - --collation-server=utf8mb4_bin
   - --default-authentication-plugin=mysql_native_password
#   - --require-secure-transport
#   - --ssl-ca=/run/secrets/root-ca.pem
#   - --ssl-cert=/run/secrets/server-cert.pem
#   - --ssl-key=/run/secrets/server-key.pem
  volumes:
   - ./zbx_env/var/lib/mysql:/var/lib/mysql:rw
  env_file:
   - ./env_vars/.env_db_mysql
  secrets:
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_ROOT_PASSWORD
#   - server-key.pem
#   - server-cert.pem
#   - root-ca.pem
  stop_grace_period: 1m
  networks:
   zbx_net_backend:
    aliases:
     - mysql-server
     - zabbix-database
     - mysql-database

 db_data_mysql:
  image: busybox
  volumes:
   - ./zbx_env/var/lib/mysql:/var/lib/mysql:rw

# elasticsearch:
#  image: elasticsearch
#  profiles:
#   - full
#   - all
#  environment:
#   - transport.host=0.0.0.0
#   - discovery.zen.minimum_master_nodes=1
#  networks:
#   zbx_net_backend:
#    aliases:
#     - elasticsearch

networks:
  zbx_net_frontend:
    driver: bridge
    driver_opts:
      com.docker.network.enable_ipv6: "false"
    ipam:
      driver: default
      config:
      - subnet: 172.16.238.0/24
  zbx_net_backend:
    driver: bridge
    driver_opts:
      com.docker.network.enable_ipv6: "false"
    internal: true
    ipam:
      driver: default
      config:
      - subnet: 172.16.239.0/24

volumes:
  snmptraps:

secrets:
  MYSQL_USER:
    file: ./env_vars/.MYSQL_USER
  MYSQL_PASSWORD:
    file: ./env_vars/.MYSQL_PASSWORD
  MYSQL_ROOT_USER:
    file: ./env_vars/.MYSQL_ROOT_USER
  MYSQL_ROOT_PASSWORD:
    file: ./env_vars/.MYSQL_ROOT_PASSWORD
#  client-key.pem:
#    file: ./env_vars/.ZBX_DB_KEY_FILE
#  client-cert.pem:
#    file: ./env_vars/.ZBX_DB_CERT_FILE
#  root-ca.pem:
#    file: ./env_vars/.ZBX_DB_CA_FILE
#  server-cert.pem:
#    file: ./env_vars/.DB_CERT_FILE
#  server-key.pem:
#    file: ./env_vars/.DB_KEY_FILE
```

