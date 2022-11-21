---
article: false
timeline: false
---
### mkfs 磁盘格式化

- [返回命令大全列表](./command.md#磁盘管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

磁盘分割完毕后自然就是要进行文件系统的格式化，格式化的命令非常的简单，使用 `mkfs`（make filesystem） 命令。

语法：

```shell
mkfs [-t 文件系统格式] 装置文件名
mkfs [选项] [-t <类型>] [文件系统选项] <设备> [<大小>]
选项：
 -t, --type=<类型>   文件系统类型；若不指定，将使用 ext2
     fs-options     实际文件系统构建程序的参数
     <设备>          要使用设备的路径
     <大小>          要使用设备上的块数
 -V, --verbose       解释正在进行的操作；
                      多次指定 -V 将导致空运行(dry-run)
 -V, --version       显示版本信息并退出
                      将 -V 作为 --version 选项时必须是惟一选项
 -h, --help          显示此帮助并退出
```

**实例 1**

查看 mkfs 支持的文件格式

```shell
[root@admin ~]# mkfs[tab][tab]
mkfs         mkfs.cramfs  mkfs.ext2    mkfs.ext3    mkfs.msdos   mkfs.vfat
```

按下两个[tab]，会发现 mkfs 支持的文件格式如上所示。

**实例 2**

将分区 `/dev/hdc6`（可指定你自己的分区） 格式化为 `ext3` 文件系统：

```shell
[root@admin ~]# mkfs -t ext3 /dev/hdc6
mke2fs 1.39 (29-May-2006)
Filesystem label=                <==这里指的是分割槽的名称(label)
OS type: Linux
Block size=4096 (log=2)          <==block 的大小配置为 4K 
Fragment size=4096 (log=2)
251392 inodes, 502023 blocks     <==由此配置决定的inode/block数量
25101 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=515899392
16 block groups
32768 blocks per group, 32768 fragments per group
15712 inodes per group
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912

Writing inode tables: done
Creating journal (8192 blocks): done <==有日志记录
Writing superblocks and filesystem accounting information: done

This filesystem will be automatically checked every 34 mounts or
180 days, whichever comes first.  Use tune2fs -c or -i to override.
# 这样就创建起来我们所需要的 Ext3 文件系统了！简单明了！
```
