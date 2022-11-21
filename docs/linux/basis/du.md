---
article: false
timeline: false
---
### du 查看使用空间

- [返回命令大全列表](./command.md#磁盘管理)

①、命令名称：du

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：Linux du 命令也是查看使用空间的，但是与 df 命令不同的是 Linux du 命令是对文件和目录磁盘使用的空间的查看，还是和df命令有一些区别的，这里介绍 Linux du 命令。

⑥、语法：

du [-ahskm] 文件或目录名称

选项与参数：

- -a  ：列出所有的文件与目录容量，因为默认仅统计目录底下的文件量而已。
- -h  ：以人们较易读的容量格式 (G/M) 显示；
- -s  ：列出总量而已，而不列出每个各别的目录占用容量；
- -S  ：不包括子目录下的总计，与 -s 有点差别。
- -k  ：以 KBytes 列出容量显示；
- -m  ：以 MBytes 列出容量显示；

**实例 1**

只列出当前目录下的所有文件夹容量（包括隐藏文件夹）:

```shell
[root@admin home]# du
4       ./c 	<==每个目录都会列出来
942476  ./soft	<==每个目录都会列出来
942480  .		<==这个目录(.)所占用的总量
....中间省略....
12      ./.gconfd   <==包括隐藏文件的目录          
```

直接输入 du 没有加任何选项时，则 du 会分析当前所在目录里的子目录所占用的硬盘空间。

**实例 2**

将文件的容量也列出来

```shell
[root@admin ~]# du -a
4       ./.bash_logout
4       ./.bash_profile
4       ./.bashrc
4       ./.ssh/id_rsa
4       ./.ssh/id_rsa.pub
4       ./.ssh/known_hosts
12      ./.ssh
....中间省略....
8080    .
```

**实例 3**

检查根目录底下每个目录所占用的容量

```shell
[root@admin ~]# du -sm /*
0       /bin
113     /boot
0       /data
0       /dev
1       /dump.rdb
367     /etc
921     /home
0       /lib
0       /lib64
1       /main.log
0       /media
0       /mnt
0       /opt
du: 无法访问"/proc/14950": 没有那个文件或目录
du: 无法访问"/proc/14951/task/14951/fd/3": 没有那个文件或目录
du: 无法访问"/proc/14951/task/14951/fdinfo/3": 没有那个文件或目录
du: 无法访问"/proc/14951/fd/3": 没有那个文件或目录
du: 无法访问"/proc/14951/fdinfo/3": 没有那个文件或目录
0       /proc
8       /root
10      /run
0       /sbin
0       /srv
0       /sys
1       /tmp
4724    /usr
1725    /var
```

通配符 * 来代表每个目录。

与 df 不一样的是，du 这个命令其实会直接到文件系统内去搜寻所有的文件数据。
