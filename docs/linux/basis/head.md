---
article: false
timeline: false
---
### head 查看文件内容

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：head

②、英文原意：

③、命令所在路径：/usr/bin/head

④、执行权限：所有用户

⑤、功能描述： 查看文件内容，通常查看文件前10行

⑥、语法

head 【选项】 【文件】

- -c, --bytes=[-]K   显示每个文件的前 K 字节内容，如果附加"-"参数，则除了每个文件的最后 K 字节数据外显示剩余全部内容；
- -n, --lines=[-]K   显示每个文件的前 K 行内容，如果附加"-"参数，则除了每个文件的最后 K 行外显示剩余全部内容
- -q, --quiet, --silent 不显示包含给定文件名的文件头
- -v, --verbose         总是显示包含给定文件名的文件头

```shell
[root@admin home]# head demo.txt
sdfsdfsdf

1354354

34sdr23424sdfs

34sdr23424sdfs
34sdr23424sdfs
34sdr23424sdfs
34sdr23424sdfs
[root@admin home]# head -3 demo.txt
sdfsdfsdf

1354354
```