---
article: false
timeline: false
---
### fdisk 磁盘分区表

- [返回命令大全列表](./command.md#磁盘管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

fdisk 是 Linux 的磁盘分区表操作工具。

语法：

```shell
fdisk [-l] 装置名称
fdisk [选项] <磁盘>    更改分区表
fdisk [选项] -l <磁盘> 列出分区表
fdisk -s <分区>        给出分区大小(块数)
选项：
 -b <大小>             扇区大小(512、1024、2048或4096)
 -c[=<模式>]           兼容模式：“dos”或“nondos”(默认)
 -h                    打印此帮助文本
 -u[=<单位>]           显示单位：“cylinders”(柱面)或“sectors”(扇区，默认)
 -v                    打印程序版本
 -C <数字>             指定柱面数
 -H <数字>             指定磁头数
 -S <数字>             指定每个磁道的扇区数
```

选项与参数：

- -l  ：输出后面接的装置所有的分区内容。若仅有 fdisk -l 时，则系统将会把整个系统内能够搜寻到的装置的分区均列出来。

**实例 1**

列出所有分区信息

```shell
[root@admin ~]# fdisk -l

磁盘 /dev/sda：193.3 GB, 193273528320 字节，377487360 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
磁盘标签类型：dos
磁盘标识符：0x000ab2a1

   设备 Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200   377487359   187694080   8e  Linux LVM

磁盘 /dev/mapper/centos-root：85.9 GB, 85899345920 字节，167772160 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节


磁盘 /dev/mapper/centos-swap：8455 MB, 8455716864 字节，16515072 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节


磁盘 /dev/mapper/centos-home：97.8 GB, 97836335104 字节，191086592 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
```

**实例 2**

找出你系统中的根目录所在磁盘，并查阅该硬盘内的相关信息

```shell
[root@admin ~]# df /
文件系统                   1K-块    已用     可用 已用% 挂载点
/dev/mapper/centos-root 83845120 7093716 76751404    9% /
[root@admin ~]#
[root@admin ~]# fdisk /dev/mapper/centos-root
欢迎使用 fdisk (util-linux 2.23.2)。

更改将停留在内存中，直到您决定将更改写入磁盘。
使用写入命令前请三思。

Device does not contain a recognized partition table
使用磁盘标识符 0x49e1bab1 创建新的 DOS 磁盘标签。

命令(输入 m 获取帮助)： 			<==等待你的输入！
```

**命令操作**

```shell
命令(输入 m 获取帮助)：m			<== 输入 m 后，就会看到底下这些命令介绍
命令操作
    a	切换可引导标志
    b	编辑bsd磁盘标签
    c	切换dos兼容性标志
    d	删除分区
    g	创建一个新的空GPT分区表
    G	创建IRIX（SGI）分区表
    l	已知分区类型列表
    m	打印此菜单
    n	添加新分区
    o	创建一个新的空DOS分区表
    p	打印分区表
    q	退出而不保存更改
    s	创建一个新的空Sun磁盘标签
    t	更改分区的系统id
    u	更改显示/输入单位
    v	验证分区表
    w	将表写入磁盘并退出
    x	额外功能（仅限专家）
```

离开 fdisk 时按下 `q`，那么所有的动作都不会生效！相反的， 按下`w`就是动作生效的意思。

```shell
Command (m for help): p  <== 这里可以输出目前磁盘的状态

Disk /dev/hdc: 41.1 GB, 41174138880 bytes        <==这个磁盘的文件名与容量
255 heads, 63 sectors/track, 5005 cylinders      <==磁头、扇区与磁柱大小
Units = cylinders of 16065 * 512 = 8225280 bytes <==每个磁柱的大小

   Device Boot      Start         End      Blocks   Id  System
/dev/hdc1   *           1          13      104391   83  Linux
/dev/hdc2              14        1288    10241437+  83  Linux
/dev/hdc3            1289        1925     5116702+  83  Linux
/dev/hdc4            1926        5005    24740100    5  Extended
/dev/hdc5            1926        2052     1020096   82  Linux swap / Solaris
# 装置文件名 启动区否 开始磁柱    结束磁柱  1K大小容量 磁盘分区槽内的系统

Command (m for help): q
```

想要不储存离开吗？按下 q 就对了！不要随便按 w 啊！

使用 `p` 可以列出目前这颗磁盘的分割表信息，这个信息的上半部在显示整体磁盘的状态。
