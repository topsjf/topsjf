---
article: false
timeline: false
---
### rm 删除文件或目录

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：rm

②、英文原意：remove

③、命令所在路径：/bin/rm

④、执行权限：所有用户

⑤、功能描述：剪切文件、改名

⑥、语法： rm -rf 【文件或目录】

> `-r` 删除目录
>
> `-f` 强制执行

案例：

请进入/目录，然后同时删除 /home/a与b

```shell
[root@admin /]# ls /home/
a  b  d
[root@admin /]# rm -rf /home/{a,b}
[root@admin /]# ls /home/
d
```
