---
icon: linux
title: centos网络网卡配置
category: Linux
date: 2021-09-10
tag:
- linux
- network
---



# centos网络网卡配置

## 一、设置本机静态IP
### 1、查看本机ip：ifconfig

### 2、设置静态ip -> 配置文件

```shell
#网卡的目录:
##centOS7的网卡
vim /etc/sysconfig/network-scripts/ifcfg-ens33
##centOS6的网卡
vim /etc/sysconfig/network-scripts/ifcfg-eth0
```

生产 UUID： uuidgen ens33

ls -l /dev/disk/by-uuid

查看 UUID： nmcli con | sed -n '1,2p'

BOOTPROTO：

> dhcp 表示使用动态IP，dhcp 动态IP地址是自行生成。
>
> none 无（不指定）通常是DHCP
>
> static 要自己自行指定IP地址
>
> bootp

```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_PRIVACY="no"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="ccb173d2-9470-4fc3-b894-cce7029f0455"
DEVICE="ens33"
ONBOOT="yes"
ETHTOOL_OPTS="autoneg off speed 10000 duplex full"
IPADDR="192.168.101.119"
# PREFIX="24"
NETMASK="255.255.255.0"
GATEWAY="192.168.101.1"
DNS1="192.168.1.1"
DNS2="192.168.101.1"
```

```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="dhcp"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="5ed15a21-bf0f-4b2a-a40a-33a07afb6560"
DEVICE="ens33"
ONBOOT="yes"
IPADDR="192.168.100.130"
PREFIX="24"
GATEWAY="192.168.100.2"
DNS1="192.168.100.2"
IPV6_PRIVACY="no"
```



```shell
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
#设置为静态ＩＰ地址
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PRIVACY=no
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
#可以不配置
UUID=7f69ba6b-895a-4cfa-941d-77dcceaa4c4c
DEVICE=ens33
#设置为随开机生效
ONBOOT=yes
#设置为IP地址,这个网段是由虚拟机的NAT模式的网关的决定
```

### 3、配置 vim /etc/hosts 映射关系

```shell
//添加ip+主机名
127.0.0.1  localhost localhost.localdomain localhost4 localhost4.localdomain4
::1     localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.100.130 yu
```



### 4、重新启动网络服务

```shell
//网络命令
system network start //启动网络服务
system network stop //停止网络服务
system network restart  //重启网络服务
system network status   //查看网络服务状态
systemctl restart network.service //重启网络服务，
```

**system与systemctl的区别：**
  system：centos6之前使用
  systemctl：centos7之后出现的，centos7也可以使用system，兼容低版本



### 5、ip配置成功
### 6、ping：ctrl+z 退出

```shell
ping 语法
-c  # 设定ping的次数，如果没有设定默认会一直ping下去直到按 Ctrl + C 结束
-f  # 洪水ping，也就是以最快的速度去ping，可以用来测试丢包率
-i  # 设定ping的时间间隔，如 ping -i 0.5 www.baidu.com 表示每隔0.5秒ping一次，如果没
有设置默认是一秒一次
-s  # 设置发送的数据包的大小，默认发送56字节，最大只能设置为65507字节
```



## 二、wind映射Linux主机



`C:\Windows\System32\drivers\etc`





