---
icon: edit
title: MySQL内容整理
category: database
date: 2022-05-12
tag:
- MySQL
---


<a target="_blank" href="https://www.cs.usfca.edu/~galles/visualization/Algorithms.html">数据结构在线演示</a>

<a target="_blank" href="https://www.cs.usfca.edu/~galles/visualization/BST.html">二叉树在线演示</a>

<a target="_blank" href="https://www.cs.usfca.edu/~galles/visualization/RedBlack.html">红黑树在线演示</a>

<a target="_blank" href="https://www.cs.usfca.edu/~galles/visualization/BTree.html">B树在线演示</a>

<a target="_blank" href="https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html">B+树在线演示</a>


##  1.1、SQL概述 
SQL，一般发音为sequel，SQL的全称Structured Query Language)，SQL用来和数据库打交道，完成和数据库的通信，SQL是一套标准。但是每一个数据库都有自己的特别的数据库没有,当使用这个数据库特性相关的功能,这时SQL语句可能就不是标准了.(90%以上的SQL都是通用的)
##  1.2、什么是数据库 
数据库，通常是一个或一组文件，保存了一些符合特定规格的数据,数据库对应的英语单词是DataBase,简称:DB,数据库软件称为数据库管理系统（DBMS），全称为DataBase Management System，如：Oracle、SQL Server、MySql、Sybase、informix、DB2、interbase、PostgreSql 。
##  1.3、MySql概述 
MySQL最初是由“MySQL AB”公司开发的一套关系型数据库管理系统（RDBMS-Relational Database Mangerment System）。
MySQL不仅是最流行的开源数据库，而且是业界成长最快的数据库，每天有超过7万次的下载量，其应用范围从大型企业到专有的嵌入应用系统。
MySQL AB是由两个瑞典人和一个芬兰人：David Axmark、Allan Larsson和Michael “Monty” Widenius在瑞典创办的。
在2008年初，Sun Microsystems收购了MySQL AB公司。在2009年，Oracle收购了Sun公司，使MySQL并入Oracle的数据库产品线。 

##  1.4、MySql的安装 
打开下载的mysql安装文件mysql-essential-5.0.22-win32.msi，双击运行，出现如下界面

![](./MySQL.assets/true-clip_image002.jpg)

按“Next”继续

![](./MySQL.assets/true-clip_image004.jpg)

选择安装类型，有“Typical（默认）”、“Complete（完全）”、“Custom（用户自定义）”三个选项，我们选择“Custom”，有更多的选项，也方便熟悉安装过程

![](./MySQL.assets/true-clip_image006.jpg)

上一步选择了 Custom 安装，这里将设定 MySQL 的组件包和安装路径，设定好之后，单击 Next 继续安装。

![](./MySQL.assets/true-clip_image008.jpg)

现在软件安装完成了，出现上面的界面，将 “Configure the Mysql Server now”前面的勾打上，点“Finish”结束软件的安装并启动mysql配置向导。
mysql配置向导启动界面，按“Next”继续。

![](./MySQL.assets/true-clip_image010.jpg)

选择配置方式，“Detailed Configuration（手动精确配置）”、“Standard Configuration（标准配置）”，我们选择“Detailed Configuration”，方便熟悉配置过程。

![](./MySQL.assets/true-clip_image012.jpg)

选择服务器类型，“Developer Machine（开发测试类，mysql占用很少资源）”、“Server Machine（服务器类型，mysql占用较多资源）”、“Dedicated MySQL Server Machine（专门的数据库服务器，mysql占用所有可用资源）”，大家根据自己的类型选择了，一般选“Server Machine”，不会太少，也不会占满。

![](./MySQL.assets/true-clip_image014.jpg)

选择mysql数据库的大致用途，“Multifunctional Database（通用多功能型，能很好的支持InnoDB与MyISAM存储引擎）”、“Transactional Database Only（服务器类型，专注于事务处理，一般）”、“Non-Transactional Database Only（非事务处理型，较简单，主要做一些监控、记数用，对MyISAM数据类型的支持仅限于non-transactional），随自己的用途而选择了，我这里选择“Multifunctional Database”， 按“Next”继续。

![](./MySQL.assets/true-clip_image016.jpg)

对InnoDB Tablespace进行配置，就是为InnoDB 数据库文件选择一个存储空间，如果修改了，要记住位置，重装的时候要选择一样的地方，否则可能会造成数据库损坏，当然，对数据库做个备份就没问题了，这里不详述。我这里没有修改，使用用默认位置，直接按“Next”继续。

![](./MySQL.assets/true-clip_image018.jpg)

选择您的网站的一般mysql访问量，同时连接的数目，“Decision Support(DSS)/OLAP（20个左右）”、“Online Transaction Processing(OLTP)（500个左右）”、“Manual Setting（手动设置，自己输一个数）”，我这里选“Decision Support(DSS)/OLAP)”，按“Next”继续

![](./MySQL.assets/true-clip_image020.jpg)

是否启用TCP/IP连接，设定端口，如果不启用，就只能在自己的机器上访问mysql数据库了，我这里启用，把前面的勾打上，Port Number：3306，在这个页面上，您还可以选择“启用标准模式”（Enable Strict Mode），按“Next”继续。

![](./MySQL.assets/clip_image022.gif)

这个比较重要，就是对mysql默认数据库语言编码进行设置，第一个是西文编码，我们要设置的是utf8编码，按 “Next”继续。

![](./MySQL.assets/true-clip_image024.jpg)

选择是否将mysql安装为windows服务，还可以指定Service Name（服务标识名称），是否将mysql的bin目录加入到Windows PATH（加入后，就可以直接使用bin下的文件，而不用指出目录名，比如连接，“mysql.exe -uusername -ppassword;”就可以了，不用指出mysql.exe的完整地址，很方便），我这里全部打上了勾，Service Name不变。按“Next”继续。

![](./MySQL.assets/true-clip_image026.jpg)

设置完毕，按“Next”继续。

![](./MySQL.assets/true-clip_image028.jpg)

确认设置无误，如果有误，按“Back”返回检查。按“Execute”使设置生效。

![](./MySQL.assets/true-clip_image030.jpg)

设置完毕，按“Finish”结束mysql的安装与配置
可以通过服务管理器管理 MYSQL 的服务。
通过命令调用服务管理器:services.msc
停止 MYSQL 的服务。

![](./MySQL.assets/true-clip_image032.jpg)

启动 MYSQL 的服务。

![](./MySQL.assets/true-clip_image034.jpg)

也可以在 DOS 中直接通过命令行的形式进行控制。
停止 MYSQL 的服务。Net stop mysql

![](./MySQL.assets/true-clip_image036.jpg)

启动 MYSQL 的服务。 Net start mysql

![](./MySQL.assets/true-clip_image038.jpg)

##  1.5、表

表(table)是一种 **结构化的文件**，可以用来存储特定类型的数据，如：学生信息，课程信息，都可以放到表中。另外表都有特定的名称，而且不能重复。表中具有几个概念：列、行、主键。 列叫做字段(Column),行叫做表中的记录,每一个字段都有:字段名称/字段数据类型/字段约束/字段长度

学生信息表

| 学号（主键） | 姓名 | 性别 | 年龄 |
| ------------ | ---- | ---- | ---- |
| 00001        | 张三 | 男   | 20   |
| 00002        | 李四 | 女   | 20   |

##  1.6、SQL的分类

数据查询语言(DQL-Data Query Language) 
代表关键字:select
数据操纵语言(DML-Data Manipulation Language)
代表关键字:insert,delete,update
数据定义语言(DDL-Data Definition Language)
代表关键字:create ,drop(删除),alter(修改)

```sql
DROP TABLE table_name
ALTER TABLE 【表名字】 RENAME 【表新名字】
```

事务控制语言(TCL-Transactional Control Language)
代表关键字:e_commit ,rollback（事物回滚）;
数据控制语言(DCL-Data Control Language)
代表关键字:grant（授权）,revoke（回收权限）.

##  1.7、导入演示数据

使用MySQL命令行客户端来装载数据库。

1) 连接MySql  mysql -uroot -proot

![](./MySQL.assets/true-clip_image040.jpg)

2) 创建“testtable”数据库

```sql
create database testtable;
```

3) 选择数据库

```sql
use testtable
```

4) 导入数据

```sql
source D:\ testtable.sql   ?
```

5) 删除数据库(这里不要做!)

```sql
drop database testtable;
```

##  1.8、表结构描述

