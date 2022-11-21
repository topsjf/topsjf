---
article: false
timeline: false
---
### touch 创建文件

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

```shell
[root@admin /]# touch /home/{a.log,b.log}
[root@admin /]# ls /home/
a.log  b.log  d
```



如果要创建一个带空格文件名的文件

```shell
[root@admin home]# touch "a b c"
[root@admin home]# ls -all
-rw-r--r--   1 root root   0 9月   9 22:05 a b c
```



**案例：**

删除/home中所有文件以及目录，进入/目录，创建同时创建 `a,b,c` 文件以及`a b c`文件一共四个文件

```shell
[root@admin home]# touch /home/{a,b,c,"a b c"}
[root@admin home]# ls -all
-rw-r--r--   1 root root   0 9月   9 22:08 a
-rw-r--r--   1 root root   0 9月   9 22:08 a b c
-rw-r--r--   1 root root   0 9月   9 22:08 b
-rw-r--r--   1 root root   0 9月   9 22:08 c
```
