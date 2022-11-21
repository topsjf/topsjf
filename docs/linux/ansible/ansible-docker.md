---
icon: linux
title: ansible安装docker
category: Linux
date: 2022-07-30
tag:
- ansible
---


# ansible安装docker

### 设置主机清单 `vim /etc/ansible/hosts`

```
[docker]
192.168.0.[8:10]
```



### ① 在`roles`目录下生成对应的目录结构

```shell
[root@admin roles]# ansible-galaxy role init dockekr
- Role dockekr was created successfully

[root@admin roles]# ls
dockekr  docker.yml  mysql.yml  docker  docker.yml

[root@admin roles]# cat docker.yml
---
- hosts: docker
  remote_user: root
  roles:
    - docker


[root@admin roles]# tree dockekr/
docker/
├── defaults
│   └── main.yml
├── files
│   ├── daemon.json
│   └── install_docker.sh
├── tasks
│   ├── install.yml
│   ├── main.yml
│   ├── restart.yml
│   ├── start.yml
│   ├── status.yml
│   ├── stop.yml
│   └── uninstall.yml
└── vars
    └── main.yml


8 directories, 8 files
```

### ② 定义 tasks 任务文件

vim /etc/ansible/roles/docker/tasks/main.yml

```yaml
---
- include: install.yml
```

**install.yml**

```yaml
---
- name: install docker
  script: ../files/install_docker.sh *
  #yum -y install docker-ce-20.10.17-3.el7 docker-ce-cli-20.10.17-3.el7 containerd.io docker-compose-plugin
```

**start.yml**

```yaml
---
- hosts: docker
  remote_user: root
  tasks:
    - name: start docker service
      script: ../files/install_docker.sh start
#      shell: systemctl start docker
      tags: startdocker

```

**stop.yml**

```yaml
---
- hosts: docker
  remote_user: root
  tasks:
    - name: stop docker service
      script: ../files/install_docker.sh stop
#      shell: systemctl stop docker
      tags: stopdocker

```

**restart.yml**

```yaml
---
- hosts: docker
  remote_user: root
  tasks:
    - name: restart docker service
      script: ../files/install_docker.sh restart
#      shell: systemctl restart docker
      tags: restartdocker

```

**status.yml**

```yaml
---
- hosts: docker
  remote_user: root
  tasks:
    - name: status docker service
      script: ../files/install_docker.sh status
#      shell: systemctl status docker
      tags: statusdocker

```

**reload.yml**

```yaml
---
- hosts: docker
  remote_user: root
  tasks:
    - name: reload docker service
      script: ../files/install_docker.sh reload
#      shell: systemctl daemon-reload
      tags: reloaddocker

```

**uninstall.yml**

```yaml
---
- hosts: docker
  remote_user: root
  tasks:
    - name: uninstall docker
      shell: yum remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
      tags: uninstalldocker
```

> ansible-playbook ./docker/tasks/uninstall.yml



### ③ 编写安装 shell 脚本

vim files/install_docker.sh