```sql
CREATE DATABASE `test` DEFAULT CHARACTER SET utf8mb4;
USE `test`;
CREATE TABLE `dept` (
  `d_no` int(3) NOT NULL COMMENT '部门编号',
  `d_name` varchar(25) NOT NULL COMMENT '部门名称',
  `loc` varchar(25) NOT NULL COMMENT '位置'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `emp` (
  `e_no` int(3) NOT NULL COMMENT '员工编号',
  `e_name` varchar(15) NOT NULL COMMENT '员工姓名',
  `d_no` int(3) NOT NULL COMMENT '部门编号',
  `e_job` varchar(25) NOT NULL COMMENT '工作岗位',
  `e_mgr` int(3) NOT NULL COMMENT '上级领导',
  `e_sal` double NOT NULL COMMENT '薪水',
  `e_comm` double NOT NULL COMMENT '津贴',
  `e_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `esalary_grade` (
  `grade` int(2) NOT NULL COMMENT '等级',
  `loe_sal` int(2) NOT NULL COMMENT '最低薪水',
  `hie_sal` int(2) NOT NULL COMMENT '最高薪水'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#  2、常用命令

##  2.1、查看msyql版本

MySQL程序选项具有以下两种通用形式：

> –     长选项，由单词之前加两个减号组成
>
> > C:\Users\Administrator>mysql --version
> >
> > mysql Ver 14.14 Distrib 5.5.36, for Win32 (x86)
>
> –     短选项，由单个字母之前加一个减号组成
>
> > C:\Users\Administrator>mysql -V
> >
> > mysql Ver 14.14 Distrib 5.5.36, for Win32 (x86)

##  2.2、创建数据库

1. create database 数据库名称;

```sql
create database testtable;
```

2. use 数据库名称

```sql
use testtable;
```

在数据库中建立表，因此创建表的时候必须要先选择数据库。

##  2.3、查询当前使用的数据库

```sql
select database();
```

查询数据库版本也可以使用
```sql
select  version();
```

##  2.4、终止一条语句

如果想要终止一条正在编写的语句，可键入\c。

##  2.5、退出mysql

可使用\q、QUIT或EXIT：

如：

```sql
\q (ctrl+c)
```

#  3、查看“演示数据”的表结构

##  3.1、查看和指定现有的数据库

```sql
show database；
```

##  3.2、指定当前缺省数据库

```sql
use xxxxdatabase;
```

##  3.3、查看当前使用的库

```sql
select database();
```

##  3.4、查看当前库中的表

```sql
show tables;
```

##  3.5、查看其他库中的表

```sql
show tables from [ table_name];
```

如查看exam库中的表

![](./MySQL.assets/true-clip_image042.jpg)

##  3.6、查看表的结构

```sql
desc table_name;
```

如：

![](./MySQL.assets/true-clip_image044.jpg)

##  3.7、查看表的创建语句

```sql
show create table  table_name;
```

如：

![](./MySQL.assets/true-clip_image046.jpg) 

![](./MySQL.assets/true-clip_image048.jpg) 

#  4、简单的查询

##  4.1、查询一个字段

l 查询员工姓名

```sql
select e_name from emp; slect e_name from emp; 
```

![](./MySQL.assets/true-clip_image050.jpg)

Select语句后面跟的是字段名称，select是关键字，select和字段名称之间采用空格隔开，from表示将要查询的表，它和字段之间采用空格隔开

##  4.2、查询多个字段

l 查询员工的编号和姓名

```sql
select e_no, e_name from emp; show  e_name,e_no from emp;  
```

![](./MySQL.assets/true-clip_image052.jpg)  

查询多个字段，select中的字段采用逗号间隔即可，最后一个字段，也就是在from前面的字段不能使用逗号了。

##  4.3、查询全部字段

可以将所有的字段放到select语句的后面，这种方案不方便，但是比较清楚，我们可以采用如下便捷的方式查询全部字段

```sql
select * from emp;  
```


![](./MySQL.assets/true-clip_image054.jpg)

采用select * from emp，虽然简单，但是*号不是很明确，建议查询全部字段将相关字段写到select语句的后面,在以后java连接数据库的时候,是需要在java程序中编写SQL语句的,这个时候编写的SQL语句不建议使用select * 这种形式,建议写明字段,这样可读性强.

##  4.4、计算员工的年薪

l 列出员工的编号，姓名和年薪

```sql
select e_no, e_name, e_sal*12 from emp; 
```

![](./MySQL.assets/true-clip_image056.jpg)

在select语句中可以使用运算符，以上存在一些问题，年薪的字段名称不太明确

##  4.5、将查询出来的字段显示为中文

  select e_no as ‘员工编号’, e_name as ‘员工姓名’, e_sal*12 as ‘年薪’ from emp;  注意:字符串必须添加单引号 | 双引号  

![](./MySQL.assets/true-clip_image058.jpg)

可以采用as关键字重命名表字段，其实as也可以省略，如：

```sql
select e_no "员工编号", e_name "员工姓名", e_sal*12 "年薪" from emp;  
```

#  5、条件查询

条件查询需要用到where语句，where必须放到from语句表的后面

支持如下运算符

| 运算符           | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| =                | 等于                                                         |
| \<>或!=           | 不等于                                                       |
| \<                | 小于                                                         |
| \<=               | 小于等于                                                     |
| >                | 大于                                                         |
| >=               | 大于等于                                                     |
| between … and …. | 两个值之间,**等同于 >= and \<=**                              |
| is null          | 为null（is not null 不为空）                                 |
| **and**          | 并且                                                         |
| **or**           | 或者                                                         |
| in               | 包含，相当于多个or（not in不在这个范围中）                   |
| not              | not可以取非，主要用在is 或in中                               |
| like             | like称为模糊查询，支持%或下划线匹配  %匹配任意个字符  下划线，一个下划线只匹配一个字符 |

##  5.1、等号操作符

l 查询薪水为5000的员工

```sql
select e_no, e_name, e_sal from  emp where e_sal=5000;  
```

![](./MySQL.assets/true-clip_image060.jpg)

l 查询e_job为MANAGER的员工

```sql
select e_no, e_name from emp where e_job=manager;  
```

![](./MySQL.assets/true-clip_image062.jpg)

以上查询出现错误，因为e_job为字符串，所以出现了以上错误

```sql
select e_no, e_name from emp where  e_job="manager";  
```

![](./MySQL.assets/true-clip_image064.jpg)

```sql
select e_no, e_name from emp where  e_job=’manager’;  
```

![](./MySQL.assets/true-clip_image066.jpg)

也可以使用单引号

```sql
select e_no, e_name from emp where  e_job='MANAGER';  
```

![](./MySQL.assets/true-clip_image068.jpg)

以上输出正确，Mysql默认情况下大小写是不敏感的。

注意：

MySQL在windows下是不区分大小写的，将script文件导入MySQL后表名也会自动转化为小写，结果再 想要将数据库导出放到linux服务器中使用时就出错了。因为在linux下表名区分大小写而找不到表，查了很多都是说在linux下更改MySQL的设置使其也不区分大小写，但是有没有办法反过来让windows 下大小写敏感呢。其实方法是一样的，相应的更改windows中MySQL的设置就行了。

​    具体操作：

​    在MySQL的配置文件my.ini中增加一行：

​    lower_case_table_names = 0

​    其中 0：区分大小写，1：不区分大小写

​    MySQL在Linux下数据库名、表名、列名、别名大小写规则是这样的：

　　  1、数据库名与表名是严格区分大小写的；

　　  2、表的别名是严格区分大小写的；

　　  3、列名与列的别名在所有的情况下均是忽略大小写的；

　　  4、变量名也是严格区分大小写的；  MySQL在Windows下都不区分大小写

##  5.2、 \<> 操作符

l 查询薪水不等于5000的员工

```sql
select e_no, e_name, e_sal from emp where  e_sal <> 5000;  
```

![](./MySQL.assets/true-clip_image070.jpg)

一下写法等同于以上写法，建议使用第一种写法

```sql
select e_no, e_name, e_sal from emp where  e_sal != 5000;  
```

数值也可以采用单引号引起来，如一下语句是正确的(不建议这么写)：

```sql
select e_no, e_name, e_sal from emp where  e_sal <> '5000';  
```

l 查询工作岗位不等于MANAGER的员工

```sql
select e_no, e_name from emp where e_job  <> 'MANAGER';  
```

##  5.3、between … and … 操作符

l 查询薪水为1600到3000的员工(第一种方式，采用>=和\<=)

```sql
select e_no, e_name, e_sal from emp where  e_sal >= 1600 and e_sal <= 3000;  
```

 

![](./MySQL.assets/true-clip_image072.jpg)

l 查询薪水为1600到3000的员工(第一种方式，采用between … and …)

```sql
select e_no, e_name, e_sal from emp where  e_sal between 1600 and 3000;  
```


![](./MySQL.assets/true-clip_image074.jpg)

关于between … and …，它是包含最大值和最小值的

##  5.4、is null

l Null为空，但不是空串，为null可以设置这个字段不填值，如果查询为null的字段，采用is null

l 查询津贴为空的员工

```sql
select * from  emp where e_comm=null;  
```

![](./MySQL.assets/true-clip_image076.jpg)

以上也无法查询出符合条件的数据，因为null类型比较特殊，必须使用 is来比较

```sql
select * from emp where e_comm is null;  
```

![](./MySQL.assets/true-clip_image078.jpg)

以上查询正确

##  5.5、 and

and表示并且的含义，表示所有的条件必须满足

l 工作岗位为MANAGER,薪水大于2500的员工

```sql
select * from emp where e_job='MANAGER' and  e_sal > 2500;  
```

![](./MySQL.assets/true-clip_image080.jpg)

##  5.6、or

or，只要满足条件即可,相当于包含

l 查询出e_job为manager或者e_job为e_salesman的员工

```sql
select * from emp where e_job='MANAGER' or  e_job='SALESMAN';  
```

![](./MySQL.assets/true-clip_image082.jpg)

##  5.7、表达式的优先级

l 查询薪水大于1800，并且部门代码为20或30的员工（错误的写法）

```sql
select * from emp where e_sal  > 1800 and d_no = 20 or d_no = 30;  
```

![](./MySQL.assets/true-clip_image084.jpg)

以上输出不是预期结果，薪水小于1800的数据也被查询上来了，原因是表达式的优先级导致的，首先过滤e_sal > 1800 and d_no = 20，然后再将d_no = 30员工合并过来，所以是不对的

l 查询薪水大于1800，并且部门代码为20或30的（正确的写法）

```sql
select * from emp where e_sal > 1800 and  (d_no = 20 or d_no = 30);  
```

![](./MySQL.assets/true-clip_image086.jpg)

关于运算符的问题：不用记，没有把握尽量采用括号

##  5.8、in

in表示包含的意思，完全可以采用or来表示，采用in会更简洁一些

l 查询出e_job为manager或者e_job为e_salesman的员工

```sql
select * from emp where e_job in  ('manager','e_salesman');  
```

![](./MySQL.assets/true-clip_image088.jpg)

l 查询出薪水包含1600和薪水包含3000的员工

```sql
select * from emp where e_sal in(1600,  3000); 
```

![](./MySQL.assets/true-clip_image090.jpg)

##  5.9、not

l 查询出薪水不包含1600和薪水不包含3000的员工（第一种写法）

```sql
select * from emp where e_sal <> 1600  and e_sal <> 3000;  
```

![](./MySQL.assets/true-clip_image092.jpg)

l 查询出薪水不包含1600和薪水不包含3000的员工（第二种写法

```sql
select * from emp where not (e_sal = 1600  or e_sal = 3000);  
```


![](./MySQL.assets/true-clip_image094.jpg)

l 查询出薪水不包含1600和薪水不包含3000的员工（第三种写法）

```sql
select * from emp where e_sal not in (1600,  3000);  
```

![](./MySQL.assets/true-clip_image096.jpg)

l 查询出津贴不为null的所有员工

```sql
select * from emp where e_comm is not null;  
```

![](./MySQL.assets/true-clip_image098.jpg)

##  5.10、like

l Like可以实现模糊查询，like支持%和下划线匹配

l 查询姓名以M开头所有的员工

```sql
select * from emp where e_name like 'M%';  
```

![](./MySQL.assets/true-clip_image100.jpg)

l 查询姓名以N结尾的所有的员工

```sql
select * from emp where e_name like '%N';  
```

![](./MySQL.assets/true-clip_image102.jpg)

l 查询姓名中包含O的所有的员工

```sql
select * from emp where e_name like '%O%';  
```

![](./MySQL.assets/true-clip_image104.jpg)

l 查询姓名中第二个字符为A的所有员工
```sql
select * from emp where e_name like '_A%';  
```

![](./MySQL.assets/true-clip_image106.jpg)

Like中%和下划线的差别？
%匹配任意字符出现的个数
下划线只匹配一个字符
Like 中的表达式必须放到单引号中|双引号中，以下写法是错误的：

```sql
select * from emp where  e_name like _A%  
```

#  6、排序数据
##  6.1、单一字段排序

排序采用order by子句，order by后面跟上排序字段，排序字段可以放多个，多个采用逗号间隔，order by默认采用升序，如果存在where子句那么order by必须放到where语句的后面

l 按照薪水由小到大排序(系统默认由小到大)
```sql
select * from emp order by e_sal;  
```

![](./MySQL.assets/true-clip_image108.jpg)

l 取得e_job为MANAGER的员工，按照薪水由小到大排序(系统默认由小到大)

```sql
select * from emp where e_job='MANAGER'  order by e_sal;  
```

![](./MySQL.assets/true-clip_image110.jpg)

如果包含where语句order by必须放到where后面，如果没有where语句order by放到表的后面

以下写法是错误的：

```sql
select * from emp order  by e_sal where e_job='MANAGER';  
```

l 按照多个字段排序，如：首先按照e_job排序，再按照e_sal排序

```sql
select * from emp order by e_job,e_sal;  
```

![](./MySQL.assets/true-clip_image112.jpg)

##  6.2、手动指定排序顺序

l 手动指定按照薪水由小到大排序

```sql
select * from emp order by e_sal asc;  
```

![](./MySQL.assets/true-clip_image114.jpg)

l 手动指定按照薪水由大到小排序

```sql
select * from emp order by e_sal desc;  
```

![](./MySQL.assets/true-clip_image116.jpg)

##  6.3、多个字段排序

l 按照e_job和薪水倒序

```sql
select * from emp order by e_job desc, e_sal desc; 
```

![](./MySQL.assets/true-clip_image118.jpg)

如果采用多个字段排序，如果根据第一个字段排序重复了，会根据第二个字段排序

##  6.4、使用字段的位置来排序

l 按照薪水升序
```sql
select * from emp order by 6;  
```

![](./MySQL.assets/true-clip_image120.jpg)

不建议使用此种方式，采用数字含义不明确，程序不健壮

#  7、数据处理函数/单行处理函数

| 函数        | 说明                                              |
| ----------- | ------------------------------------------------- |
| Lower       | 转换小写                                          |
| upper       | 转换大写                                          |
| substr      | 取子串 substr(被截取的字符串,起始下标,截取的长度) |
| length      | 取长度                                            |
| trim        | 去空格                                            |
| str_to_date | 将字符串转换成日期                                |
| date_format | 格式化日期                                        |
| format      | 设置千分位                                        |
| round       | 四舍五入                                          |
| rand()      | 生成随机数                                        |
| ifnull      | 可以将null转换成一个具体值                        |

##  7.1、lower

l 查询员工，将员工姓名全部转换成小写
```sql
select lower(e_name) from emp;  
```

![](./MySQL.assets/true-clip_image122.jpg)

##  7.2、upper

l 查询e_job为manager的员工

```sql
select * from emp where  e_job=upper('manager');  
```

![](./MySQL.assets/true-clip_image124.jpg)

##  7.3、substr

l 查询姓名以M开头所有的员工

```sql
select * from emp where substr(e_name, 1,  1)=upper('m');  
```

![](./MySQL.assets/true-clip_image126.jpg)

##  7.4、length

l 取得员工姓名长度为5的

```sql
select length(e_name), e_name from emp  where length(e_name)=5;  
```

![](./MySQL.assets/true-clip_image128.jpg)

##  7.5、trim

trim会去首尾空格，不会去除中间的空格

l 取得工作岗位为manager的所有员工

```sql
select * from emp where  e_job=trim(upper('manager '));  
```

![](./MySQL.assets/true-clip_image130.jpg)

##  7.6、str_to_date (必须严格按照标准输出)

l 查询1981-02-20入职的员工（第一种方法，与数据库的格式匹配上）

```sql
select * from emp where  e_date='1981-02-20';  
```

![](./MySQL.assets/true-clip_image132.jpg)

l 查询1981-02-20入职的员工（第二种方法，将字符串转换成date类型）

```sql
select * from emp where e_date=str_to_date('1981-02-20','%Y-%m-%d');  
```
```sql
select * from emp where e_date=str_to_date('02-20-1981','%m-%d-%Y');  
```

![](./MySQL.assets/true-clip_image134.jpg)

str_to_date可以将字符串转换成日期，具体格式str_to_date (字符串，匹配格式)

##  7.7、date_format

l 查询1981-02-20以后入职的员工，将入职日期格式化成yyyy-mm-dd hh:mm:ss

```sql
select e_no, e_name,  date_format(e_date, '%Y-%m-%d %H:%i:%s') as e_date from emp;  
```

![](./MySQL.assets/true-clip_image136.jpg)
```sql
select date_format(now(),'%Y-%m-%d %H %i %s');
```


now() 获得当前时间

日期格式的说明

| 格式 | 说明                                    |
| ---- | --------------------------------------- |
| %Y   | 代表4位的年份                           |
| %y   | 代表2位的年份                           |
| %m   | 代表月, 格式为(01……12)                  |
| %c   | 代表月, 格式为(1……12)                   |
| %H   | 代表小时,格式为(00……23)                 |
| %h   | 代表小时,格式为(01……12)                 |
| %i   | 代表分钟, 格式为(00……59)                |
| %r   | 代表 时间,格式为12 小时(hh:mm:ss [AP]M) |
| %T   | 代表 时间,格式为24 小时(hh:mm:ss)       |
| %S   | 代表 秒,格式为(00……59)                  |
| %s   | 代表 秒,格式为(00……59)                  |

##  7.8、format

l 查询员工薪水加入千分位

```sql
select e_no, e_name, Format(e_sal, 0) from  emp;  
```


![](./MySQL.assets/true-clip_image138.jpg)

l 查询员工薪水加入千分位和保留两位小数

```sql
select e_no, e_name, Format(e_sal, 2) from  emp;  
```


![](./MySQL.assets/true-clip_image140.jpg)

##  7.9、round

四舍五入

```sql
select round(123.56);  
```


![](./MySQL.assets/true-clip_image142.jpg)

##  7.10、rand()

生成随机数

```sql
select rand();  
```


![](./MySQL.assets/true-clip_image144.jpg)

随机抽取记录数

```sql
select * from emp order by  rand() limit 2;     #order by 必须写上。  
```


##  7.11、case … when … then …..else …end

l 如果e_job为MANAGERG薪水上涨10%,如果e_job为SALESMAN工资上涨50%

```sql
select e_no, e_name, e_job, e_sal, case e_job when  MANAGER then e_sal*1.1 when SALESMAN then e_sal*1.5 end as newe_sal from emp;  
```


![](./MySQL.assets/true-clip_image146.jpg)

其他的工资不动，需要添加else

```sql
select e.*, e_sal ,case e_job when e_salesman  then e_sal*1.1 when clerk then e_sal*1.2 else e_sal end as new_e_sal from emp e;   
```


 e.*:取emp表所有的字段 , emp as e 是表的别名可以省略as emp  e  

![](./MySQL.assets/true-clip_image148.jpg)

##  7.12、ifnull

  select ifnull(e_comm,0) from emp; 
  如果e_comm为null 就替换为 0  在SQL语句当中若有NULL值参与数学运算，计算结果一定是NULL 
  为了防止计算结果出现NULL，建议先使用ifnull空值处理函数预先处理。 以下SQL是计算年薪的： 

```sql
select  e_no,e_name,e_sal,(e_sal+ifnull(e_comm,0))*12 as yeare_sal from emp;  
```


![](./MySQL.assets/true-clip_image150.jpg)

**数据处理函数又被称为单行处理函数，特点：输入一行输出一行**

#  8、分组函数/聚合函数/多行处理函数

| 函数  | 说明       |
| ----- | :--------- |
| count | 取得记录数 |
| sum   | 求和       |
| avg   | 取平均     |
| max   | 取最大的数 |
| min   | 取最小的数 |

**注意：分组函数自动忽略空值，不需要手动的加where** 条件排除空值。

select count(*) from emp where xxx;        **符合条件的所有记录总数。**
select count(e_comm) from emp;    **e_comm 这个字段中不为空的元素总数。**

注意：分组函数不能直接使用在where关键字后面。

```sql
select e_name,e_sal from emp where e_sal > avg(e_sal);
ERROR 1111 (HY000): Invalid use of group function
```


##  8.1、count

l 取得所有的员工数

```sql
select count(*) from emp;  
```


![](./MySQL.assets/true-clip_image152.jpg)

Count(*)表示取得所有记录，忽略null，为null的值也会取得

l 取得津贴不为null员工数

```sql
select count(e_comm) from emp;  
```


![](./MySQL.assets/true-clip_image154.jpg)

采用count(字段名称)，不会取得为null的记录

l 取得工作岗位的个数

```sql
select count(distinct  e_job ) from emp;  
```


![](./MySQL.assets/true-clip_image156.jpg)

##  8.2、sum

l Sum可以取得某一个列的和，null会被忽略

l 取得薪水的合计

```sql
select sum(e_sal) from emp;  
```


![](./MySQL.assets/true-clip_image158.jpg)

l 取得津贴的合计

```sql
select sum(e_comm) from emp;  
```


![](./MySQL.assets/true-clip_image160.jpg)

null会被忽略

l 取得薪水的合计（e_sal+e_comm）

```sql
select sum(e_sal+e_comm) from emp;  
```


![](./MySQL.assets/true-clip_image162.jpg)

从以上结果来看，不正确，原因在于e_comm字段有null值，所以无法计算，sum会忽略掉，正确的做法是将e_comm字段转换成0

```sql
select sum(e_sal+IFNULL(e_comm, 0)) from emp;  
```


![](./MySQL.assets/true-clip_image164.jpg)

##  8.3、avg

取得某一列的平均值

l 取得平均薪水

```sql
select avg(e_sal) from emp;  
```


![](./MySQL.assets/true-clip_image166.jpg)

##  8.4、max

取得某个一列的最大值

l 取得最高薪水

```sql
select max(e_sal) from emp;  
```


![](./MySQL.assets/true-clip_image168.jpg)

l 取得最晚入职得员工

```sql
select max(str_to_date (e_date, '%Y-%m-%d'))  from emp;  
```


![](./MySQL.assets/true-clip_image170.jpg)

##  8.5、min

取得某个一列的最小值

l 取得最低薪水

```sql
select min(e_sal) from emp;  
```


![](./MySQL.assets/true-clip_image172.jpg)

l 取得最早入职得员工（可以不使用str_to_date转换）

```sql
select min(str_to_date(e_date, '%Y-%m-%d'))  from emp;  
```


![](./MySQL.assets/true-clip_image174.jpg)

##  8.6、组合聚合函数

可以将这些聚合函数都放到select中一起使用

```sql
select  count(*),sum(e_sal),avg(e_sal),max(e_sal),min(e_sal) from emp;  
```


![](./MySQL.assets/true-clip_image176.jpg)

#  9、分组查询

分组查询主要涉及到两个子句，分别是：group by和having

##  9.1、group by

l 取得每个工作岗位的工资合计，要求显示岗位名称和工资合计

```sql
select e_job, sum(e_sal) from emp group by  e_job;  
```


![](./MySQL.assets/true-clip_image178.jpg)

如果使用了order by，order by必须放到group by后面

![](./MySQL.assets/true-clip_image180.jpg)

l 按照工作岗位和部门编码分组，取得的工资合计

n 原始数据

![](./MySQL.assets/true-clip_image182.jpg)

n 分组语句

```sql
select e_job,d_no,sum(e_sal) from emp group  by e_job,d_no;  
```


![](./MySQL.assets/true-clip_image184.jpg)

```sql
select e_no,d_no,avg(e_sal) from emp group by d_no;
```


+-------+--------+-------------+

| e_no | d_no | avg(e_sal)  |

+-------+--------+-------------+

| 7782 |   10 | 2916.666667 |

| 7369 |   20 | 2175.000000 |

| 7499 |   30 | 1566.666667 |

+-------+--------+-------------+

以上SQL语句在Oracle数据库中无法执行，执行报错。
以上SQL语句在Mysql数据库中可以执行，但是执行结果矛盾。
在SQL语句中若有group by 语句，那么在select语句后面只能跟 **分组函数+参与分组的字段**。

##  9.2、having

如果想对分组数据再进行过滤需要使用having子句
取得每个岗位的平均工资大于2000

```sql
select e_job, avg(e_sal) from emp group by e_job having avg(e_sal) > 2000;  
```

![](./MySQL.assets/true-clip_image186.jpg)

分组函数的执行顺序：
根据条件查询数据
分组
采用having过滤，取得正确的数据

##  9.3、select语句总结

一个完整的select语句格式如下

> select 字段  from 表名  where …….  group by ……..  having …….(就是为了过滤分组后的数据而存在的—不可以单独的出现)  order by ……..  

以上语句的执行顺序

1. 首先执行where语句过滤原始数据
2. 执行group by进行分组
3. 执行having对分组数据进行操作
4. 执行select选出数据
5. 执行order by排序

原则：能在where中过滤的数据，尽量在where中过滤，效率较高。having的过滤是专门对分组之后的数据进行过滤的。

#  10、连接查询

##  10.1、SQL92语法

连接查询：也可以叫跨表查询，需要关联多个表进行查询

l 显示每个员工信息，并显示所属的部门名称

```sql
select e_name, d_name from emp, dept;  
```

以上输出，不正确，输出了56条数据，其实就是两个表记录的成绩，这种情况我们称为：“笛卡儿乘积”，出现错误的原因是：没有指定连接条件

指定连接条件

```sql
select emp.e_name, dept.d_name from emp,  dept where emp.d_no=dept.d_no; 
```

也可以使用别名

```sql
select e.e_name, d.d_name from emp e, dept  d where e.d_no=d.d_no;  
```

![](./MySQL.assets/true-clip_image188.jpg)

以上结果输出正确，因为加入了正确的连接条件

以上查询也称为 “内连接”，只查询相等的数据（连接条件相等的数据）

l 取得员工和所属的领导的姓名

```sql
select e.e_name, m.e_name from emp e, emp m where  e.e_mgr=m.e_no;   
```

以上称为“自连接”，只有一张表连接，具体的查询方法，把一张表看作两张表即可，如以上示例：第一个表emp e代码了员工表，emp m代表了领导表，相当于员工表和部门表一样

##  10.2、SQL99语法

l （内连接）显示薪水大于2000的员工信息，并显示所属的部门名称

  采用SQL92语法：

```sql
select e.e_name, e.e_sal, d.d_name from emp  e, dept d where e.d_no=d.d_no and   e.e_sal > 2000;
```

  采用SQL99语法：  

```sql
select e.e_name, e.e_sal, d.d_name from emp e  join dept d on e.d_no=d.d_no where e.e_sal>2000;
```
```sql
select e.e_name, e.e_sal, d.d_name from emp e  inner join dept d on e.d_no=d.d_no where e.e_sal>2000;
```

在实际中一般不加inner关键字  

Sql92语法和sql99语法的区别：99语法可以做到表的连接和查询条件分离，特别是多个表进行连接的时候，会比sql92更清晰

l （外连接）显示员工信息，并显示所属的部门名称，如果某一个部门没有员工，那么该部门也必须显示出来

  右连接： 

```sql
select e.e_name, e.e_sal, d.d_name from emp e  right join dept d on e.d_no=d.d_no;  
```

左连接：

```sql
select e.e_name, e.e_sal, d.d_name from dept  d left join emp e on e.d_no=d.d_no;  
```

以上两个查询效果相同  

![](./MySQL.assets/true-clip_image190.jpg)

##  10.3、连接分类

### 内链接 inner join 

> 表1 inner join 表2 on 关联条件，做连接查询的时候一定要写上关联条件；inner 可以省略。

![image-20220705101830024](./MySQL.assets/true-image-20220705101830024.png)

### 外连接 left join 、right join 

> 左外连接
>
> > 表1 left outer join 表2 on 关联条件，做连接查询的时候一定要写上关联条件；outer 可以省略。
>
> ![image-20220705101852038](./MySQL.assets/true-image-20220705101852038.png)
>
> 右外连接
>
> > 表1 right outer join 表2 on 关联条件，做连接查询的时候一定要写上关联条件；outer 可以省略。
>
> ![image-20220705101907499](./MySQL.assets/true-image-20220705101907499.png)

### 左外连接（左连接）和右外连接（右连接）的区别？

> - **左连接** 以左面的表为准和右边的表比较，和左表相等的不相等都会显示出来，右表符合条件的显示,不符合条件的不显示。
>
> - **右连接** 恰恰相反，以上左连接和右连接也可以加入outer关键字，但一般不建议这种写法，如：

```sql
select e.e_name, e.e_sal, d.d_name from emp e  right outer join dept d on e.d_no=d.d_no;  select e.e_name, e.e_sal, d.d_name from dept  d left outer join emp e on e.d_no=d.d_no;  
```

左连接能完成的功能右连接一定可以完成

![](./MySQL.assets/true-clip_image192.jpg)

#  11、子查询

子查询就是嵌套的select语句，可以理解为子查询是一张表

##  11.1、在where语句中使用子查询，也就是在where语句中加入select语句

l 查询员工信息，查询哪些人是管理者，要求显示出其员工编号和员工姓名

实现思路：

l 1、首先取得管理者的编号，去除重复的

```sql
select distinct e_mgr from emp where e_mgr is  not null;    # distinct 去除重复行  
```

l 2、查询员工编号包含管理者编号的

```sql
select e_no, e_name from emp where e_no  in(select e_mgr from emp where e_mgr is not null);  
```

![](./MySQL.assets/true-clip_image194.jpg)

l 查询哪些人的薪水高于员工的平均薪水，需要显示员工编号，员工姓名，薪水

实现思路

1、 取得平均薪水

```sql
select avg(e_sal) from emp;  
```

2、 取得大于平均薪水的员工

```sql
select e_no, e_name, e_sal from emp where  e_sal > (select avg(e_sal) from emp);  
```

![](./MySQL.assets/true-clip_image196.jpg)

##  11.2、在from语句中使用子查询，可以将该子查询看做一张表

l 查询员工信息，查询哪些人是管理者，要求显示出其员工编号和员工姓名

首先取得管理者的编号，去除重复的

```sql
select distinct e_mgr from emp where e_mgr is  not null;  
```

将以上查询作为一张表，放到from语句的后面

使用92语法：  
```sql
select e.e_no, e.e_name from emp e,  (select distinct e_mgr from emp where e_mgr is not null) m where e.e_no=m.e_mgr;  
```

使用99语法：

```sql
select e.e_no, e.e_name from emp e join  (select distinct e_mgr from emp where e_mgr is not null) m on e.e_no=m.e_mgr;  
```

![](./MySQL.assets/true-clip_image198.jpg)

l 查询各个部门的平均薪水所属等级，需要显示部门编号，平均薪水，等级编号

实现思路

1、首先取得各个部门的平均薪水

```sql
select d_no, avg(e_sal) avg_e_sal from emp  group by d_no;  
```

![](./MySQL.assets/true-clip_image200.jpg)

2、将部门的平均薪水作为一张表与薪水等级表建立连接，取得等级
```sql
select d_no,avg(e_sal) avg_e_sal from emp  group by d_no;
select * from e_salgrade;
select a.d_no,a.avg_e_sal,g.grade from  (select d_no,avg(e_sal) avg_e_sal from emp group by d_no ) a join e_salgrade g  on a.avg_e_sal between g.loe_sal and hie_sal;
```
>

薪水等级表
平均薪水表

![](./MySQL.assets/true-clip_image205.jpg)

##  11.3、在select语句中使用子查询

l 查询员工信息，并显示出员工所属的部门名称

第一种做法，将员工表和部门表连接

```sql
select e.e_name, d.d_name from emp e, dept  d where e.d_no=d.d_no;  
```

第二种做法，在select语句中再次嵌套select语句完成部分名称的查询

```sql
select e.e_name, (select d.d_name from dept  d where e.d_no=d.d_no) as d_name from emp e; 
```


![](./MySQL.assets/true-clip_image207.jpg)

#  12、union 合并sql语句

##  12.1、union可以合并集合（相加）

1、查询e_job包含MANAGER和包含SALESMAN的员工

```sql
select * from emp where e_job in('MANAGER',  'SALESMAN');  
```

![](./MySQL.assets/true-clip_image209.jpg)

2、采用union来合并

```sql
select * from emp where e_job='MANAGER'  union  select * from emp where e_job='SALESMAN'
```

![](./MySQL.assets/true-clip_image211.jpg)

合并结果集的时候，需要查询字段对应个数相同。在**Oracle**中更严格，不但要求个数相同，而且还要求类型对应相同。

#  13、limit 的使用

mySql提供了limit ，主要用于提取前几条或者中间某几行数据

```sql
select * from table limit m,n
```

其中m是指记录开始的index，从0开始，表示第一条记录
n是指从第m+1条开始，取n条。

```sql
select * from table_name limit 2,4
```

即取出第3条至第6条，4条记录

##  13.1、取得前5条数据

```sql
select * from emp limit 5;  
```

![](./MySQL.assets/true-clip_image213.jpg)

![](./MySQL.assets/true-clip_image215.jpg)

##  13.2、从第二条开始取两条数据

```sql
select * from emp limit 1,2;  
```

![](./MySQL.assets/true-clip_image217.jpg)

##  13.3、取得薪水最高的前5名 

```sql
select  * from emp e   order by e.e_sal desc limit 5;  
```

![](./MySQL.assets/true-clip_image219.jpg)

#  14、表
##  14.1、创建表

l 语法格式

create  table tableName(    columnName dataType(length),    ………………..    columnName dataType(length)  );  set  character_set_results='gbk';    
show  variables like '%char%';     

创建表的时候，表中有字段，每一个字段有： * 字段名 * 字段数据类型 * 字段长度限制 * 字段约束       

l MySql常用数据类型

| 类型                         | 描述                                             |
| ---------------------------- | ------------------------------------------------ |
| Char(长度)                   | 定长字符串，存储空间大小固定，适合作为主键或外键 |
| Varchar(长度)                | 变长字符串，存储空间等于实际数据空间             |
| double(有效数字位数，小数位) | 数值型                                           |
| Float(有效数字位数，小数位)  | 数值型                                           |
| Int( 长度)                   | 整型                                             |
| bigint(长度)                 | 长整型                                           |
| Date                         | 日期型                                           |
| BLOB                         | Binary  Large OBject（二进制大对象）             |
| CLOB                         | Character  Large OBject（字符大对象）            |
| 其它...                  |                                                  |

l 建立学生信息表，字段包括：学号、姓名、性别、出生日期、email、班级标识
```sql
create  table t_student(student_id   int(10),student_name varchar(20), sex char(2), birthday date, email varchar(30), classes_id    int(3)     )  
```


![](./MySQL.assets/true-clip_image221.jpg)

l 向t_student表中加入数据,（必须使用客户端软件，我们的cmd默认是GBK编码,数据中设置的编码是UTF-8）
```sql
insert into t_student(student_id, student_name, sex, birthday,  email, classes_id) values(1001, 'zhangsan', 'm', '1988-01-01', 'qqq@163.com',  10)  
```


![](./MySQL.assets/true-clip_image223.jpg)

l 向t_student表中加入数据（使用默认值）
```sql
drop  table if exists t_student;   create  table t_student(      student_id   int(10),      student_name     varchar(20),      sex     char(2) default   'm',      birthday date,       email       varchar(30),      classes_id    int(3)     )     insert  into t_student(student_id, student_name, birthday, email, classes_id)   values  (1002,  'zhangsan', '1988-01-01', 'qqq@163.com', 10) 
```


![](./MySQL.assets/true-clip_image225.jpg)  


##  14.2、增加/删除/修改表结构

采用alter table来增加/删除/修改表结构，不影响表中的数据

#### 14.2.1、添加字段

如：需求发生改变，需要向t_student中加入联系电话字段，字段名称为：contatct_tel 类型为varchar(40)
```sql
alter table t_student  add contact_tel varchar(40);  
```


![](./MySQL.assets/true-clip_image227.jpg)

#### 14.2.2、修改字段

如：student_name无法满足需求，长度需要更改为100
```sql
alter table t_student  modify student_name varchar(100) ;  
```


![](./MySQL.assets/true-clip_image229.jpg)

如sex字段名称感觉不好，想用gender那么就需要更爱列的名称

![](./MySQL.assets/true-clip_image231.jpg)

#### 14.2.3、删除字段

如：删除联系电话字段
```sql
alter table t_student  drop contact_tel;  
```


![](./MySQL.assets/true-clip_image233.jpg)

##  14.3、添加、修改和删除

#### 14.3.1、insert

添加、修改和删出都属于DML，主要包含的语句：insert、update、delete

l Insert语法格式
```sql
Insert  into 表名(字段,... values(值,...)  
```


l 省略字段的插入
```sql
insert into emp  values(9999,'zhangsan','MANAGER', null, null,3000, 500, 10);  
```

![](./MySQL.assets/true-clip_image235.jpg)

![](./MySQL.assets/true-clip_image237.jpg)

不建议使用此种方式，因为当数据库表中的字段位置发生改变的时候会影响到insert语句
l 指定字段的插入(建议使用此种方式)
```sql
insert into emp  (e_no,e_name,e_job,e_mgr,e_date,e_sal,e_comm,d_no)  values(9999,'zhangsan','MANAGER', null, null,3000, 500, 10); 
```

![](./MySQL.assets/true-clip_image239.jpg)

出现了主键重复的错误，主键表示了记录的唯一性，不能重复

![](./MySQL.assets/true-clip_image241.jpg)

如何插入日期：
第一种方法，插入的日期格式和显示的日期格式一致
```sql
insert into emp(e_no,  e_name, e_job, e_mgr, e_date, e_sal, e_comm, d_no)  values(9997,'zhangsan','MANAGER', null, '1981-06-12',3000, 500, 10);  
```

![](./MySQL.assets/true-clip_image243.jpg)

第二种方法，采用str_to_date
```sql
insert into emp(e_no,  e_name, e_job, e_mgr, e_date, e_sal, e_comm, d_no) valu  es(9996,'zhangsan','MANAGER',null,str_to_date('1981-06-12','%Y-%m-%d'),3000,  500, 10);  
```

![](./MySQL.assets/true-clip_image245.jpg)

第三种方法，添加系统日期（now()）
```sql
insert into emp(e_no, e_name,  e_job, e_mgr, e_date, e_sal, e_comm, d_no) values(9995,'zhangsan','MANAGER',null,now()  ,3000, 500, 10);  
```

![](./MySQL.assets/true-clip_image247.jpg)

![](./MySQL.assets/true-clip_image249.jpg)

l 表复制
```sql
create table emp_bak as  select e_no,e_name,e_sal from emp;  
```

![](./MySQL.assets/true-clip_image251.jpg)

![](./MySQL.assets/true-clip_image253.jpg)

以上方式，会自动创建表，将符合查询条件的数据自动复制到创建的表中

l 如何将查询的数据直接放到已经存在的表中，可以使用条件
```sql
insert into emp_bak  select * from emp where e_sal=3000;  
```

![](./MySQL.assets/true-clip_image255.jpg)

#### 14.3.2、update

可以修改数据，可以根据条件修改数据

l 语法格式：

update 表名 set  字段名称1=需要修改的值1,  字段名称2=需要修改的值2  where …….  

l 将e_job为manager的员工的工资上涨10%
```sql
update emp set  e_sal=e_sal+e_sal*0.1 where e_job='MANAGER';  
```

#### 14.3.3、delete

可以删除数据，可以根据条件删除数据

l 语法格式：
```sql
Delete from表名 where ...
```

l 删除津贴为500的员工
```sql
delete from emp where  e_comm=500;  
```


l 删除津贴为null的员工
```sql
delete from emp where  e_comm is null;  
```

##  14.4、创建表加入约束

l 常见的约束
> a) 非空约束，not null
> b) 唯一约束，unique 
> c) 主键约束，primary key
> d) 外键约束，foreign key
> e) 自定义检查约束，check（不建议使用）(在mysql中现在还不支持)

