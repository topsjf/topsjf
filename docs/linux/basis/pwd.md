---
article: false
timeline: false
---
### pwd 显示当前目录

- [返回命令大全列表](./command.md#磁盘管理)

①、命令名称：pwd

②、英文原意：print working directory

③、命令所在路径：/bin/pwd

④、执行权限：所有用户

⑤、功能描述：显示当前目录

⑥、语法： pwd

**案例**

将当前目录路径存入c盘下一个文件叫做he.txt文件

```shell
[root@admin home]# pwd > /home/c/he.log
[root@admin home]# cat /home/c/he.log
/home
```

`>` 写入内容到指定目录文件，`cat` 命令为用文本的方式打开一个文件

直接写字符串进入一个文本 echo "str" > file

```shell
[root@admin home]# echo "替换写入文本1" > /home/c/dd.log
[root@admin home]# echo "替换写入文本2" > /home/c/dd.log
[root@admin home]# cat /home/c/dd.log
替换写入文本2
[root@admin home]# echo "追加文本1" >> /home/c/dd.log
[root@admin home]# echo "追加文本2" >> /home/c/dd.log
[root@admin home]# cat /home/c/dd.log
替换写入文本2
追加文本1
追加文本2
```

