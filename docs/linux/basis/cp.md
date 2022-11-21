---
article: false
timeline: false
---
### cp 复制文件或目录

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：cp

②、英文原意：copy

③、命令所在路径：/bin/cp

④、执行权限：所有用户

⑤、功能描述：复制文件或目录

⑥、语法： cp -rp 【原文件或目录】【目标目录】

>  `-r` 复制目录
>
>  `-p` 保留文件属性

**案例：**

请进入根目录，将 `/home` 目录下的所有文件和文件夹清空并删除，在根目录下 `copy /etc/sound/events` 目录下的所有文件到`/home`目录下的`c`目录中

```shell
[root@admin /]# rm -rf /home/*
[root@admin /]# ls /home/
[root@admin /]# cp -rp  /etc/samba/* /home/
[root@admin /]# ls /home/
lmhosts  smb.conf  smb.conf.example
```