### 14.4.1、非空约束，not null

非空约束，针对某个字段设置其值不为空，如：学生的姓名不能为空
```sql
drop  table if exists t_student;   create  table t_student(      student_id   int(10),      student_name     varchar(20) not null,      sex     char(2) default   'm',      birthday date,       email       varchar(30),      classes_id    int(3)     )     insert  into t_student(student_id, birthday, email, classes_id)   values  (1002,  '1988-01-01', 'qqq@163.com', 10)  
```

![](./MySQL.assets/true-clip_image257.jpg)

以上错误为加入的学生姓名为空。

### 14.4.2、唯一约束，unique

唯一性约束，它可以使某个字段的值不能重复，如：email不能重复：
```sql
drop table if exists t_student;   create table t_student(      student_id   int(10),      student_name     varchar(20) not  null,      sex     char(2) default   'm',      birthday date,       email       varchar(30) unique,      classes_id    int(3)     )  insert  into t_student(student_id, student_name , sex, birthday, email, classes_id)   values  (1001,'zhangsan','m',  '1988-01-01', 'qqq@163.com', 10)  
```

![](./MySQL.assets/true-clip_image259.jpg)

以上插入了重复的email，所以出现了“违反唯一约束错误”，所以unique起作用了

同样可以为唯一约束起个约束名

