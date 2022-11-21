---
icon: edit
title: linux安装MySQL
category: database
date: 2020-05-12
tag:
- MySQL
---



# Linux下安装mysql

## rpm 方式安装 mysql

### 1、检查当前操作系统是否安装过mysql   ，如果安装进行卸载操作

```bash
#查看是否安装有mysql

[root@admin soft]# rpm -aq | grep mysql
mysql57-community-release-el7-11.noarch
mysql-community-common-5.6.46-2.el7.x86_64
mysql-community-libs-5.6.46-2.el7.x86_64
mysql-community-server-5.6.46-2.el7.x86_64
mysql-community-client-5.6.46-2.el7.x86_64

[root@admin soft]# rpm -aq | grep mariadb
mariadb-libs-5.5.65-1.el7.x86_64

#卸载：rpm -e --nodeps 

[root@admin soft]# rpm -e --nodeps mariadb-libs
[root@admin soft]# rpm -e --nodeps mysql57-community-release-el7-11.noarch
[root@admin soft]# rpm -e --nodeps mysql-community-common-5.7.38-1.el7.x86_64 mysql-community-server-5.7.38-1.el7.x86_64 mysql-community-client-5.7.38-1.el7.x86_64 mysql-community-libs-5.7.38-1.el7.x86_64

#清除数据
rm -rf /var/lib/mysql/
rm -rf /var/lib/mysql/data
rm -rf /var/log/mysqld.log 
```

### 2、下载与安装mysql

要求在线下载安装，所以必须保证你的虚拟机的Linux系统能正常的访问外网( 上网)

注：如何系统中没安装wget软件, 先安装:

```bash
yum –y install wget
```

#### 使用 wget 命令下载mysql的repo源：

--------

