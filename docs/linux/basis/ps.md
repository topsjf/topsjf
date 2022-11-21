---
article: false
timeline: false
---
### ps 进程管理

- [返回命令大全列表](./command.md#文件管理)

①、命令名称：ps

②、英文原意：

③、命令所在路径：

④、执行权限：所有用户

⑤、功能描述：进程管理，显示了程序的进程ID（Process ID，PID）、它们运行在哪个终端（TTY）
以及进程已用的CPU时；**它只能显示某个特定时间点的信息**

⑥、语法：

ps 【选项】

**Unix风格的参数**

- -A  显示所有进程
- -N  显示与指定参数不符的所有进程
- -a  显示除控制进程（session leader ① ）和无终端进程外的所有进程
- -d  显示除控制进程外的所有进程
- -e  显示所有进程
- -C cmdlist  显示包含在 cmdlist 列表中的进程
- -G grplist  显示组ID在 grplist 列表中的进程
- -U userlist  显示属主的用户ID在 userlist 列表中的进程
- -g grplist  显示会话或组ID在 grplist 列表中的进程 ②
- -p pidlist  显示PID在 pidlist 列表中的进程
- -s sesslist  显示会话ID在 sesslist 列表中的进程
- -t ttylist  显示终端ID在 ttylist 列表中的进程
- -u userlist  显示有效用户ID在 userlist 列表中的进程
- -F  显示更多额外输出（相对 -f 参数而言）
- -O format  显示默认的输出列以及 format 列表指定的特定列
- -M  显示进程的安全信息
- -c  显示进程的额外调度器信息
- -f  显示完整格式的输出
- -j  显示任务信息
- -l  显示长列表
- -o format  仅显示由 format 指定的列
- -y  不要显示进程标记（process flag，表明进程状态的标记）
- -Z  显示安全标签（security context） ① 信息
- -H  用层级格式来显示进程（树状，用来显示父进程）
- -n namelist  定义了 WCHAN 列显示的值
- -w  采用宽输出模式，不限宽度显示
- -L  显示进程中的线程
- -V  显示 ps 命令的版本号



```shell
[root@admin home]# ps
   PID TTY          TIME CMD
  2048 pts/0    00:00:00 bash
 19813 pts/0    00:00:00 head
 91275 pts/0    00:00:05 ls
108430 pts/0    00:00:00 cat
116369 pts/0    00:00:00 ps

[root@admin home]# ps -ef
UID         PID   PPID  C STIME TTY          TIME CMD
root          2      0  0 10:54 ?        00:00:00 [kthreadd]
root          3      2  0 10:54 ?        00:00:00 [rcu_gp]
root          4      2  0 10:54 ?        00:00:00 [rcu_par_gp]
root          6      2  0 10:54 ?        00:00:00 [kworker/0:0H-kb]
root          8      2  0 10:54 ?        00:00:00 [mm_percpu_wq]
root          9      2  0 10:54 ?        00:00:00 [ksoftirqd/0]
```

- UID：启动这些进程的用户。
- PID：进程的进程ID。
- PPID：父进程的进程号（如果该进程是由另一个进程启动的）。
- C：进程生命周期中的CPU利用率。
- STIME：进程启动时的系统时间。
- TTY：进程启动时的终端设备。
- TIME：运行进程需要的累计CPU时间。
- CMD：启动的程序名称。

```shell
[root@admin home]# ps -l
F S   UID    PID   PPID  C PRI  NI ADDR SZ   WCHAN  TTY          TIME CMD
4 S     0   2048   2043  0  80   0  -  29250 do_wai pts/0    00:00:00 bash
0 T     0  19813   2048  0  80   0  -  27071 do_sig pts/0    00:00:00 head
4 T     0  91275   2048  0  80   0  -  30984 do_sig pts/0    00:00:05 ls
0 T     0 108430   2048  0  80   0  -  27020 do_sig pts/0    00:00:00 cat
4 R     0 119231   2048  0  80   0  -  38333 -      pts/0    00:00:00 ps
```

- F ：内核分配给进程的系统标记。
- S ：进程的状态（O代表正在运行；S代表在休眠；R代表可运行，正等待运行；Z代表僵化，进程已结束但父进程已不存在；T代表停止）。
- PRI ：进程的优先级（越大的数字代表越低的优先级）。
- NI ：谦让度值用来参与决定优先级。
- ADDR ：进程的内存地址。
- SZ ：假如进程被换出，所需交换空间的大致大小。
- WCHAN ：进程休眠的内核函数的地址

**BSD风格的参数**

参 数

- T   显示跟当前终端关联的所有进程
- a   显示跟任意终端关联的所有进程
- g   显示所有的进程，包括控制进程
- r   仅显示运行中的进程
- x   显示所有的进程，甚至包括未分配任何终端的进程
- U userlist  显示归 userlist 列表中某用户ID所有的进程
- p pidlist   显示PID在 pidlist 列表中的进程
- t ttylist   显示所关联的终端在 ttylist 列表中的进程
- O format    除了默认输出的列之外，还输出由 format 指定的列
- X   按过去的Linux i386寄存器格式显示
- Z   将安全信息添加到输出中
- j   显示任务信息
- l   采用长模式
- o format        仅显示由 format 指定的列
- s       采用信号格式显示
- u       采用基于用户的格式显示
- v       采用虚拟内存格式显示
- N namelist      定义在 WCHAN 列中使用的值
- O order     定义显示信息列的顺序
- S   将数值信息从子进程加到父进程上，比如CPU和内存的使用情况
- c   显示真实的命令名称（用以启动进程的程序名称）
- e   显示命令使用的环境变量
- f   用分层格式来显示进程，表明哪些进程启动了哪些进程
- h   不显示头信息
- k sort  指定用以将输出排序的列
- n   和 WCHAN 信息一起显示出来，用数值来表示用户ID和组ID
- w   为较宽屏幕显示宽输出
- H   将线程按进程来显示
- m   在进程后显示线程
- L   列出所有格式指定符
- V   显示 ps 命令的版本号


```shell
[root@admin home]# ps l
F   UID    PID   PPID PRI  NI    VSZ   RSS WCHAN  STAT TTY        TIME COMMAND
4     0   1155      1  20   0 110212  1832 wait_w Ss+  tty1       0:00 /sbin/agetty --noclear tty1 linux
4     0   2048   2043  20   0 117000  5112 do_wai Ss   pts/0      0:00 -bash
0     0  19813   2048  20   0 108284  1784 do_sig T    pts/0      0:00 head
4     0  91275   2048  20   0 123936  3304 do_sig T    pts/0      0:05 ls --color=auto -F -R /
0     0 108430   2048  20   0 108080   656 do_sig T    pts/0      0:00 cat
4     0 120675   2048  20   0 153332  3776 -      R+   pts/0      0:00 ps l
```

- VSZ：进程在内存中的大小，以千字节（KB）为单位。
- RSS：进程在未换出时占用的物理内存。 
- STAT：代表当前进程状态的双字符状态码
- - < ：该进程运行在高优先级上。
- - N ：该进程运行在低优先级上。
- - L ：该进程有页面锁定在内存中。
- - s ：该进程是控制进程。
- - l ：该进程是多线程的。
- - + ：该进程运行在前台