l 我们可以查看一下约束

```sql
use information_schema;
```

```sql
select * from table_constraints where table_name = 't_student';
```

![](./MySQL.assets/true-clip_image261.jpg)

关于约束名称可以到table_constraints中查询
以上约束的名称我们也可以自定义。
```sql
drop  table if exists t_student;   create  table t_student(      student_id   int(10),      student_name     varchar(20) not null,      sex     char(2) default   'm',      birthday date,       email       varchar(30) ,      classes_id    int(3)   ,  constraint email_unique unique(email)/*表级约束*/  )  
```

### 14.4.3、主键约束，primary key

每个表应该具有主键，主键可以标识记录的唯一性，主键分为单一主键和复合（联合）主键，单一主键是由一个字段构成的，复合（联合）主键是由多个字段构成的
```sql
drop  table if exists t_student;   create  table t_student()      student_id   int(10)   primary key,/*列级约束*/      student_name     varchar(20) not null,      sex     char(2) default   'm',      birthday date,       email       varchar(30) ,      classes_id    int(3)     )  insert  into t_student(student_id, student_name , sex, birthday, email, classes_id)   values  (1001,'zhangsan','m',  '1988-01-01', 'qqq@163.com', 10)  
```

向以上表中加入学号为1001的两条记录，出现如下错误，因为加入了主键约束

