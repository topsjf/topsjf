---
icon: edit
title: Java日志框架
category: Java
date: 2020-01-01
tag:
- log
---

# 日志级别说明

设置日志输出级别：系统设置级别为：

> DEBUG（打印 DEBUG+INFO+WARN+ERROR 的信息）
> INFO（打印 INFO+WARN+ERROR 的信息）
> WARN（打印 WARN+ERROR 的信息）
> ERROR（打印 ERROR 的信息）

```
scan: 当此属性设置为true时，配置文件若是发生改变，将会被从新加载，默认值为true。
scanPeriod: 设置监测配置文件是否有修改的时间间隔，若是没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。
debug: 当此属性设置为 true 时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为 false 。

pattern格式化输出：
    %d{yyyy-MM-dd HH:mm:ss.SSS}表示日期，
    [%thread]或[%t]表示线程名，
    %-5level：级别从左显示5个字符宽度，
    %logger:
    %msg：日志消息，%n是换行符
```



# 1、logback

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>${logback.version}</version>
</dependency>
```

logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- scan: 当此属性设置为true时，配置文件若是发生改变，将会被从新加载，默认值为true。
　　　scanPeriod: 设置监测配置文件是否有修改的时间间隔，若是没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。
　　　debug: 当此属性设置为 true 时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为 false 。
    pattern格式化输出：
    %d{yyyy-MM-dd HH:mm:ss.SSS}表示日期，
    [%thread]或[%t]表示线程名，
    %-5level：级别从左显示5个字符宽度，
    %logger:
    %message：日志消息，%n是换行符
-->
<configuration scan="true" scanPeriod="3 seconds" debug="false">
    <!--定义日志文件的存储地址 勿在 LogBack 的配置中使用相对路径-->
    <property name="log.path" value="./logs/job"/>
    <property name="CONSOLE_LOG_2"
              value="%red(%d{yyyy-MM-dd HH:mm:ss.SSS}) - %highlight([%-5level]) %red([%t])  %boldMagenta(%logger{50}) : %cyan([%message]%n)"/>

    <!-- 打印到控制台 CONSOLE  -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>DEBUG</level>
        </filter>
        <encoder charset="UTF-8">
            <pattern>控制台 ${CONSOLE_LOG_2}</pattern>
        </encoder>
    </appender>
    <!--INFO-->
    <appender name="INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/info.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <FileNamePattern>${log.path}/info-%d{yyyy-MM-dd}-%i.log</FileNamePattern>
            <maxHistory>2</maxHistory>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>1MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <layout>
            <pattern>INFO ==>> %d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level] [PID:${PID:-}] [%t] %logger : [%message]%n
            </pattern>
        </layout>
        <append>true</append>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>info</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    <!--WARN-->
    <appender name="WARN" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>${log.path}/warn.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/warn-%d{yyyy-MM-dd}-%i.log</fileNamePattern>
            <maxHistory>2</maxHistory>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>1MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <encoder charset="UTF-8">
            <pattern>WARN ==>> %d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level] [PID:${PID:-}] [%t] %logger : [%message]%n
            </pattern>
        </encoder>
        <append>true</append>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    <!--ERROR-->
    <appender name="ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>${log.path}/error.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/error-%d{yyyy-MM-dd}-%i.log</fileNamePattern>
            <maxHistory>12</maxHistory>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>1MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <encoder charset="UTF-8">
            <pattern>ERROR ==>> %d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level] [PID:${PID:-}] [%t] %logger : [%message]%n
            </pattern>
        </encoder>
        <append>true</append>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>error</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- TRACE < DEBUG < INFO < WARN < ERROR -->
    <!-- 设置日志输出级别：系统设置级别为：
        DEBUG（打印 DEBUG+INFO+WARN+ERROR 的信息）、
        INFO（打印 INFO+WARN+ERROR 的信息）、
        WARN（打印 WARN+ERROR 的信息）、
        ERROR（打印 ERROR 的信息）
-->
    <!--开发环境:打印控制台-->
    <springProfile name="dev">
        <logger name="net.sf.ehcache" level="INFO"/>
        <!-- MyBatis log configure -->
        <logger name="org.mybatis.spring" level="INFO"/>
        <logger name="com.apache.ibatis" level="INFO"/>
        <logger name="org.apache.ibatis" level="INFO"/>
        <logger name="org.apache.tomcat" level="INFO"/>
        <logger name="java.sql.Connection" level="DEBUG"/>
        <logger name="java.sql.Statement" level="DEBUG"/>
        <logger name="java.sql.PreparedStatement" level="DEBUG"/>
        <logger name="java.sql" level="DEBUG"/>
        <!--spring-->
        <logger name="org.springframework.boot" level="WARN"/>
        <logger name="org.springframework" level="WARN"/>
        <logger name="org.springframework.context" level="WARN"/>
        <logger name="org.springframework.beans" level="WARN"/>
        <!-- 减少部分debug日志 -->
        <logger name="druid.sql" level="INFO"/>
        <logger name="org.apache.shiro" level="INFO"/>
        <logger name="org.mybatis.spring" level="INFO"/>
        <logger name="org.apache.ibatis.io" level="INFO"/>
        <logger name="org.apache.velocity" level="INFO"/>
        <logger name="org.eclipse.jetty" level="INFO"/>
        <logger name="io.undertow" level="INFO"/>
        <logger name="org.thymeleaf" level="INFO"/>
        <logger name="springfox.documentation" level="INFO"/>
        <logger name="org.hibernate.validator" level="INFO"/>
        <logger name="com.baomidou.mybatisplus" level="INFO"/>
        <!-- cache INFO -->
        <logger name="net.sf.ehcache" level="INFO"/>
        <logger name="org.springframework.cache" level="INFO"/>
        <!-- 业务日志 -->
        <logger name="cn.jf.job" level="INFO"/>
        <!-- 日志输出级别 -->
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>
    <springProfile name="test">
        <logger name="cn.jf.job" level="INFO"/>
        <logger name="druid.sql" level="INFO"/>
        <logger name="net.sf.ehcache" level="INFO"/>
        <!-- 日志输出级别 -->
        <root level="INFO">
            <appender-ref ref="INFO"/>
            <appender-ref ref="WARN"/>
            <appender-ref ref="ERROR"/>
        </root>
    </springProfile>
    <springProfile name="prod">
        <!-- 日志输出级别 -->
        <root level="ERROR">
            <appender-ref ref="ERROR"/>
        </root>
    </springProfile>
</configuration>
```

使用配置

```yml
spring:
  profiles:
    #prod、dev、test
    active: dev
#level: 这里是我自己的项目路径
logging:
  level:
    com:
      kong19:
        codetools: debug
        
################生成日志记录：这里就OK啦############
logs
    debug.log
    error.log
    info.log
    warn.log       
```



# 2、log4j







# 3、log4j2