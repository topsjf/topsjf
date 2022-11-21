---
article: false
timeline: false
---
### chown 所属组

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：

⑥、语法：

chown 【选项】 【所属用户：所属组】 【文件目录】

```
#将demo文件所属的用户为 root，组为 kong。
chown -R root:kong demo.txt
#修改 demo 文件夹所属的组为 root
chown -R :root demo.txt
chgrp –R root demo.txt
```