[https://downloads.mysql.com/archives/community/](https://downloads.mysql.com/archives/community/)：下载【common、libs、client、server】这几个文件

```
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-community-common-5.7.38-1.el7.x86_64.rpm
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-community-libs-5.7.38-1.el7.x86_64.rpm
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-community-client-5.7.38-1.el7.x86_64.rpm
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-community-server-5.7.38-1.el7.x86_64.rpm

```

-----------

```bash
wget http://repo.mysql.com/mysql57-community-release-el7-11.noarch.rpm
chmod +x mysql*
```

#### 使用 rpm 安装mysql 的yum源

- 安装时必须严格遵守安装顺序 **依赖关系依次为 common → libs → client → server**
- **注**：ivh中， i-install安装；v-verbose进度条；h-hash哈希校验

**方式一：**`yum -y install ./mysql57-community-release-el7-11.noarch.rpm`

```shell
[root@admin soft]# yum -y install ./mysql57-community-release-el7-11.noarch.rpm
#查看
[root@admin soft]# rpm -aq | grep mysql
mysql57-community-release-el7-11.noarch
[root@admin soft]# yum repolist enabled | grep mysql.*
mysql-connectors-community/x86_64 MySQL Connectors Community                 199
mysql-tools-community/x86_64      MySQL Tools Community                       92
mysql57-community/x86_64          MySQL 5.7 Community Server                 604
```

**方式二：**`rpm -ivh ./mysql57-community-release-el7-11.noarch.rpm`

```bash
[root@admin soft]# rpm -ivh ./mysql57-community-release-el7-11.noarch.rpm
#查看
[root@admin soft]# rpm -aq | grep mysql
mysql57-community-release-el7-11.noarch
[root@admin soft]# yum repolist enabled | grep mysql.*
mysql-connectors-community/x86_64 MySQL Connectors Community                 199
mysql-tools-community/x86_64      MySQL Tools Community                       92
mysql57-community/x86_64          MySQL 5.7 Community Server                 604
```

- yum 源安装mysql服务

```bash
[root@admin soft]# yum -y install mysql-community-server
```

**方式三：（推荐）** 

```shell
rpm -ivh mysql-community-common-5.7.38-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.38-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.38-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-5.7.38-1.el7.x86_64.rpm

```

**不需要执行：yum -y install mysql-community-server**

```shell
# 安装后查询安装的MySQL版本
[root@admin soft]# mysqladmin --version
mysqladmin  Ver 8.42 Distrib 5.7.38, for Linux on x86_64

[root@admin soft]# rpm -aq | grep mysql
mysql-community-server-5.7.38-1.el7.x86_64
mysql-community-common-5.7.38-1.el7.x86_64
mysql-community-libs-5.7.38-1.el7.x86_64
mysql-community-client-5.7.38-1.el7.x86_64
```

---------

### 3、 启动 mysql 服务

| CentOS6及以前版本         | CentOS7                     | 作用         |
| ------------------------- | --------------------------- | ------------ |
| service  服务名  start    | systemctl  start   服务名   | 启动某个服务 |
| service  服务名  stop     | systemctl  stop 服务名      | 停止         |
| service   服务名  restart | systemctl restart   服务名  | 重启         |
| service 服务名  status    | systemctl status 服务名     | 查看状态     |
|                           | systemctl enable    服务名  | 服务永久生效 |
|                           | systemctl disable    服务名 | 服务永久关闭 |

```bash
#当前有效，关机后失效
systemctl start mysqld
systemctl status mysqld
#启用系统服务永久生效
systemctl enable mysqld
```

### 4 、配置mysql

#### 查看密码：

```shell
cat /var/log/mysqld.log | grep password
或者：
grep 'temporary password' /var/log/mysqld.log
```

#### 登陆mysql

```shell
mysql  -uroot -p
```

#### 进入mysql系统数据库

```shell
use mysql;
```

在执行此语句之前，必须使用ALTER USER语句重置密码

> You must reset your password using ALTER USER statement before executing this statement.

#### 设置密码

**判断修改密码时候新密码是否符合当前的策略，密码不满足会报错，不让修改。**

```shell
set global validate_password_policy=0; 
set global validate_password_length=3;
```

（选1种即可：）

**（1）** ALTER USER 'root'@'localhost' IDENTIFIED  BY 'root12'; 

**（2）** update user set password=password('root12') where user='root'; 

**刷新：** flush privileges;

如果出现【ERROR1054(42S22):Unknown column 'password' in 'field list'】

执行：`update mysql.user set authentication_string=password('root12') where user='root';`  即可



#### 查看 新密码校验插件（可选项）

```shell
mysql> show variables like 'validate_password%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password_check_user_name    | OFF    |
| validate_password_dictionary_file    |        | 字典文件
| validate_password_length             | 8      | 密码长度的最小值。
| validate_password_mixed_case_count   | 1      | 大小写的最小个数。
| validate_password_number_count       | 1      | 密码中数字的最小个数。
| validate_password_policy             | MEDIUM | 0-->low ， 1-->MEDIUM ， 2-->strong。
| validate_password_special_char_count | 1      | 特殊字符的最小个数。
+--------------------------------------+--------+

mysql> use mysql;

#查看对应user与host关系
mysql> select user,host from user;
```



#### 设置访问权限,可以通过外部连接 数据库

GRANT ALL PRIVILEGES ON \*.* TO [远程访问用户名]@'IP' IDENTIFIED BY ['密码'] WITH GRANT OPTION;

如：

```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'IDENTIFIED BY 'root12' WITH GRANT OPTION;
```



#### 开启log-bin日志

```
set global log_bin_trust_function_creators=1;

持久化对应my.cnf
log_bin_trust_function_creators=1
```



**刷新马上生效**

```shell
flush privileges;
exit;
```

**重启mysql服务**

```shell
systemctl  restart  mysqld
```

**查看进程**

```shell
ps -e | grep mysqld
```



### 5、开放端口：

~~~bash
实际应用场景中防火墙是要打开的，只能开放端口来外部访问。
1、linux防火墙问题：
systemctl stop firewalld；开机就关闭：systemctl disable firewalld

一般是通过开放端口来实现，关闭防火墙容易导致安全问题。    
开端口命令：firewall-cmd --zone=public --add-port=3306/tcp --permanent
重启防火墙：systemctl restart firewalld
命令含义：
--zone #作用域
--add-port=3306/tcp  #添加端口，格式为：端口/通讯协议 
--permanent   #永久生效，没有此参数重启后失效
查看开启的所有端口：netstat -ntlp 或：firewall-cmd --list-ports
~~~
~~~
permanent
重启防火墙：systemctl restart firewalld
命令含义：
--zone #作用域
--add-port=3306/tcp  #添加端口，格式为：端口/通讯协议 
--permanent   #永久生效，没有此参数重启后失效
查看开启的所有端口：netstat -ntlp 或：firewall-cmd --list-ports
~~~
### 6、自己配置文件 vim /etc/my.cnf
```shell
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
datadir=/var/lib/mysql/data
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
log_bin_trust_function_creators=1
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

systemctl restart mysqld



## tar 方式安装

wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.38-el7-x86_64.tar.gz

### 解压

```shell
#授权
[root@admin soft]# chmod +x mysql-5.7.38-el7-x86_64.tar.gz
#解压
[root@admin soft]# tar -zxvf mysql-5.7.38-el7-x86_64.tar.gz
#重命名
[root@admin soft]# mv mysql-5.7.38-el7-x86_64 mysql
```





