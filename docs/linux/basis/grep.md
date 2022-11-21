---
article: false
timeline: false
---
### grep 过滤查找及“|”管道符

- [返回命令大全列表](./command.md#)

①、命令名称：grep

②、英文原意：

③、命令所在路径：/usr/bin/grep

④、执行权限：所有用户

⑤、功能描述：搜索数据；管道符，“|”，表示将前一个命令的处理结果输出传递给后面的命令处理

⑥、语法： 

grep [选项]... PATTERN [FILE]...

- -v 反向搜索
- -n 显示匹配行号
- -c 知道有多少行含有匹配
- -e 指定多个匹配模式


```shell
[root@admin home]# grep three file1
three
[root@admin home]# grep t file1
two
three
[root@admin home]# grep 1 ds.log
1
10
100
145
[root@admin home]# grep -v t file1
one
four
five
[root@admin home]# grep -n t file1
2:two
3:three
[root@admin home]# grep -e t -e f file1
two
three
four
five
[root@admin home]# grep [tf] file1
two
three
four
five
```