![](./MySQL.assets/true-clip_image263.jpg)

我们也可以通过表级约束为约束起个名称：
```sql
drop  table if exists t_student;   create  table t_student(      student_id   int(10),      student_name     varchar(20) not null,      sex     char(2) default   'm',      birthday date,       email       varchar(30) ,      classes_id    int(3),    CONSTRAINT p_id  PRIMARY key (student_id)  )  insert  into t_student(student_id, student_name , sex, birthday, email, classes_id)   values  (1001,'zhangsan','m',  '1988-01-01', 'qqq@163.com', 10)  
```

### 14.4.4、外键约束，foreign key

外键主要是维护表之间的关系的，主要是为了保证参照完整性，如果表中的某个字段为外键字段，那么该字段的值必须来源于参照的表的主键，如：emp中的d_no值必须来源于dept表中的d_no字段值。
建立学生和班级表之间的连接
首先建立班级表t_classes
```sql
drop  table if exists t_classes;  create  table t_classes(      classes_id int(3),      classes_name varchar(40),      constraint pk_classes_id primary  key(classes_id)  )  
```

在t_student中加入外键约束
```sql
drop table if exists t_student;  create table t_student(      student_id   int(10),      student_name     varchar(20),      sex     char(2),      birthday date,      email       varchar(30),      classes_id    int(3),      constraint   student_id_pk primary key(student_id),  constraint fk_classes_id foreign key(classes_id)  references t_classes(classes_id)     )  
```

向t_student中加入数据
```sql
insert  into t_student(student_id, student_name, sex, birthday, email, classes_id)  values(1001, 'zhangsan', 'm', '1988-01-01', 'qqq@163.com', 10)  
```

![](./MySQL.assets/true-clip_image265.jpg)

出现错误，因为在班级表中不存在班级编号为10班级，外键约束起到了作用
存在外键的表就是子表，参照的表就是父表，所以存在一个父子关系，也就是主从关系，主表就是班级表，从表就是学生表

![](./MySQL.assets/true-clip_image267.jpg)

以上成功的插入了学生信息，当时classes_id没有值，这样会影响参照完整性，所以我们建议将外键字段设置为非空
```sql
drop  table if exists t_student;  create  table t_student( student_id   int(10), student_name varchar(20), sex char(2), birthday date, email varchar(30),      classes_id    int (3) not null,      constraint   student_id_pk primary key(student_id),      constraint fk_classes_id foreign key(classes_id)  references t_classes(classes_id)      )  insert  into t_student(student_id, student_name, sex, birthday, email, cla  sses_id)  values(1001, 'zhangsan', 'm', '1988-01-01', 'qqq@163.com', null);  
```

再次插入班级编号为null的数据

![](./MySQL.assets/true-clip_image269.jpg)

添加数据到班级表，添加数据到学生表，删除班级数据，将会出现如下错误：
```sql
insert  into t_classes (classes_id,classes_name) values (10,'366');     insert  into t_student(  student_id, student_name,  sex, birthday, email, classes_id  ) values(  1001, 'zhangsan', 'm',  '1988-01-01', 'qqq@163.com', 10  )     
update t_classes set classes_id = 20  where classes_name = '366';  
```

![](./MySQL.assets/true-clip_image271.jpg) 

> 因为子表（t_student）存在一个外键classes_id，它参照了父表（t_classes）中的主键，所以先删除子表中的引用记录，再修改父表中的数据。  我们也可以采取以下措施 级联更新。

```sql
delete from t_classes where classes_id = 10;  
```

 

![](./MySQL.assets/true-clip_image273.jpg) 

> 因为子表（t_student）存在一个外键classes_id，它参照了父表（t_classes)中的主键，所以先删除父表，那么将会影响子表的参照完整性，所以正确的做法是，先删除子表中的数据，再删除父表中的数据，采用drop table也不行，必须先drop子表，再drop父表  我们也可以采取以下措施 级联删除。  

## 14.4.5、级联更新与级联删除

### 14.4.5.1、on update cascade;
mysql对有些约束的修改比较麻烦，所以我们可以先删除，再添加    
```sql
alter  table t_student drop foreign key fk_classes_id;    
alter  table t_student add constraint fk_classes_id_1 foreign key(classes_id)  references t_classes(classes_id) on  update cascade;     
```

![](./MySQL.assets/true-clip_image275.jpg)

我们只修改了父表中的数据，但是子表中的数据也会跟着变动。  


### 14.4.5.2、on delete cascade; 
mysql对有些约束的修改时不支持的，所以我们可以先删除，再添加   
```sql
alter  table t_student drop foreign key fk_classes_id;  

alter  table t_student add constraint fk_classes_id_1 foreign key(classes_id)  references t_classes(classes_id) on  delete cascade;  delete  from t_classes where classes_id = 20;  
```


![](./MySQL.assets/true-clip_image277.jpg)  

我们只删除了父表中的数据，但是子表也会中的数据也会删除。  

##  14.5、t_student和t_classes完整示例
```sql
drop  table if exists t_classes;  create  table t_classes(      classes_id    int (3),      classes_name  varchar(30)   not null,      constraint pk_classes_id primary  key(classes_id)   )     drop  table if exists t_student;  create  table t_student(      student_id    int(10),      student_name     varchar(50) not null,      sex     char(2)  not null,      birthday date not null,      email       varchar(30)  unique,      classes_id    int (3) not null,      constraint pk_student_id primary  key(student_id),      constraint fk_classes_id  foreign  key(classes_id) references t_classes(classes_id)   )   
```
​    


##  14.6、增加/删除/修改表约束

### 14.6.1、删除约束

将t_student

删除外键约束：alter table 表名 drop foreign key 外键（区分大小写）;
```sql
alter table t_student drop foreign key fk_classes_id;
```

删除主键约束：alter table 表名 drop  primary key ;
```sql
alter table t_student drop primary key;
```

删除约束约束：alter table 表名 drop  key 约束名称 ;
```sql
alter table t drop key uk;      
```


### 14.6.2、添加约束

将t_student中的约束

添加外键约束：alter table 从表 add constraint  约束名称 foreign key 从表(外键字段) references 主表(主键字段);    
```sql
alter  table t_student add constraint fk_classes_id_1 foreign key(classes_id)  references t_classes(classes_id);
```

添加主键约束：alter table 表 add constraint  约束名称 primary key 表(主键字段);  

```sql
alter  table t_student add constraint pk primary key(student_id);
```

添加唯一性约束：alter table 表 add constraint  约束名称 unique 表(字段);  

```sql
alter  table t_student add constraint uk unique(email);  
```


### 14.6.3、修改约束，其实就是修改字段
```sql
alter  table t_student modify student_name varchar(30) unique;     
```

mysql对有些约束的修改时不支持，所以我们可以先删除，再添加  


#  15、存储引擎

##  15.1、存储引擎的使用

• 数据库中的各表均被（在创建表时）指定的存储引擎来处理。 

• 服务器可用的引擎依赖于以下因素： 

• MySQL的版本 

• 服务器在开发时如何被配置 

• 启动选项

• 为了解当前服务器中有哪些存储引擎可用，可使用SHOW ENGINES语句：
SHOW ENGINES\G

![](./MySQL.assets/true-clip_image279.jpg)

• 在创建表时，可使用ENGINE选项为CREATE TABLE语句显式指定存储引擎。

```sql
CREATE TABLE TABLENAME (NO INT) ENGINE = MyISAM;
```



• 如果在创建表时没有显式指定存储引擎，则该表使用当前默认的存储引擎 

• 默认的存储引擎可在my.ini配置文件中使用default-storage-engine选项指定。

• 现有表的存储引擎可使用ALTER TABLE语句来改变：ALTER TABLE TABLENAME ENGINE = INNODB;

• 为确定某表所使用的存储引擎，可以使用SHOW CREATE TABLE或SHOW TABLE STATUS语句：

SHOW CREATE TABLE emp\G
SHOW TABLE STATUS LIKE 'emp' \G

##  15.2、常用的存储引擎

#### 15.2.1、MyISAM存储引擎

• MyISAM存储引擎是MySQL最常用的引擎。 
• 它管理的表具有以下特征：
	– 使用三个文件表示每个表：
• 格式文件 — 存储表结构的定义（mytable.frm） 
• 数据文件 — 存储表行的内容（mytable.MYD） 
• 索引文件 — 存储表上索引（mytable.MYI）
	– 灵活的AUTO_INCREMENT字段处理
	– 可被转换为压缩、只读表来节省空间 

#### 15.2.2、InnoDB存储引擎

• InnoDB存储引擎是MySQL的缺省引擎。 

• 它管理的表具有下列主要特征：