```shell
#!/bin/bash

if [ -e "install-docker.log" ]; then
  rm -rf ./install-docker.log
fi
touch ./install-docker.log

kill_s(){
  # https://blog.csdn.net/qq_42476834/article/details/124719250
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> PID=$$,PPID=$PPID"
  # 0 exit退出，2结束进程，3退出，9强制结束进程，15正常结束进程
  #kill -15 $$ #|| kill -3 $$ || kill -9 $$
  killall -15 tail
  #exit 0
}

start(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 启动中 ..."
  systemctl start docker
  echo "----> 启动成功！"
  echo -e "\n"
}
restart(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 重新启动中 ..."
  systemctl restart docker
  echo "----> 重新启动成功！"
  echo -e "\n"
}
stops(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 停止进程中 ..."
  systemctl stop docker
  echo "----> 停止进程成功！"
  echo -e "\n"
}

enable(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 开启自动启动 ..."
  systemctl enable docker
  systemctl enable docker
  echo "----> 开启自动启动成功！"
  echo -e "\n"
}
disable(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 关闭自动启动 ..."
  systemctl disable docker
  echo "----> 关闭自动启动成功！"
  echo -e "\n"
}
status(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 当前状态 ..."
  echo "$(systemctl status docker)"
  echo -e "\n"
}
get_v(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 当前版本"
  echo "$(docker -v)"
  echo -e "\n"
}

waiting_input_version(){
  echo -e "\n"
#  echo -ne "[\e[0;31m15\e[0m]秒后将自动安装最新版，自定义请输入，如：3:20.10.17-3.el7\r"
#  sleep 15;
#  if read -p "请输入版本:" version;
#  then
#    echo "---->  自定义版本为:${version}"
#     yum install -y docker-ce-3:20.10.17-3.el7 docker-ce-cli-3:20.10.17-3.el7 containerd.io docker-compose-plugin
#     yum install -y docker-ce-${version}
#  else
    echo "---->  自动安装最新版本"
    yum -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin >> ./install-docker.log 2>&1
#  fi
  echo -e "\n"
}

rm_file(){
  rm -rf /etc/yum.repos.d/docker-ce.repo
  rm -rf /etc/docker/
  echo -e "\n"
}

uninstall(){
echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 准备卸载旧版本"
for i in $(rpm -qa | grep docker*) ; do
  echo "----> 软件包 ${i} 将被 删除..."
done
for i in $(rpm -qa | grep docker*) ; do
  echo "----> 正在删除 ${i} ..."
  yum remove -y ${i}
  yum remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  rm_file
done
echo -e "\n"
}

install_tool(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 安装依赖 ..."
  yum install -y yum-utils device-mapper-persistent-data lvm2
  echo -e "\n"

}


daemon_reload(){
echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 设置镜像加速 ..."
cat -s <<EOF > /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "registry-mirrors": [
    "https://04eo9xup.mirror.aliyuncs.com",
    "https://098cc8006500f4db0f2fc01937bbce40.mirror.swr.myhuaweicloud.com"
  ]
}
EOF

echo -e "----> 写入文件[/etc/docker/daemon.json] 成功！\n等待重新加载本地文件。"
systemctl daemon-reload
echo "----> 重新加载完成。"
echo -e "\n"
}

huawei_install(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 华为源 配置&安装"
  # step 1: 安装必要的一些系统工具
  install_tool
  # Step 2: 添加软件源信息
  echo "----> 下载repo文件 ..."
  wget -O /etc/yum.repos.d/docker-ce.repo https://repo.huaweicloud.com/docker-ce/linux/centos/docker-ce.repo
  # Step 3 修改repo
  echo -e "----> 更新 docker-repo\n"
  sed -i 's+download.docker.com+repo.huaweicloud.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
  # Step 4
  echo -e "\n-------------------------------------------------\n"
  echo "---->  更新仓库索引 ..."
  yum makecache >> ./install-docker.log 2>&1
  echo -e "\n-------------------------------------------------\n"
  echo "---->  查看docker可用版本 ..."
  echo -e "\n"
  yum list docker-ce.x86_64 --showduplicates | sort -r
  echo -e "\n-------------------------------------------------\n"
  sleep 10;
  echo "---->  正在安装 ..."
  echo -e "\n"
  waiting_input_version
  # Step 4: 开启Docker服务
  sleep 8;
  start
  sleep 12;
  enable
  sleep 10;
  status
  sleep 10;
  daemon_reload
  restart
  sleep 10;
  usermod -aG docker a
  echo -e "\n查看docker镜像列表：\n"
  docker images
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n"

}

ali_install(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> 阿里源 配置&安装"
  # step 1: 安装必要的一些系统工具
  install_tool
  # Step 2: 添加软件源信息
  echo "----> 下载repo文件 ..."
  yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  # Step 3
  echo -e "----> 更新 docker-repo\n"
  sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
  # Step 4
  echo -e "\n-------------------------------------------------\n"
  echo "---->  更新仓库索引 ..."
  yum makecache >> ./install-docker.log 2>&1
  echo -e "\n-------------------------------------------------\n"
  echo "---->  查看docker可用版本 ..."
  echo -e "\n"
  yum list docker-ce.x86_64 --showduplicates | sort -r
  echo -e "\n-------------------------------------------------\n"
  sleep 10;
  echo "---->  开始安装 ..."
  echo -e "\n"
  waiting_input_version
  # Step 4: 开启Docker服务
  sleep 8;
  start
  sleep 12;
  enable
  sleep 10;
  status
  sleep 10;
  daemon_reload
  restart
  sleep 10;
  usermod -aG docker a
  echo -e "\n查看docker镜像列表：\n"
  docker images
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n"
}


main(){
  echo -e "\n$(date +%Y-%m-%d,%H:%M:%S)\n--> docker 安装"
  uninstall >> ./install-docker.log 2>&1
  huawei_install >> ./install-docker.log 2>&1
  get_v
  sleep 5;
  kill_s
}

m1(){
huawei_install
kill_s
}
m2(){
ali_install
kill_s
}
m3(){
uninstall
kill_s
}
m4(){
start
kill_s
}
m5(){
stops
kill_s
}
m6(){
status
kill_s
}
m7(){
enable
kill_s
}
m8(){
disable
kill_s
}
m9(){
rm_file
kill_s
}
m10(){
restart
kill_s
}
m11(){
daemon_reload
kill_s
}


case $1 in
  in_huawei)
    m1 >> ./install-docker.log 2>&1;;
  in_ali)
    m2 >> ./install-docker.log 2>&1;;
  uni)
    m3 >> ./install-docker.log 2>&1;;
  start)
    m4 >> ./install-docker.log 2>&1;;
  restart)
    m10 >> ./install-docker.log 2>&1;;
  stop)
    m5 >> ./install-docker.log 2>&1;;
  status)
    m6  >> ./install-docker.log 2>&1;;
  enable)
    m7 >> ./install-docker.log 2>&1;;
  disable)
    m8 >> ./install-docker.log 2>&1;;
  reload)
    m11 >> ./install-docker.log 2>&1;;  
  rm)
    m9 >> ./install-docker.log 2>&1;;
  -h)
    echo "sh $0 { * | in_huawei | in_ali | uni | start | restart | stop | status | enable | disable | reload | rm | -h }"
    ;;
  *)
    main >> ./install-docker.log 2>&1;;
esac
```



### ③ 定义 vars 变量文件

```shell
[root@admin docker]# vim ./vars/main.yml
---
# 变量==1安装最新版本，!=1则安装变量指定的版本（20.10.17-3.el7）
docker_version: 20.10.17-3.el7
```

### ④ 定义 docker 剧本文件

```yaml
[root@admin roles]# vim ./docker.yml
---
- hosts: docker
  remote_user: root
  roles:
    - docker

```

### ⑥ 启动剧本

剧本定义完成以后，我们就可以来启动服务了：

```shell
[root@admin roles]# ansible-playbook docker.yml

PLAY [docker] *************************************************************************************

TASK [Gathering Facts] ****************************************************************************
ok: [192.168.0.8]
ok: [192.168.0.10]
ok: [192.168.0.9]

TASK [install docker] *****************************************************************************
changed: [192.168.0.9]
changed: [192.168.0.10]
changed: [192.168.0.8]

PLAY RECAP ****************************************************************************************
192.168.0.10               : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
192.168.0.8                : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
192.168.0.9                : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

节点监控进度

tail -f /root/install-docker.log



