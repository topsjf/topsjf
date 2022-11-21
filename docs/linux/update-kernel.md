---
icon: linux
title: centos(kernel)内核升级
category: Linux
date: 2021-08-14
tag:
- linux
- kernel
---



# centos(kernel)内核升级



## 升级内核、并删除当前无用的系统内核版本

[https://kernel.org/](https://kernel.org/)

| mainline: | **5.18-rc6**      | 2022-05-08 | [[tarball](https://git.kernel.org/torvalds/t/linux-5.18-rc6.tar.gz)]            |                                                                               | [[patch](https://git.kernel.org/torvalds/p/v5.18-rc6/v5.17)]              | [[inc. patch](https://git.kernel.org/torvalds/p/v5.18-rc6/v5.18-rc5)]                   | [[view diff](https://git.kernel.org/torvalds/ds/v5.18-rc6/v5.18-rc5)] | [[browse](https://git.kernel.org/torvalds/h/v5.18-rc6)] |                                                                                |
|-----------|-------------------|------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------|--------------------------------------------------------------------------------|
| stable:   | **5.17.6**        | 2022-05-09 | [[tarball](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.17.6.tar.xz)]   | [[pgp](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.17.6.tar.sign)]   | [[patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/patch-5.17.6.xz)]   | [[inc. patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/incr/patch-5.17.5-6.xz)]     | [[view diff](https://git.kernel.org/stable/ds/v5.17.6/v5.17.5)]       | [[browse](https://git.kernel.org/stable/h/v5.17.6)]     | [[changelog](https://cdn.kernel.org/pub/linux/kernel/v5.x/ChangeLog-5.17.6)]   |
| stable:   | **5.16.20 [EOL]** | 2022-04-13 | [[tarball](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.16.20.tar.xz)]  | [[pgp](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.16.20.tar.sign)]  | [[patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/patch-5.16.20.xz)]  | [[inc. patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/incr/patch-5.16.19-20.xz)]   | [[view diff](https://git.kernel.org/stable/ds/v5.16.20/v5.16.19)]     | [[browse](https://git.kernel.org/stable/h/v5.16.20)]    | [[changelog](https://cdn.kernel.org/pub/linux/kernel/v5.x/ChangeLog-5.16.20)]  |
| longterm: | **5.15.38**       | 2022-05-09 | [[tarball](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.15.38.tar.xz)]  | [[pgp](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.15.38.tar.sign)]  | [[patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/patch-5.15.38.xz)]  | [[inc. patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/incr/patch-5.15.37-38.xz)]   | [[view diff](https://git.kernel.org/stable/ds/v5.15.38/v5.15.37)]     | [[browse](https://git.kernel.org/stable/h/v5.15.38)]    | [[changelog](https://cdn.kernel.org/pub/linux/kernel/v5.x/ChangeLog-5.15.38)]  |
| longterm: | **5.10.114**      | 2022-05-09 | [[tarball](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.10.114.tar.xz)] | [[pgp](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.10.114.tar.sign)] | [[patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/patch-5.10.114.xz)] | [[inc. patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/incr/patch-5.10.113-114.xz)] | [[view diff](https://git.kernel.org/stable/ds/v5.10.114/v5.10.113)]   | [[browse](https://git.kernel.org/stable/h/v5.10.114)]   | [[changelog](https://cdn.kernel.org/pub/linux/kernel/v5.x/ChangeLog-5.10.114)] |
| longterm: | **5.4.192**       | 2022-05-09 | [[tarball](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.4.192.tar.xz)]  | [[pgp](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.4.192.tar.sign)]  | [[patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/patch-5.4.192.xz)]  | [[inc. patch](https://cdn.kernel.org/pub/linux/kernel/v5.x/incr/patch-5.4.191-192.xz)]  | [[view diff](https://git.kernel.org/stable/ds/v5.4.192/v5.4.191)]     | [[browse](https://git.kernel.org/stable/h/v5.4.192)]    | [[changelog](https://cdn.kernel.org/pub/linux/kernel/v5.x/ChangeLog-5.4.192)]  |

### centos 内核升级

[http://www.elrepo.org/](http://www.elrepo.org/)

```shell
# 导入该源的秘钥
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
# 启用该源仓库
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-6.el7.elrepo.noarch.rpm
或者：
yum -y install https://www.elrepo.org/elrepo-release-7.el7.elrepo.noarch.rpm
```

**查看可升级的内核版本**

```shell
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
```

**可安装的软件包**

kernel-lt.x86_64		5.4.211-1.el7.elrepo		elrepo-kernel

kernel-ml.x86_64		5.19.4-1.el7.elrepo		elrepo-kernel

**安装内核**

```shell
yum --enablerepo=elrepo-kernel install -y kernel-lt-5.4.211-1.el7.elrepo
```

**查看当前系统内可用内核**

```shell
awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
```

**设置开机从新内核版本启动（其中 0 是上面查询出来的可用内核编号）**

```shell
grub2-set-default 0 && reboot
```

### 并删除当前无用的系统内核版本

**所有已安装的内核版本**

```shell
[root@master ~]# rpm -qa | grep kernel

kernel-tools-libs-3.10.0-1160.76.1.el7.x86_64
kernel-3.10.0-1160.76.1.el7.x86_64
kernel-headers-3.10.0-1160.76.1.el7.x86_64
kernel-devel-3.10.0-1160.el7.x86_64
kernel-tools-3.10.0-1160.76.1.el7.x86_64
kernel-devel-3.10.0-1160.76.1.el7.x86_64
kernel-lt-5.4.211-1.el7.elrepo.x86_64
kernel-3.10.0-1160.el7.x86_64
abrt-addon-kerneloops-2.1.11-60.el7.centos.x86_64
```

**当前使用的内核版本**

```shell
[root@master ~]# uname -r
5.4.192-1.el7.elrepo.x86_64
```

**删除**

```shell
yum remove -y kernel-3.10.0-1160.el7.x86_64 kernel-3.10.0-1160.76.1.el7.x86_64
```

或

```shell
yum remove $(rpm -qa | grep kernel | grep -v $(uname -r))

# 卸载后重新安装
yum --enablerepo=elrepo-kernel install -y kernel-lt-devel-5.4.211-1.el7.elrepo \
kernel-lt-doc-5.4.211-1.el7.elrepo \
kernel-lt-headers-5.4.211-1.el7.elrepo \
kernel-lt-tools-5.4.211-1.el7.elrepo \
kernel-lt-tools-libs-5.4.211-1.el7.elrepo \
kernel-lt-tools-libs-devel-5.4.211-1.el7.elrepo

[root@master ~]# rpm -qa | grep kernel
kernel-lt-doc-5.4.211-1.el7.elrepo.noarch
kernel-lt-tools-5.4.211-1.el7.elrepo.x86_64
kernel-lt-devel-5.4.211-1.el7.elrepo.x86_64
kernel-lt-5.4.211-1.el7.elrepo.x86_64
kernel-lt-tools-libs-5.4.211-1.el7.elrepo.x86_64
kernel-lt-headers-5.4.211-1.el7.elrepo.x86_64
kernel-lt-tools-libs-devel-5.4.211-1.el7.elrepo.x86_64


yum install -y gcc make ncurses-devel openssl-devel flex bison  elfutils-libelf-devel
```