– 每个InnoDB表在数据库目录中以.frm格式文件表示
– InnoDB表空间tablespace被用于存储表的内容
– 提供一组用来记录事务性活动的日志文件
– 用COMMIT(提交)、SAVEPOINT及ROLLBACK(回滚)支持事务处理
– 提供全ACID兼容
– 在MySQL服务器崩溃后提供自动恢复
– 多版本（MVCC）和行级锁定
– 支持外键及引用的完整性，包括级联删除和更新 

#### 15.2.3、MEMORY存储引擎

• 使用MEMORY存储引擎的表，其数据存储在内存中，且行的长度固定，这两个特点使得MEMORY存储引擎非常快。
• MEMORY存储引擎管理的表具有下列特征：
– 在数据库目录内，每个表均以.frm格式的文件表示。
– 表数据及索引被存储在内存中。
– 表级锁机制。
– 不能包含TEXT或BLOB字段。

• MEMORY存储引擎以前被称为HEAP引擎。 

##  15.3、选择合适的存储引擎

• MyISAM表最适合于大量的数据读而少量数据更新的混合操作。MyISAM表的另一种适用情形是使用压缩的只读表。

• 如果查询中包含较多的数据更新操作，应使用InnoDB。其行级锁机制和多版本的支持为数据读取和更新的混合操作提供了良好的并发机制。

• 可使用MEMORY存储引擎来存储非永久需要的数据，或者是能够从基于磁盘的表中重新生成的数据。 

#  16、事务

##  16.1、概述

![image-20220619223138980](./MySQL.assets/true-image-20220619223138980.png)

事务可以保证多个操作原子性，要么全成功，要么全失败。对于数据库来说事务保证批量的DML要么全成功，要么全失败。事务具有四个特征ACID

> a) 原子性（Atomicity） 整个事务中的所有操作，必须作为一个单元全部完成（或全部取消）。
> b) 一致性（Consistency） 在事务开始之前与结束之后，数据库都保持一致状态。
> c) 隔离性(Isolation) 一个事务不会影响其他事务的运行。
> d) 持久性(Durability) 在事务完成以后，该事务对数据库所作的更改将持久地保存在数据库之中，并不会被回滚。

事务中存在一些概念：

> a) 事务（Transaction）：一批操作（一组DML）
> b) 开启事务（Start Transaction）
> c) 回滚事务（rollback）
> d) 提交事务（e_commit）
> e) SET AUTOCOMMIT：禁用或启用事务的自动提交模式

当执行DML语句是其实就是开启一个事务

关于事务的回滚需要注意：只能回滚insert、delete和update语句，不能回滚select（回滚select没有任何意义），对于create、drop、alter这些无法回滚.

事务只对DML有效果。

注意：rollback，或者e_commit后事务就结束了。

##  16.2、事务的提交与回滚演示 

1) 创建表
```sql
create table user( id  int (11) primary key not null auto_increment , username varchar(30),  password  varchar(30)  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8
```

2) 查询表中数据

![](./MySQL.assets/true-clip_image282.jpg)

3) 开启事务START TRANSACTION;

4) 插入数据
```sql
insert into user (username,password) values ('zhangsan','123');
```

![](./MySQL.assets/true-clip_image284.jpg)

5) 查看数据

![](./MySQL.assets/true-clip_image286.jpg)

6) 修改数据

![](./MySQL.assets/true-clip_image288.jpg)

7) 查看数据

![](./MySQL.assets/true-clip_image290.jpg)

8) 回滚事务

![](./MySQL.assets/true-clip_image292.jpg)

9) 查看数据

![](./MySQL.assets/true-clip_image294.jpg)

##  16.3、自动提交模式

• 自动提交模式用于决定新事务如何及何时启动。 

• 启用自动提交模式：

– 如果自动提交模式被启用，则单条DML语句将缺省地开始一个新的事务。 

– 如果该语句执行成功，事务将自动提交，并永久地保存该语句的执行结果。 

– 如果语句执行失败，事务将自动回滚，并取消该语句的结果。 

– 在自动提交模式下，仍可使用START TRANSACTION语句来显式地启动事务。这时，一个事务仍可包含多条语句，直到这些语句被统一提交或回滚。 

• 禁用自动提交模式： 

– 如果禁用自动提交，事务可以跨越多条语句。 

– 在这种情况下，事务可以用COMMIT和ROLLBACK语句来显式地提交或回滚。 

• 自动提交模式可以通过服务器变量AUTOCOMMIT来控制。 

• 例如：
```sql
SET AUTOCOMMIT = OFF； 
SET AUTOCOMMIT = ON； 
或
SET SESSION AUTOCOMMIT = OFF； 
SET SESSION AUTOCOMMIT = ON；
```
> show variables like '%auto%'; -- 查看变量状态

##  16.4、事务的隔离级别

#### 16.4.1、隔离级别

• 事务的隔离级别决定了事务之间可见的级别。
• 当多个客户端并发地访问同一个表时，可能出现下面的一致性问题：
| 隔离级别                          | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| 脏读取（Dirty Read）              | 一个事务开始读取了某行数据，但是另外一个事务已经更新了此数据但没有能够及时提交，这就出现了脏读取。 |
| 不可重复读（Non-repeatable Read） | 在同一个事务中，同一个读操作对同一个数据的前后两次读取产生了不同的结果，这就是不可重复读。 |
| 幻像读（Phantom Read）            | 幻像读是指在同一个事务中以前没有的行，由于其他事务的提交而出现的新行。 |

#### 16.4.2、四个隔离级别

• InnoDB 实现了四个隔离级别，用以控制事务所做的修改，并将修改通告至其它并发的事务：
| 隔离级别                          | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| 读未提交（READ UMCOMMITTED）      | 允许一个事务可以看到其他事务未提交的修改。                   |
| 读已提交（READ COMMITTED）        | 允许一个事务只能看到其他事务已经提交的修改，未提交的修改是不可见的。 |
| 可重复读（REPEATABLE READ）       | 确保如果在一个事务中执行两次相同的SELECT语句，都能得到相同的结果，不管其他事务是否提交这些修改。 （银行总账）该隔离级别为InnoDB的缺省设置。 |
| 串行化（SERIALIZABLE） 【序列化】 | 将一个事务与其他事务完全地隔离。                             |


例:A可以开启事物,B也可以开启事物
A在事物中执行DML语句时,未提交
B不以执行DML,DQL语句

#### 16.4.3、隔离级别与一致性问题的关系

![](./MySQL.assets/true-clip_image296.jpg)

#### 16.4.4、设置服务器缺省隔离级别

##### 通过修改配置文件设置 

• 可以在my.ini文件中使用transaction-isolation选项来设置服务器的缺省事务隔离级别。 
• 该选项值可以是： 

– READ-UNCOMMITTED
– READ-COMMITTED
– REPEATABLE-READ
– SERIALIZABLE

• 例如：

> [mysqld]
>
> transaction-isolation = READ-COMMITTED

##### 通过命令动态设置隔离级别

• 隔离级别也可以在运行的服务器中动态设置，应使用SET TRANSACTION ISOLATION LEVEL语句。 
• 其语法模式为：

> SET [GLOBAL | SESSION] TRANSACTION ISOLATION LEVEL \<isolation-level>
> 其中的\<isolation-level>可以是：

– READ UNCOMMITTED
– READ COMMITTED
– REPEATABLE READ
– SERIALIZABLE

• 例如： SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

#### 16.4.5、隔离级别的作用范围

• 事务隔离级别的作用范围分为两种： 

– 全局级：对所有的会话有效 

– 会话级：只对当前的会话有效 

• 例如，设置会话级隔离级别为READ COMMITTED ：
```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED；
或：
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED；
```
• 设置全局级隔离级别为READ COMMITTED ： 
```sql
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED；
```

#### 16.4.6、查看隔离级别

• 服务器变量tx_isolation（包括会话级和全局级两个变量）中保存着当前的会话隔离级别。 

• 为了查看当前隔离级别，可访问tx_isolation变量： 

– 查看会话级的当前隔离级别：
```sql
SELECT @@tx_isolation;
 或： 
SELECT @@session.tx_isolation;
```

– 查看全局级的当前隔离级别： 
```sql
SELECT @@global.tx_isolation;
```

#### 16.4.7、并发事务与隔离级别示例

##### read une_committed(未提交读) --脏读(Drity Read)：

| 会话一                                                       | 会话二                |
| ------------------------------------------------------------ | --------------------- |
|  prompt s1>                                            |  use testtable  |
| s1>use testtable                                             |  prompt s2>     |
| s1>create table tx (  id int(11),  num int (10)  );          |                       |
| s1>set global transaction  isolation level read une_committed; |                       |
| s1>start transaction;                                        |                       |
|                                                              | s2>start transaction; |
| s1>insert into tx values  (1,10);                            |                       |
|                                                              | s2>select * from tx;  |
| s1>rollback;                                                 |                       |
|                                                              | s2>select * from tx;  |

##### read e_committed(已提交读)

| 会话一                                                      | 会话二                |
| ----------------------------------------------------------- | --------------------- |
| s1> set global transaction isolation  level read e_committed; |                       |
| s1>start transaction;                                       |                       |
|                                                             | s2>start transaction; |
| s1>insert into tx values (1,10);                            |                       |
| s1>select * from tx;                                        |                       |
|                                                             | s2>select * from tx;  |
| s1>e_commit;                                                  |                       |
|                                                             | s2>select * from tx;  |

##### repeatable read(可重复读) 

| 会话一                                                       | 会话二                |
| ------------------------------------------------------------ | --------------------- |
| s1> set global transaction isolation  level repeatable read; |                       |
| s1>start transaction;                                        | s2>start transaction; |
| s1>select * from tx;                                         |                       |
| s1>insert into tx values (1,10);                             |                       |
|                                                              | s2>select * from tx;  |
| s1>e_commit;                                                   |                       |
|                                                              | s2>select * from tx;  |

#  17、索引

## 17.1、索引原理

索引被用来快速找出在一个列上用一特定值的行。没有索引，MySQL不得不首先以第一条记录开始，然后读完整个表直到它找出相关的行。表越大，花费时间越多。对于一个有序字段，可以运用二分查找（Binary Search），这就是为什么性能能得到本质上的提高。MYISAM和INNODB都是用B+Tree作为索引结构

（主键，unique 都会默认的添加索引）

## 17.2、索引的应用

### 17.2.1、创建索引

如果未使用索引，我们查询 工资大于 1500的会执行全表扫描

![](./MySQL.assets/true-clip_image298.jpg)


**什么时候需要给字段添加索引：**

- 表中该字段中的数据量庞大
- 经常被检索，经常出现在 where 子句中的字段
- 经常被 DML 操作的字段不建议添加索引

索引等同于一本书的目录
主键会自动添加索引，所以尽量根据主键查询效率较高。
如经常根据e_sal进行查询，并且遇到了性能瓶颈，首先查看程序是否存算法问题，再考虑对e_sal建立索引，建立索引如下：

 1、create unique index 索引名 on 表名(列名); 
```sql
create unique index u_e_name on emp(e_name);
```
 2、alter table 表名 add unique index 索引名 (列名); 
```sql
create index test_index on emp (e_sal);  
```

![](./MySQL.assets/true-clip_image300.jpg)


### 17.2.2、查看索引
```sql
show index from emp;  
```

![](./MySQL.assets/true-clip_image302.jpg)

### 17.2.3、使用索引

注意一定不可以用select * … 可以看到type!=all了，说明使用了索引
```sql
explain select e_sal from emp where e_sal > 1500;  
```

条件中的e_sal使用了索引

![](./MySQL.assets/true-clip_image304.jpg)

如下图：假如我们要查找e_sal大于1500的所有行，那么可以扫描索引，索引时排序的，结果得出7行，我们知道不会再有匹配的记录，可以退出了。
如果查找一个值，它在索引表中某个中间点以前不会出现，那么也有找到其第一个匹配索引项的定位算法，而不用进行表的顺序扫描（如二分查找法）。
这样，可以快速定位到第一个匹配的值，以节省大量搜索时间。数据库利用了各种各样的快速定位索引值的技术，通常这些技术都属于DBA的工作。

### 17.2.4、删除索引
```sql
DROP INDEX index_name ON  talbe_name  ALTER TABLE table_name DROP  INDEX index_name  ALTER TABLE table_name DROP  PRIMARY KEY  
```

