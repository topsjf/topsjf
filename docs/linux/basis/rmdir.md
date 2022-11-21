---
article: false
timeline: false
---
### rmdir 删除空目录

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：rmdir

②、英文原意：remove empty directories

③、命令所在路径：/bin/rmdir

④、执行权限：所有用户

⑤、功能描述：删除空目录（如果目录下存在文件则不能删除）

⑥、语法： rmdir 【空目录名】

```shell
[root@admin home]# mkdir dd
[root@admin home]# ls
c  d  dd  e  root
[root@admin home]# rmdir dd
[root@admin home]# ls
c  d  e  root
```

```shell
[root@admin home]# mkdir -p ./dd/ff
[root@admin home]# ls
c  d  dd  e  root
[root@admin home]# rmdir dd
rmdir: 删除 "dd" 失败: 目录非空
```
