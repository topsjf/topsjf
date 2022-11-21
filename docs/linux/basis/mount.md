---
article: false
timeline: false
---
### mount 磁盘挂载与卸除

- [返回命令大全列表](./command.md#磁盘管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

Linux 的磁盘挂载使用 `mount` 命令，卸载使用 `umount` 命令。

**磁盘挂载语法：**

```shell
mount [-t 文件系统] [-L Label名] [-o 额外选项] [-n]  装置文件名  挂载点
mount [-lhV]
mount -a [选项]
mount [选项] [--source] <源> | [--target] <目录>
mount [选项] <源> <目录>
mount <操作> <挂载点> [<目标>]
```

- -a  挂载/etc/fstab文件中指定的所有文件系统
- -f  使 mount 命令模拟挂载设备，但并不真的挂载
- -F  和 -a 参数一起使用时，会同时挂载所有文件系统
- -v  详细模式，将会说明挂载设备的每一步
- -I  不启用任何/sbin/mount.filesystem下的文件系统帮助文件
- -l  给ext2、ext3或XFS文件系统自动添加文件系统标签
- -n  挂载设备，但不注册到/etc/mtab已挂载设备文件中 
- -p num  进行加密挂载时，从文件描述符 num 中获得密码短语
- -s  忽略该文件系统不支持的挂载选项
- -r  将设备挂载为只读的
- -w  将设备挂载为可读写的（默认参数）
- -L label  将设备按指定的 label 挂载
- -U uuid  将设备按指定的 uuid 挂载
- -O  和 -a 参数一起使用，限制命令只作用到特定的一组文件系统上
- -o  给文件系统添加特定的选项

`-o` 参数允许在挂载文件系统时添加一些以逗号分隔的额外选项。以下为常用的选项。
- ro ：以只读形式挂载。
- rw ：以读写形式挂载。
- user ：允许普通用户挂载文件系统。
- check=none ：挂载文件系统时不进行完整性校验。
- loop ：挂载一个文件。


mount 命令提供如下四部分信息：
- 媒体的设备文件名 
- 媒体挂载到虚拟目录的挂载点 
- 文件系统类型 
- 已挂载媒体的访问状态

```shell
[root@admin home]# mount
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
devtmpfs on /dev type devtmpfs (rw,nosuid,size=4049260k,nr_inodes=1012315,mode=755)
securityfs on /sys/kernel/security type securityfs (rw,nosuid,nodev,noexec,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)

```

用默认的方式，将刚刚创建的 /dev/hdc6 挂载到 /mnt/hdc6 上面！

```shell
[root@admin ~]# mkdir /mnt/hdc6
[root@admin ~]# mount /dev/hdc6 /mnt/hdc6
[root@admin ~]# df
Filesystem           1K-blocks      Used Available Use% Mounted on
.....中间省略.....
/dev/hdc6              1976312     42072   1833836   3% /mnt/hdc6
```

手动挂载媒体设备的基本命令

```shell
mount -t type device directory
```

手动将U盘/dev/sdb1挂载到/media/disk

```shell
mount -t vfat /dev/sdb1 /media/disk
```



**磁盘卸载命令 `umount` 语法：**

```shell
umount [-fn] 装置文件名或挂载点
```

选项与参数：

- -f ：强制卸除！可用在类似网络文件系统 (NFS) 无法读取到的情况下；
- -n ：不升级 /etc/mtab 情况下卸除。

**卸载 /dev/hdc6**

```shell
[root@admin ~]# umount /dev/hdc6     
```
