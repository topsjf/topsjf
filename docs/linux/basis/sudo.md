---
article: false
timeline: false
---
### sudo 设置普通用户具有root权限

- [返回命令大全列表](./command.md#系统管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

1．添加 user1 用户，并对其设置密码。

```shell
[root@admin ~]# useradd user1
[root@admin ~]# passwd user1234
```

2．修改配置文件

```shell
[root@admin ~]# vim /etc/sudoers
```
修改 /etc/sudoers 文件，找到下面一行(91 行)，在 root 下面添加一行，如下所示：

```shell
## Allow root to run any commands anywhere
root ALL=(ALL) ALL
user1 ALL=(ALL) ALL
```

或者配置成采用 sudo 命令时，不需要输入密码

```shell
## Allow root to run any commands anywhere
root ALL=(ALL) ALL
user1 ALL=(ALL) NOPASSWD:ALL
```

修改完毕，现在可以用 user1 帐号登录，然后用命令 sudo ，即可获得 root 权限进行
操作。
