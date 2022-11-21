---
article: false
timeline: false
---
### file 查看文件类型

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：file

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：查看文件类型

⑥、语法：

file 【文件】


```shell
[root@admin home]# file user1
user1: directory
[root@admin home]# file demo.txt
demo.txt: empty
[root@admin home]# ln -s ./demo.txt ./user1/
[root@admin home]# ls -l user1/
总用量 0
lrwxrwxrwx 1 root root 10 9月  13 15:23 demo.txt -> ./demo.txt
[root@admin home]# file user1/demo.txt
user1/demo.txt: broken symbolic link to `./demo.txt'
[root@admin home]# file /bin/ls
/bin/ls: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID[sha1]=c8ada1f7095f6b2bb7ddc848e088c2d615c3743e, stripped
```
