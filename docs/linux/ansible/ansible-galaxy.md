---
icon: linux
title: ansible-galaxy
category: Linux
date: 2022-07-29
tag:
- ansible
---


# ansible-galaxy

[ansible 中文指南](http://ansible.com.cn/docs/intro.html)

[本节示例文件 提取码：1234](https://pan.baidu.com/s/1fkosURl4HaYZALtSjKvcKg)



## 语法

[ansible-galaxy](https://galaxy.ansible.com/) ：是一个免费的用于查找，下载，评论各种社区开发的 Ansible 角色

[ansible-galax语法](https://docs.ansible.com/ansible/latest/cli/ansible-galaxy.html)

```
usage: ansible-galaxy [-h] [--version] [-v] TYPE ...

执行各种与角色和集合相关的操作。

positional arguments:
  TYPE
    collection   管理Ansible Galaxy收藏。
    role         管理Ansible Galaxy角色。

optional arguments:
  -v, --verbose  详细模式（-vvv了解更多信息，-vvv启用连接调试）
```

- collection
  - collection init 初始化集合
  - collection build 构建集合
  - collection publish 发布集合
  - collection install 安装

- role
  - role init 初始化角色
  - role remove 删除
  - role delete 删除
  - role list 角色列表
  - role search 搜索
  - role import 导入
  - role setup 设置
  - role info 信息
  - role install 安装







