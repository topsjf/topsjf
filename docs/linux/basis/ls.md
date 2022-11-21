---
article: false
timeline: false
---
### ls 显示目录文件

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：ls

②、英文原意：list

③、命令所在路径：/bin/ls

④、执行权限：所有用户

⑤、功能描述：显示目录文件

⑥、语法： ls 选项[-al]】[文件或目录]

> 选项：
>
> **-a** 显示所有文件，包括隐藏文件
>
>  **-l** 详细信息显示—— ls-l 可以简写成 ll
>
> **-d** 仅显示目录名，而不显示目录下的内容列表
>
> **-h** 人性化显示（hommization）
>
> **-i** 查看任意一个文件的i节点（类似于身份证唯一信息）
>
> **-t** 用文件和目录的更改时间排序；可以用第一个显示的文件判断最近修改的文件
> 
> **-F** 轻松区分文件和目录: /代表目录 @代表链接文件
> 
> **-R** 递归选项；它列出了当前目录下包含的子目录中的文件。如果目录很多，这个输出就会很长。
> 

**注意：** `.` 开头的文件除非是目录，否则就是隐藏文件

```shell
[root@admin /]# ls -all
总用量 24
dr-xr-xr-x.  18 root root  272 8月  10 17:36 .
dr-xr-xr-x.  18 root root  272 8月  10 17:36 ..
-rw-r--r--    1 root root    0 5月  10 15:10 .autorelabel
lrwxrwxrwx.   1 root root    7 5月  10 14:03 bin -> usr/bin
dr-xr-xr-x.   5 root root 4096 5月  10 15:13 boot
```

```shell
[root@admin home]# ls -F /
bin@   data/  dump.rdb  home/  lib64@    media/  opt/   root/  sbin@  sys/  usr/
boot/  dev/   etc/      lib@   main.log  mnt/    proc/  run/   srv/   tmp/  var
```

```shell
[root@admin home]# ls -F -R  /home/
/home/:
dd.sh  demo.txt  soft/  user1/

/home/soft:
mysql5.7.39-el7-x86_64.tar.gz*  redis-6.2.4.tar.gz*

/home/user1:
```

- ls -l dd?ff.log     代表匹配一个单词
- ls -l dd*ff.log     代表匹配任意一个或多个单单词
- ls -l dd[ai]ff.log  [ai]匹配到a或i的文件 
- ls -l dd[1-9]ff.log 范围匹；[1-9]或[a-g]匹配到(1到9,a到g)的文件
- ls -l dd[!a]ff.log  排除匹配到a的文件
- ls -l dd*       匹配到以dd开头

```shell
[root@admin home]# ls
dd1ff.log     dd2ff.log  ddaff.log  ddcff.log  ddeff.log  ddg2ff.log  ddopff.log  soft
dd23opff.log  dd3ff.log  ddbff.log  dddff.log  ddfff.log  ddgff.log   demo.txt    user1
[root@admin home]# ls -l dd?ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd1ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd3ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddaff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddbff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddcff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 dddff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddeff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddfff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddgff.log
[root@admin home]# ls -l dd*ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd1ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd23opff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd3ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddaff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddbff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddcff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 dddff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddeff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddfff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddg2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddgff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 ddopff.log
[root@admin home]# ls -l dd[ai]ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddaff.log
[root@admin home]# ls -l dd[1-9]ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd1ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd3ff.log
[root@admin home]# ls -l dd[!a]ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd1ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd3ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddbff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddcff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 dddff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddeff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddfff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddgff.log
[root@admin home]# ls -l dd*
-rw-r--r-- 1 root root 0 9月  13 15:10 dd1ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd23opff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 dd3ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddaff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddbff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddcff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 dddff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddeff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddfff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddg2ff.log
-rw-r--r-- 1 root root 0 9月  13 15:09 ddgff.log
-rw-r--r-- 1 root root 0 9月  13 15:10 ddopff.log
```


**分析：**

- ①、第一列表示文件类型：`-` 表示是文件，`d` 表示目录， `l` 表示软连接文件，`b` 表示为装置文件里面的可供储存的接口设备(可随机存取装置)，`c` 表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)

- 后面的每三个为一组：`u g o`

![](./ls.assets/true-img2.png)

![](./ls.assets/true-image-20220913105720580.png)

  `r读` `w写` `x执行` `-无权限`

| 代表字符 | 权限   | 对文件的含义      | 对目录的含义        |
|------|------|-------------|---------------|
| r    | 读权限  | 可以查看文件内容    | 可以列出目录中的内容    |
| w    | 写权限  | 可以修改文件内容    | 可以在目录中创建、删除文件 |
| x    | 执行权限 | 可以执行文件      | 可以进入目录        |
| -    | 无权限  | 不可以对文件的所有操作 | 不可以进入目录       |


- ②、第2列表示：引用计数，表示文件被引用过多少次

- ③、第3-4列表示：第一个root表示所有者，一般创建一个文件，所有者默认是创建者。第二个root表示所属组。

- ④、第5列表示：文件字节大小，不带单位表示字节

- ⑤、第6列表示：8月 10 17:36 文件的最后修改时间。注意：Linux没有明确的创建时间，只有最后一次访问时间、文件的状态修改时间、文件的数据修改时间

- ⑥、第7列表示：文件名或目录名

案例：进入 `/` 目录，查看/目录下所有文件和所有文件的详细信息，查看bin目录下所有文件的详细信息

```shell
[root@admin ~]# cd /
[root@admin /]# ls -al /
总用量 24
dr-xr-xr-x.  18 root root  272 9月   9 21:15 .
dr-xr-xr-x.  18 root root  272 9月   9 21:15 ..
-rw-r--r--    1 root root    0 5月  10 15:10 .autorelabel
lrwxrwxrwx.   1 root root    7 5月  10 14:03 bin -> usr/bin
dr-xr-xr-x.   5 root root 4096 5月  10 15:13 boot
drwxr-xr-x    3 root root   26 8月  10 17:48 data

[root@admin /]# ll /bin
lrwxrwxrwx. 1 root root 7 5月  10 14:03 /bin -> usr/bin
```

