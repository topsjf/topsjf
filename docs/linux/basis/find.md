---
article: false
timeline: false
---
### find 查找文件或者目录

- [返回命令大全列表](./command.md#文件管理)

①、命令名称： find

②、英文原意： 

③、命令所在路径： /usr/bin/find

④、执行权限：所有用户

⑤、功能描述： find 指令将从指定目录向下递归地遍历其各个子目录，将满足条件的文件显示在终端。

⑥、语法： 

find 【搜索范围】 【选项】

*选项：*

- -name<查询方式>  按照指定的文件名查找模式查找文件
- -user<用户名>  查找属于指定用户名所有文件
- -size<文件大小>  按照指定的文件大小查找文件
（`+n`大于 `-n`小于 `n`等于）

我们可以将其计量单位指定为以下约定：

- b：512 字节块（默认）
- c：字节
- w：双字节字
- k：KB
- M：MB
- G：GB


（1）按文件名：根据名称查找/目录下的所有 txt 文件。

```shell
find xiaoyu/ -name “*.txt”
```

（2）按拥有者：查找/opt目录下，所属用户名称为 user1 的文件

```shell
find xiaoyu/ -user user1
```

（3）按文件大小：在/home目录下查找大于200m的文件

```shell
find /home -size +204800
find /home -type f -size +10M -size -1G
```

（4）删除该目录下最后一次访问时间超过一年的日志文件呢？

```shell
find . -type f -atime +365 -exec rm -rf {} \;
```

（5）按名称或正则表达式查找文件

```shell
find . -name test.txt
find ./books -name "*.pdf"
find ./books -type f -name "*.pdf"
```

> 默认情况下，find 命令会搜索常规文件，但最好进行指定（-type f）以使所有内容更清晰。

（6）查找不同类型的文件

除了搜索常规文件外，我们还可以通过指定 `-type` 选项来搜索其他类型的文件。

例如目录：

```shell
find . -type d -name "yu*"
```

或者符号链接：

```shell
find . -type l -name "yu*"
```

（7）按指定的时间戳查找文件

要按指定的时间戳搜索文件，我们需要知道 Linux 系统中的 3 个不同的时间戳：

**访问时间戳（atime）** ：最后一次读取文件的时间。

**修改时间戳（mtime）** ：文件内容最后一次被修改的时间。

**更改时间戳（ctime）** ：上次更改文件元数据的时间（如，所有权、位置、文件类型和权限设置）

```shell
find . -type f -atime +365
find . -type f -mtime 5
find . -type f -ctime +5 -ctime -10
```


（9）按权限查找文件

`-perm` 选项可以帮助我们按指定权限查找文件

```shell
find . -type f -perm 777
```


（10）按所有权查找文件

使用 `-user` 选项指定用户名。

例如，以下命令将查找所有属于 yu 的文件：

```shell
find -type f -user yu
```


（11）在找到文件后执行命令

在找到我们需要的文件后进行后续操作。

例如将其删除，或检查它们的详细信息等等。

`-exec` 命令使这些所有事情变得更加容易

```shell
find . -type f -atime +365 -exec rm -rf {} \;
```

`{}` 是用于查找结果的占位符。

> 注意：占位符 {} 非常重要，尤其是在您想删除文件时。
因为，如果您不使用它，该命令将对所有文件执行
（而不是您刚刚通过 find 命令找到的文件）。

*一个使用占位符：*

```shell
find . -type f -atime +5 -exec ls {} \;
```

*另一个不使用：*

```shell
find . -type f -atime +5 -exec ls \;
```

`-exec` 选项后面的命令必须以分号（;）结束。
众所周知，转义字符用于去除单个字符的特殊含义。
在 Linux 中，反斜杠 \ 用作转义字符。
所以我们将它用于分号字符。



