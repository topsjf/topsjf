---
icon: linux
title: ansible安装mysql
category: Linux
date: 2022-07-30
tag:
- ansible
---


# ansible安装mysql





### 设置主机清单 `vim /etc/ansible/hosts`

```
[mysql]
192.168.0.[8:10]
```



### ① 在`roles`目录下生成对应的目录结构

```shell
[root@admin roles]# ansible-galaxy role init mysql
- Role mysql was created successfully

[root@admin roles]# ls
mysql  mysql.yml

[root@admin roles]# cat mysql.yml
---
- hosts: mysql
  remote_user: root
  roles:
    - mysql

[root@admin roles]# tree dockekr/
mysql/
├── files
│   ├── mysql-17_linux-x64_bin.rpm
│   └── uni_mysql.sh
├── tasks
│   ├── install.yml
│   └── main.yml
└── vars
    └── main.yml

8 directories, 8 files
```

### ② 定义 tasks 任务文件

wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm

vim /etc/ansible/roles/mysql/tasks/main.yml

```yaml
---
- include: install.yml
```

**install.yml**

```yaml
---
- name: uni old mysql
  script: ../files/uni_mysql.sh
- name: copy package to mysql17
  copy: src=../files/mysql-17_linux-x64_bin.rpm dest=/opt mode=0775
- name: delete line
  lineinfile: dest=/etc/profile regexp='(.*)JAVA_HOME(.*)' state=absent  
- name: install mysql17
  shell: rpm -ivh /opt/mysql-17_linux-x64_bin.rpm
- name: set mysql17 env
  lineinfile: dest=/etc/profile line="{{item.value}}" state=present
  with_items:
  - {value: "export JAVA_HOME=/usr/java/mysql-17.0.4/"}
  - {value: "export PATH=$JAVA_HOME/bin:$PATH"}
  
- name: source profile
  shell: source /etc/profile
- name: remove mysql package
  shell: rm -rf /opt/mysql-17_linux-x64_bin.rpm
```



### ③ 编写安装 shell 脚本

vim files/uni_mysql.sh

`rpm -qa | grep java`

```shell
#!/bin/bash
# 卸载
rpm -e --nodeps 
```



### ③ 定义 mysql 剧本文件

```yaml
[root@admin roles]# vim ./mysql.yml
---
- hosts: mysql
  remote_user: root
  roles:
    - mysql

```

### ④ 启动剧本

剧本定义完成以后，我们就可以来启动服务了：

```shell
ansible-playbook mysql.yml

```

校验：ansible mysql -m shell -a 'java -version'

```shell
[root@admin roles]# ansible mysql -m shell -a 'java -version'

```







