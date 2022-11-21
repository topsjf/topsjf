---
article: false
timeline: false
---
### cat 显示较少内容

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

cat 【选项】【文件名】

- -n 统计行号
- -b 空行不计入行号的统计
- -t 禁用制表符

```shell
[root@admin home]# cat demo.txt
sdfsdfsdf

1354354

34sdr23424sdfs

[root@admin home]# cat -n demo.txt
     1  sdfsdfsdf
     2
     3  1354354
     4
     5  34sdr23424sdfs
     6
[root@admin home]# cat -b demo.txt
     1  sdfsdfsdf

     2  1354354

     3  34sdr23424sdfs

[root@admin home]# cat -T demo.txt
sdfsdfsdf

1354354

34sdr23424sdfs

```


```shell
# 替换全部内容
cat -s <<EOF > /home/test/k8s.conf
vm.swappiness=0
EOF

# 追加内容
cat -s <<EOF >> /home/test/k8s.conf
vm.swappiness=0
EOF
```

