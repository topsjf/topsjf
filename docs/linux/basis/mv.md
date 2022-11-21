---
article: false
timeline: false
---
### mv 剪切文件或目录

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：mv

②、英文原意：move

③、命令所在路径：/bin/mv

④、执行权限：所有用户

⑤、功能描述：剪切文件、改名

⑥、语法： mv【原文件或目录】【目标目录】

**案例：**

在/tmp目录下，创建一个文件夹d，d目录中创建一个文件b.log，进入/，将/tmp 中的d文件夹中的所有内容包含d目录本身剪切到/home目录下

```shell'
[root@admin /]# cd /tmp/
[root@admin tmp]# mkdir d
[root@admin tmp]# touch ./d/b.log
[root@admin tmp]# cd /
[root@admin /]# mv /tmp/d /home/
[root@admin /]# ls /home/
d
[root@admin /]# ls /home/d/
b.log
```
