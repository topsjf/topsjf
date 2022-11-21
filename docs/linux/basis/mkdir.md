---
article: false
timeline: false
---
### mkdir 创建目录

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：mkdir

②、英文原意：make directories

③、命令所在路径：/bin/mkdir

④、执行权限：所有用户

⑤、功能描述：创建新目录

⑥、语法： mkdir 【-p】【目录名】

> `-p` 递归创建

**例子：**

*创建单个目录：*

```shell
[root@admin root]# mkdir data
[root@admin root]# ls
data
```

*创建多个目录：*

```shell
[root@admin root]# mkdir -p {a,b}
[root@admin root]# ls
a  b  data
```



**注意：**

1、创建的目录已经存在, 那么 Linux 会提示我们 Linux 无法创建它。

2、不带任何参数运行 mkdir 命令会在当前目录下创建目录。

3、不带上`-p`,如果新建的文件上级目录不存在则不会执行成功这种说法是错误的。加或者不加上 -p 前面的目录没有得都会依次创建。

4、创建目录的首要条件是， 在想要创建目录的目标路径下你必须具有访问权限



- 案例：

  > 进入`/`根目录，创建` c，e，d` 目录在 `home` 目录中，其中`e`中有文件夹 `software`，`d`中有文件夹 `program`，program中有文件夹名为 `demo.log` 的目录

```shell
[root@admin root]# cd /
[root@admin /]# mkdir -p /home/{c,e/software,d/program/demo.log}
[root@admin /]# cd home/
[root@admin home]# tree
.
├── c
├── d
│   └── program
│       └── demo.log
└── e
    └── software

10 directories, 0 files
```
