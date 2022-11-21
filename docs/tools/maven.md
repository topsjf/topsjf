---
icon: edit
title: maven管理
category: 开发工具
date: 2020-01-01
tag:
- maven
---

## 安装与配置
Windows、Linux 配置 Maven3.6、gradle 阿里下载源

- [Maven3.X 下载地址](https://maven.apache.org/download.cgi)
- [maven nginx导航资源](https://mirrors.bfsu.edu.cn/apache/maven/)

pom依赖查询地址：
- [maven 官网 仓库](https://mvnrepository.com/)
- [maven 阿里云 仓库](https://developer.aliyun.com/mvn/search)


## win10

### 自定义本地仓库存储地址

1、打开配置文件：apache-maven-3.6.3 -> conf -> settings.xml

```xml
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <!-- 自定义本地仓库存储地址 -->
 <localRepository>D:\GZRJ\apache-maven-3.6.3\repositorys</localRepository>
```


### 配置阿里仓库下载源

[maven | gradle  阿里云官网配置指南](https://developer.aliyun.com/mvn/guide)

```xml
   <mirrors>
 <!-- 设置下载源：aliyun -->
 <!-- 设置下载源：Nexus aliyun 老版本 -->
  <!--    <mirror>
		<id>nexus-aliyun</id>
		<mirrorOf>*</mirrorOf>
		<name>Nexus aliyun</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public</url>
	</mirror>-->
 <!-- 设置下载源：aliyun 新版本-->
	<mirror>
		  <id>aliyunmaven</id>
		  <mirrorOf>*</mirrorOf>
		  <name>阿里云公共仓库</name>
		  <url>https://maven.aliyun.com/repository/public</url>
	</mirror>
	<!-- 设置下载源：华为 -->
	<mirror>
	    <id>huaweicloud</id>
	    <mirrorOf>*</mirrorOf>
	    <url>https://repo.huaweicloud.com/repository/maven/</url>
	</mirror> 
  </mirrors>
<!-- ##################jdk###############-->
<!-- <profiles>
		<profile>
            <id>jdk-1.8</id>
            <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>1.8</jdk>
            </activation>
            <properties>
                <maven.compiler.source>1.8</maven.compiler.gource>
                <maven.compiler.target>1.8</maven.compiler.target>
                <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
            </properties>
        </profile>
</profiles>-->
```

还有一步：环境配置，在里省略

## linux环境

### 环境配置sudo vim /etc/profile

```bash
#jdk环境
export JAVA_HOME=/data/rj/jdk
export M2_HOME=/data/rj/maven363
export CLASSPATH=.:${JAVA_HOME}/jre/lib/rt.jar:${JAVA_HOME}/lib/dt.jar:${JAVA_HOME}/lib/tools.jar
export PATH=$PATH:${JAVA_HOME}/bin:${JAVA_HOME}/jre/bin:${M2_HOME}/bin
```

### 测试

```bash
root@kong:/# source /etc/profile
root@kong:/# mvn -v
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /data/rj/maven363
Java version: 1.8.0_261, vendor: Oracle Corporation, runtime: /data/rj/jdk/jre
Default locale: zh_CN, platform encoding: UTF-8
OS name: "linux", version: "5.4.50-amd64-desktop", arch: "amd64", family: "unix"
```



## 常用命令

清空文件：mvn clean

编译项目：mvn compile

打包jar：mvn package

打包并部署到本地maven目录里：mvn install



`.jar.original` 结尾文件

> .jar.original 是普通 jar 包，不包含依赖
> 
> .jar 是可执行 jar 包，包含了 pom 中的所有依赖，可以直接用 `java -jar` 命令执行
> 
> 如果是部署，就用 .jar
> 
> 如果是给别的项目用，就要给 `.jar.original` 这个包


