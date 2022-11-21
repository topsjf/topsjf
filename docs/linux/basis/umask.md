---
article: false
timeline: false
---
### umask 显示、设置文件的缺省权限

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：umask

②、英文原意：the user file-creation mask

③、命令所在路径：shell 内置命令

④、执行权限：所有用户

⑤、功能描述：显示、设置文件的缺省权限

⑥、语法： umask 【-S】

> `-S` 以rwx形式显示新建文件的缺省权限

**注意：可能大家不太明白这个命令的意思，我们分别执行umask** 和 umask -S  如下：

```shell
[root@admin home]# umask
0022
[root@admin home]# umask -S
u=rwx,g=rx,o=rx
```

其中umask 执行显示结果是 0022,第一个0表示特殊权限，后面我们会单独进行讲解有哪几种特殊权限。022表示权限的掩码值，我们用7 7 7 减去 0 2 2得到755（是每一位相减），表示的就是下面通过加上-S输出的rwxr-xr-x，这个值用数字表示就是755.

这个意思说明创建一个文件的默认权限所有者为rwx,所属组为rx,其他人为rx。也就是说创建一个新文件默认权限为 rwxr-xr-x，我们创建一个文件来验证一下：

```shell
[root@admin home]# touch a.log
[root@admin home]#
[root@admin home]# ll a.log
-rw-r--r-- 1 root root 0 9月   9 22:42 a.log
```

我们发现使用touch命令创建了一个文件a.txt，然后发现权限并不是rwxr-xr-x，而是rw-r--r--。对比发现少了三个x，也就是少了可执行权限。这是为什么呢？

这是因为在Linux系统中，所有新创建的文件都是没有可执行权限的。这是出于Linux系统的一种自我保护，因为类似的病毒木马程序都是具有可执行权限的。所以在Linux系统中，新创建的文件是没有可执行权限的。

那么我们如何设置默认权限呢？比如我们想将新创建的文件权限设置为rwxr-xr--，也就是754。我们用777减去754得到023。也就是通过执行 umask 023 来完成默认权限设置。