其中，前两条语句是等价的，删除掉table_name中的索引index_name。  

第3条语句只在删除PRIMARY KEY索引时使用，因为一个表只可能有一个PRIMARY KEY索引，   
```sql
ALTER TABLE EMP DROP  INDEX test_index;   
```

删除后就不再使用索引了，查询会执行全表扫描。 

![](./MySQL.assets/true-clip_image306.jpg)  

#  18、视图(虚拟表)

##  18.1、什么是视图

• 视图是一种根据查询（也就是SELECT表达式）定义的数据库对象，用于获取想要看到和使用的局部数据。 
• 视图有时也被成为 **虚拟表**。 
• 视图可以被用来从常规表（称为“基表”）或其他视图中查询数据。
• 相对于从基表中直接获取数据，视图有以下好处：
– 访问数据变得简单
– 可被用来对不同用户显示不同的表的内容
用来协助适配表的结构以适应前端现有的应用程序
视图作用：

- 提高检索效率
- 隐藏表的实现细节【面向视图检索】

![](./MySQL.assets/true-clip_image308.jpg)

##  18.2、创建视图

如下示例：查询员工的姓名，部门，工资入职信息等信息。

```sql
select e_name,d_name,e_sal,e_date,e.d_no  from emp e,dept d where e.d_no   =  e.d_no and e.d_no = 10;  
```

为什么使用视图？因为需求决定以上语句需要在多个地方使用，如果频繁的拷贝以上代码，会给维护带来成本，视图可以解决这个问题

```sql
create view v_dept_emp as select e_name,d_name,e_sal,e_date,e.d_no from emp  e,dept d where e.d_no   =  e.d_no and e.d_no = 10;
create view v_dept_avg_e_sal_grade as  select a.d_no, a.avg_e_sal, b.grade from (select d_no, avg(e_sal) avg_e_sal  from emp group by d_no) a, e_salgrade b   where a.avg_e_sal between b.loe_sal and  b.hie_sal; 
```

注意mysql不支持子查询创建视图

##  18.3、修改视图

```sql
alter view  v_dept_emp as select  e_name,d_name,e_sal,e_date,e.d_no from e  mp e,dept d where e.d_no = 20; 
```

​    

##  18.4、删除视图

```sql
drop view if exists v_dept_emp;  
```




#  19、存储过程

## 19.1、基础介绍





## 19.2、创建存储过程



## 19.3、删除存储过程





#  20、触发器

## 20.1、



## 20.2、



## 20.3、





#  21、DBA命令

##  21.1、新建用户

>  CREATE USER username IDENTIFIED BY 'password';  

说明: username——你将创建的用户名, password——该用户的登陆密码,密码可以为空,如果为空则该用户可以不需要密码登陆服务器.  例如：  create user p361 identified by '123';  --可以登录但是只可以看见一个库 information_schema  

##  21.2、授权

命令详解  

```sql
grant all privileges on dbname.tbname to 'username'@'login ip' identified by  'password' with grant option;  
```

1) dbname=* 表示所有数据库
2) tbname=* 表示所有表  
3) login ip=% 表示任何ip  
4) password为空，表示不需要密码即可登录  
5) with grant option;  表示该用户还可以授权给其他用户  

**细粒度授权**

首先以root用户进入mysql，然后键入命令：grant select,insert,update,delete on *.* to p361  @localhost Identified by "123";   如果希望该用户能够在任何机器上登陆mysql，则将localhost改为 "%" 。 

**粗粒度授权**

我们测试用户一般使用该命令授权，  GRANT ALL PRIVILEGES ON *.* TO 'p361'@'%'  Identified by "123";      
注意:用以上命令授权的用户不能给其它用户授权,如果想让该用户可以授权,用以下命令:     

> GRANT ALL PRIVILEGES ON *.* TO 'p361'@'%'  Identified by "123"   WITH GRANT OPTION;     

privileges包括：  

1) alter：修改数据库的表  
2) create：创建新的数据库或表  
3) delete：删除表数据  
4) drop：删除数据库/表 
5) index：创建/删除索引 
6) insert：添加表数据
7) select：查询表数据 
8) update：更新表数据
9) all：允许任何操作
10) usage：只允许登录     

##  21.3、回收权限

命令详解 
```sql
revoke privileges on dbname[.tbname] from username; 
revoke all privileges on *.* from p361; 
use mysql select * from user 
```

进入 mysql库中  修改密码;  

```sql
update user set password = password('qwe') where user = 'p646';
```

刷新权限：flush privileges  

##  21.4、导出导入

### 21.4.1、导出

#### 21.4.1.1、导出整个数据库 

在windows的dos命令窗口中执行：mysqldump testtable>D:\testtable.sql -uroot -p123

#### 21.4.1.2、导出指定库下的指定表 

在windows的dos命令窗口中执行：mysqldump testtable emp> D:\ testtable.sql -uroot –p123

### 21.4.2、导入

登录MYSQL数据库管理系统之后执行：source D:\ testtable.sql


#  22、数据库设计的三范式

##  22.1、第一范式 

数据库表中不能出现重复记录，每个字段是原子性的不能再分

不符合第一范式的示例

| 学生编号 | 学生姓名 | 联系方式                                        |
| -------- | -------- | ----------------------------------------------- |
| 1001     | 张三     | zs@gmail.com,1359999999                         |
| 1002     | 李四     | [ls@gmail.com](mailto:ls@gmail.com),13699999999 |
| 1001     | 王五     | ww@163.net,13488888888                          |

存在问题：

n 最后一条记录和第一条重复（不唯一，没有主键）

n 联系方式字段可以再分，不是原子性的

| 学生编号(pk) | 学生姓名 | email                               | 联系电话    |
| ------------ | -------- | ----------------------------------- | ----------- |
| 1001         | 张三     | zs@gmail.com                        | 1359999999  |
| 1002         | 李四     | [ls@gmail.com](mailto:ls@gmail.com) | 13699999999 |
| 1003         | 王五     | [ww@163.net](mailto:ww@163.net)     | 13488888888 |

关于第一范式，每一行必须唯一，也就是每个表必须有主键，这是我们数据库设计的最基本要求，主要通常采用数值型或定长字符串表示，关于列不可再分，应该根据具体的情况来决定。如联系方式，为了开发上的便利行可能就采用一个字段了。

##  22.2、第二范式

第二范式是建立在第一范式基础上的，另外要求所有非主键字段完全依赖主键，不能产生部分依赖

示例：

| 学生编号 | 学生姓名 | 教师编号 | 教师姓名 |
| -------- | -------- | -------- | -------- |
| 1001     | 张三     | 001      | 王老师   |
| 1002     | 李四     | 002      | 赵老师   |
| 1003     | 王五     | 001      | 王老师   |
| 1001     | 张三     | 002      | 赵老师   |


确定主键：

| 学生编号(PK) | 教师编号(PK) | 学生姓名 | 教师姓名 |
| ------------ | ------------ | -------- | -------- |
| 1001         | 001          | 张三     | 王老师   |
| 1002         | 002          | 李四     | 赵老师   |
| 1003         | 001          | 王五     | 王老师   |
| 1001         | 002          | 张三     | 赵老师   |

以上虽然确定了主键，但此表会出现大量的冗余，主要涉及到的冗余字段为“学生姓名”和“教师姓名”，出现冗余的原因在于，学生姓名部分依赖了主键的一个字段学生编号，而没有依赖教师编号，而教师姓名部门依赖了主键的一个字段教师编号，这就是第二范式部分依赖。

解决方案如下：

学生信息表

| 学生编号（PK） | 学生姓名 |
| -------------- | -------- |
| 1001           | 张三     |
| 1002           | 李四     |
| 1003           | 王五     |


教师信息表

| 教师编号（PK） | 教师姓名 |
| -------------- | -------- |
| 001            | 王老师   |
| 002            | 赵老师   |

教师和学生的关系表

| 学生编号(PK) fkà学生表的学生编号 | 教师编号(PK) fkà教师表的教师编号 |
| -------------------------------- | -------------------------------- |
| 1001                             | 001                              |
| 1002                             | 002                              |
| 1003                             | 001                              |
| 1001                             | 002                              |


如果一个表是单一主键，那么它就复合第二范式，部分依赖和主键有关系

**以上是一种典型的“多对多”的设计**

##  22.3、第三范式

建立在第二范式基础上的，非主键字段不能传递依赖于主键字段。（**不要产生传递依赖**）

| 学生编号（PK） | 学生姓名 | 班级编号 | 班级名称 |
| -------------- | -------- | -------- | -------- |
| 1001           | 张三     | 01       | 一年一班 |
| 1002           | 李四     | 02       | 一年二班 |
| 1003           | 王五     | 03       | 一年三班 |
| 1004           | 六       | 03       | 一年三班 |

从上表可以看出，班级名称字段存在冗余，因为班级名称字段没有直接依赖于主键，班级名称字段依赖于班级编号，班级编号依赖于学生编号，那么这就是传递依赖，解决的办法是将冗余字段单独拿出来建立表，如：

学生信息表

| 学生编号（PK） | 学生姓名 | 班级编号（FK） |
| -------------- | -------- | -------------- |
| 1001           | 张三     | 01             |
| 1002           | 李四     | 02             |
| 1003           | 王五     | 03             |
| 1004           | 六       | 03             |


班级信息表

| 班级编号（PK） | 班级名称 |
| -------------- | -------- |
| 01             | 一年一班 |
| 02             | 一年二班 |
| 03             | 一年三班 |

以上设计是一种典型的一对多的设计，一存储在一张表中，多存储在一张表中，在多的那张表中添加外键指向一的一方的主键

##  22.4、三范式总结

第一范式：有主键，具有原子性，字段不可分割
第二范式：完全依赖，没有部分依赖
第三范式：没有传递依赖 冗余

> 数据库设计尽量遵循三范式，但是还是根据实际情况进行取舍，有时可能会拿冗余换速度，最终用目的要满足客户需求。


**一对一设计，有两种设计方案：**

第一种设计方案：主键共享
第二种设计方案：外键唯一



# 索引面试题

## 1，请问，慢查询出现后如何调优？

慢查询出现后，首先查看是否缺少索引

## 2，请问，应该使用哪种索引引擎？

innodb

## 3，索引的常用形式是如何？

多字段联合索引

## 4，id自增设定是否合理？

合理，因为自增索引为自然数，显示为1 2 3 4 5 6 ，无论是范围查询例如id\<6 and id>4，通过
叶子节点的双向指针可以快地进行范围查询；还是做精确查询，21亿个数只需查3次，都是非常方便和迅速
的，要把方便做范围查询，排序，和兼有良好的精确查询效率都答出来

## 5，应该推荐整型索引使用还是uuid唯一性字符索引使用？
整型更好，方便做范围查询，uuid可以做唯一性的精确查询，但是范围查询对于一串字符串来说并不友
好，而且整型更利于排序

## 6，mysql的索引是什么？

帮助mysql高效获取数据的数据结构

## 7，mysql的索引结构是什么？为什么？其他的参考结构差到哪里？

B+树 数据结构，1、检索速度快；2、排序快，
1.单一节点存储更多的元素，使得查询的IO次数更少。
2.所有查询都要查找到叶子节点，查询性能稳定。
3.所有叶子节点形成有序链表，便于范围查询。，其他结构如B-树在数据量过大时会变成链表



# 练习

## 1、取得每个部门最高薪水的人员名称

1,取得各个部门的最高薪水  2,使用内连接查询最高薪水是哪些人

```sql
```

![](./MySQL.assets/true-clip_image310.jpg)

## 2、哪些人的薪水在部门的平均薪水之上
  1,部门的平均薪水是多少.
  2,哪些人的薪水大于平均薪水.

```sql
```

![](./MySQL.assets/true-clip_image312.jpg)

## 3、取得部门中（所有人的）平均的薪水等级，如下：
1、先取得每个人的等级（员工表-e_sal，，e_salgrade表）以及对应的部门.
2、在计算各部门的平均等级，基于部门分组.

```sql
```

![](./MySQL.assets/true-clip_image314.jpg)

## 4、不准用组函数（Max），取得最高薪水（给出两种解决方案）

```sql
```

