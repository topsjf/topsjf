---
article: false
timeline: false
---
### df 检查文件系统的磁盘空间占用情况

- [返回命令大全列表](./command.md#磁盘管理)

①、命令名称：df

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：df命令参数功能：检查文件系统的磁盘空间占用情况。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

⑥、语法：

df [-ahikHTm] [目录或文件名]

选项与参数：

- -a  ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
- -k  ：以 KBytes 的容量显示各文件系统；
- -m  ：以 MBytes 的容量显示各文件系统；
- -h  ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
- -H  ：以 M=1000K 取代 M=1024K 的进位方式；
- -T  ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
- -i  ：不用硬盘容量，而以 inode 的数量来显示

**实例 1**

将系统内所有的文件系统列出来！

```shell
[root@admin home]# df
文件系统                   1K-块    已用     可用 已用% 挂载点
devtmpfs                 4049260       0  4049260    0% /dev
tmpfs                    4062520       0  4062520    0% /dev/shm
tmpfs                    4062520    9236  4053284    1% /run
tmpfs                    4062520       0  4062520    0% /sys/fs/cgroup
/dev/mapper/centos-root 83845120 7093704 76751416    9% /
/dev/sda1                1038336  148440   889896   15% /boot
/dev/mapper/centos-home 95496644  975504 94521140    2% /home
tmpfs                     812504       0   812504    0% /run/user/0
```

在 Linux 底下如果 df 没有加任何选项，那么默认会将系统内所有的  (不含特殊内存内的文件系统与 swap) 都以 1 Kbytes 的容量来列出来！

**实例 2**

将容量结果以易读的容量格式显示出来

```shell
[root@admin home]# df -h
文件系统                 容量  已用  可用 已用% 挂载点
devtmpfs                 3.9G     0  3.9G    0% /dev
tmpfs                    3.9G     0  3.9G    0% /dev/shm
tmpfs                    3.9G  9.1M  3.9G    1% /run
tmpfs                    3.9G     0  3.9G    0% /sys/fs/cgroup
/dev/mapper/centos-root   80G  6.8G   74G    9% /
/dev/sda1               1014M  145M  870M   15% /boot
/dev/mapper/centos-home   92G  953M   91G    2% /home
tmpfs                    794M     0  794M    0% /run/user/0

```

**实例 3**

将系统内的所有特殊文件格式及名称都列出来

```shell
[root@admin home]# df -aT
文件系统                类型           1K-块    已用     可用 已用% 挂载点
sysfs                   sysfs              0       0        0     - /sys
proc                    proc               0       0        0     - /proc
devtmpfs                devtmpfs     4049260       0  4049260    0% /dev
securityfs              securityfs         0       0        0     - /sys/kernel/security
tmpfs                   tmpfs        4062520       0  4062520    0% /dev/shm
devpts                  devpts             0       0        0     - /dev/pts
cgroup                  cgroup             0       0        0     - /sys/fs/cgroup/systemd
pstore                  pstore             0       0        0     - /sys/fs/pstore
configfs                configfs           0       0        0     - /sys/kernel/config
/dev/mapper/centos-root xfs         83845120 7093704 76751416    9% /
systemd-1               -                  -       -        -     - /proc/sys/fs/binfmt_misc
debugfs                 debugfs            0       0        0     - /sys/kernel/debug
mqueue                  mqueue             0       0        0     - /dev/mqueue
hugetlbfs               hugetlbfs          0       0        0     - /dev/hugepages
fusectl                 fusectl            0       0        0     - /sys/fs/fuse/connections
/dev/sda1               xfs          1038336  148440   889896   15% /boot
/dev/mapper/centos-home xfs         95496644  975504 94521140    2% /home
sunrpc                  rpc_pipefs         0       0        0     - /var/lib/nfs/rpc_pipefs
binfmt_misc             binfmt_misc        0       0        0     - /proc/sys/fs/binfmt_misc
tmpfs                   tmpfs         812504       0   812504    0% /run/user/0
```

**实例 4**

将 /etc 底下的可用的磁盘容量以易读的容量格式显示

```shell
[root@admin home]# df -h /etc
文件系统                   容量  已用    可用  已用%   挂载点
/dev/mapper/centos-root   80G  6.8G   74G   9%    /
```