![](./MySQL.assets/true-clip_image316.jpg)

## 5、取得平均薪水最高的部门的部门编号（至少给出两种解决方案）

```sql
#第一步：先求出每个部门的平均薪资，作为临时表 t
SELECT e.deptno,AVG(e.`SAL`) AS avg_sal
FROM emp e
GROUP BY e.`DEPTNO`;
#第二步：从第一步得出的每个部门平均薪资里求出最高值
SELECT
 MAX(a.avg_sal) AS maxsal
FROM (
 SELECT e.deptno,AVG(e.`SAL`) AS avg_sal
 FROM emp e
 GROUP BY e.`DEPTNO`
) a;
#第三步：用 临时表 t 再去匹配第二步得出的最大值，看哪个部门的平均薪资等于第二步的值
SELECT e.`DEPTNO`,AVG(e.`SAL`) AS avg_sal
FROM emp e
GROUP BY e.`DEPTNO`
HAVING avg_sal = (
  SELECT
  MAX(a.avg_sal) AS maxsal
  FROM (
   SELECT e.deptno,AVG(e.`SAL`) AS avg_sal
   FROM emp e
   GROUP BY e.`DEPTNO`
 )a);
```

![](./MySQL.assets/true-clip_image318.jpg)

## 6、取得平均薪水最高的部门的部门名称

```sql
```

![](./MySQL.assets/true-clip_image320.jpg)

## 7、求平均薪水的等级最低的部门的部门名称

```sql
#求各个部门平均薪水
CREATE VIEW avg_job AS
SELECT e.`DEPTNO`,AVG(e.sal) AS avgSal
FROM emp e GROUP BY e.`DEPTNO`;
#获取最低等级值4
CREATE VIEW avg_grade AS
SELECT t.`DEPTNO`,t.`avgSal`,s.`GRADE`
FROM avg_job AS t
JOIN salgrade s
ON t.avgSal BETWEEN s.losal AND s.hisal;
#组合查询
CREATE VIEW avg_grade AS
SELECT a.`DEPTNO`,MIN(a.`GRADE`)AS minGrade FROM avg_grade a;
--------------------------------------------------------------------------------
SELECT
 t.deptno,d.dname,t.avg_sal,s.grade
FROM (
  SELECT e.deptno,AVG(e.sal) AS avg_sal
  FROM emp  e
  GROUP BY e.deptno
) t
JOIN salgrade s
ON t.avg_sal BETWEEN s.losal AND s.hisal
JOIN dept d
ON d.deptno=t.deptno
HAVING s.grade=(
  SELECT MIN(grade) AS min_grade
  FROM (
    SELECT t.deptno,t.avg_sal,s.grade
    FROM (
      SELECT e.deptno,AVG(e.sal) AS avg_sal
      FROM emp  e
      GROUP BY e.deptno) t
  JOIN salgrade s
  ON t.avg_sal BETWEEN s.losal AND s.hisal
 ) t
);
```

![](./MySQL.assets/true-clip_image322.jpg)

## 8、取得比普通员工的最高薪水还要高的领导人姓名

```sql
```

![](./MySQL.assets/true-clip_image324.jpg)

## 9、取得薪水最高的前五名员工

```sql
```

![](./MySQL.assets/true-clip_image326.jpg)

## 10、取得薪水最高的第六到第十名员工

```sql
```

![](./MySQL.assets/true-clip_image328.jpg)

## 11、取得最后入职的5名员工

```sql
```

![](./MySQL.assets/true-clip_image330.jpg)

## 12、取得每个薪水等级有多少员工

```sql
SELECT COUNT(temp1.e_no) counts,temp1.grade FROM (SELECT d_no,e_no,e_sal,s.grade grade  FROM emp INNER JOIN e_salgrade AS s ON emp.SAL BETWEEN s.LOSAL AND s.HISAL)AS temp1 GROUP BY temp1.grade;
```

![](./MySQL.assets/true-clip_image332.jpg)

## 13、学生面试题

有3个表S(学生表)，C（课程表），SC（学生选课表）
S（SNO，SNAME）代表（学号，姓名） 
C（CNO，CNAME，CTEACHER）代表（课号，课名，教师）
SC（SNO，CNO，SCGRADE）代表（学号，课号，成绩）

问题：

1，找出没选过“黎明”老师的所有学生姓名。
2，列出2门以上（含2门）不及格学生姓名及平均成绩。
3，即学过1号课程又学过2号课所有学生的姓名。

请用标准SQL语言写出答案，方言也行（请说明是使用什么方言）。

-----------------------------------------------------------------------------

```sql
CREATE TABLE SC ( SNO VARCHAR(200), CNO VARCHAR(200), SCGRADE VARCHAR(200) );
CREATE TABLE S ( SNO VARCHAR(200 ), SNAME VARCHAR(200));
CREATE TABLE C ( CNO VARCHAR(200), CNAME VARCHAR(200), CTEACHER VARCHAR(200) );

INSERT INTO C ( CNO, CNAME, CTEACHER ) VALUES ( '1', '语文', '张');
INSERT INTO C ( CNO, CNAME, CTEACHER ) VALUES ( '2', '政治', '王');
INSERT INTO C ( CNO, CNAME, CTEACHER ) VALUES ( '3', '英语', '李');
INSERT INTO C ( CNO, CNAME, CTEACHER ) VALUES ( '4', '数学', '赵');
INSERT INTO C ( CNO, CNAME, CTEACHER ) VALUES ( '5', '物理', '黎明');
e_commit;
INSERT INTO S ( SNO, SNAME ) VALUES ( '1', '学生1');
INSERT INTO S ( SNO, SNAME ) VALUES ( '2', '学生2');
INSERT INTO S ( SNO, SNAME ) VALUES ( '3', '学生3');
INSERT INTO S ( SNO, SNAME ) VALUES ( '4', '学生4');
e_commit;
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '1', '1', '40');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '1', '2', '30');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '1', '3', '20');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '1', '4', '80');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '1', '5', '60');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '2', '1', '60');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '2', '2', '60');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '2', '3', '60');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '2', '4', '60');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '2', '5', '40');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '3', '1', '60');
INSERT INTO SC ( SNO, CNO, SCGRADE ) VALUES ( '3', '3', '80');
e_commit;
```



问题1.找出没选过“黎明”老师的所有学生姓名。
即:

![](./MySQL.assets/true-clip_image334.jpg)

问题2:列出2门以上（含2门）不及格学生姓名及平均成绩。
问题3:即学过1号课程又学过2号课所有学生的姓名。

## 14、列出所有员工及领导的姓名

```sql
```

![](./MySQL.assets/true-clip_image336.jpg) 

## 15、列出受雇日期早于其直接上级的所有员工的编号,姓名,部门名称

```sql
```

![](./MySQL.assets/true-clip_image338.jpg)

## 16、列出部门名称和这些部门的员工信息,同时列出那些没有员工的部门.

```sql
```

![](./MySQL.assets/true-clip_image340.jpg)

## 17、列出至少有5个员工的所有部门

```sql
```

![](./MySQL.assets/true-clip_image342.jpg)

## 18、列出薪金比"SMITH"多的所有员工信息.

```sql
```

![](./MySQL.assets/true-clip_image344.jpg)

## 19、列出所有"CLERK"(办事员)的姓名及其部门名称,部门的人数.

```sql
```

![](./MySQL.assets/true-clip_image346.jpg)

## 20、列出最低薪金大于1500的各种工作及从事此工作的全部雇员人数.

```sql
```

![](./MySQL.assets/true-clip_image348.jpg)

## 21、列出在部门"SALES"\<销售部>工作的员工的姓名,假定不知道销售部的部门编号.

```sql
```

![](./MySQL.assets/true-clip_image350.jpg)

## 22、列出薪金高于公司平均薪金的所有员工,所在部门,上级领导,雇员的工资等级.

```sql
```

![](./MySQL.assets/true-clip_image352.jpg)

## 23、列出与"SCOTT"从事相同工作的所有员工及部门名称.

```sql
```

![](./MySQL.assets/true-clip_image354.jpg)

## 24、列出薪金等于部门30中员工的薪金的其他员工的姓名和薪金.

```sql
```

## 25、列出薪金高于在部门30工作的所有员工的薪金的员工姓名和薪金.部门名称.

```sql
SELECT emp.ename,MAX(emp.`SAL`) FROM emp WHERE emp.`DEPTNO`=20;
#
CREATE VIEW max_sal AS
SELECT MAX(emp.`SAL`) AS maxSal FROM emp WHERE emp.`DEPTNO`=20;
SELECT * FROM max_sal;
#
SELECT e.ename,e.sal,d.dname
FROM emp e
JOIN dept d
ON e.`DEPTNO`=d.`DEPTNO`
WHERE e.`SAL`> (SELECT MAX(emp.`SAL`) AS maxSal FROM emp WHERE emp.`DEPTNO`=20);
```

![](./MySQL.assets/true-clip_image356.jpg)

## 26、列出在每个部门工作的员工数量,平均工资和平均服务期限.

```sql
```

![](./MySQL.assets/true-clip_image358.jpg)

## 27、列出所有员工的姓名、部门名称和工资。

```sql
```

![](./MySQL.assets/true-clip_image360.jpg)

## 28、列出所有部门的详细信息和人数

```sql
```

![](./MySQL.assets/true-clip_image362.jpg)

## 29、列出各种工作的最低工资及从事此工作的雇员姓名

```sql
#列出各种工作的工资
SELECT DISTINCT emp.`JOB`,emp.`SAL` FROM emp;
#最低工资
SELECT DISTINCT emp.`JOB`,MIN(emp.`SAL`) FROM emp GROUP BY emp.`JOB`;
#创建 最低工资 视图
CREATE VIEW min_sal AS
SELECT DISTINCT emp.`JOB`,MIN(emp.`SAL`) AS minSal FROM emp GROUP BY emp.`JOB`;
SELECT * FROM min_sal;
#事此工作的雇员姓名
CREATE VIEW min_sal_ename AS
SELECT e.sal,e.job,e.ename
FROM emp e
JOIN min_sal
ON e.`JOB`=min_sal.job AND e.`SAL`=min_sal.minSal;
SELECT * FROM min_sal_ename;
```

![](./MySQL.assets/true-clip_image364.jpg)

## 30、列出各个部门的MANAGER(领导)的最低薪金  

```sql
```

![](./MySQL.assets/true-clip_image366.jpg)

## 31、列出所有员工的年工资,按年薪从低到高排序

```sql
```

![](./MySQL.assets/true-clip_image368.jpg)

## 32、求出员工领导的薪水超过3000的员工名称与领导名称

```sql
#求出员工 领导的薪水超过 3000
SELECT * FROM emp WHERE e_sal>3000;
#使用内连接查询
SELECT m.e_name AS 员工名称,e.e_name AS 领导名称
FROM emp m JOIN emp e
ON m.e_mgr = e.e_no
WHERE m.sal>3000;
-----------------------------------------------------------------------
SELECT
   nomal.e_name,leader.e_name AS boss ,leader.e_sal
FROM
   emp nomal
JOIN
   emp leader
ON 
   nomal.e_mgr = leader.e_no
WHERE
   leader.e_sal>3000;
```

![](./MySQL.assets/true-clip_image370.jpg)

## 33、求出部门名称中,带'S'字符的部门员工的工资合计、部门人数.

```sql
SELECT
 d.d_name,
  SUM(e.e_sal) AS sumsal,
  COUNT(e.e_name) AS countEmp
FROM emp e LEFT JOIN dept d
ON e.d_no = e.d_no
WHERE d.d_name LIKE '%S%'
GROUP BY d.d_name;
```

![](./MySQL.assets/true-clip_image372.jpg)

## 34、给任职日期超过15年的员工加薪20%.

```sql
#给员工工龄>15的加薪20%
UPDATE emp SET e_sal=e_sal*(1+20/100) WHERE (TO_DAYS(NOW())-
TO_DAYS(HIREDATE))/365>15;
UPDATE emp SET e_sal=e_sal*1.2 WHERE (TO_DAYS(NOW())-TO_DAYS(HIREDATE))/365>15;
SELECT * FROM emp;
```

![](./MySQL.assets/true-image-20220620170637207.png)



