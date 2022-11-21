---
icon: /icons/docker/docker_16x16.png
title: DockerFile基于centos7并设置中文UTF-8字符集
category: Docker
date: 2020-01-20
tag:
- docker
- dockerfile
---

# DockerFile 配置基于centos7 安装运行jdk、Java项目jar包、并设置中文UTF-8字符集

## dockerfile脚本

```shell
FROM registry.cn-chengdu.aliyuncs.com/jinfang/centos:7.9

MAINTAINER jinfang
LABEL name="demo"

#添加JVM参数
ENV JAVA_OPTS="-server -Xmx1024M -Xms1024M -Xmn750M -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=512M -XX:GCTimeRatio=19 -XX:+ClassUnloading"

#项目打包后的jar包名
ENV JAR_FILE=spring-boot-model-web-1.0.0.jar
ENV JDK_FILE=jdk-17.0.3_linux-x64_bin.tar.gz

#项目根目录
ENV ROOT_DIR=/data/web
#动态加载配置文件
ENV ROOT_DIR_CONFIG=/data/web/config
#jdk目录
ENV JAVA_DIR=/usr/local/java

RUN mkdir -p $JAVA_DIR && mkdir -p $ROOT_DIR && mkdir -p $ROOT_DIR_CONFIG

#在容器运行时声明一个 volume, 在容器中创建目录
VOLUME $ROOT_DIR
VOLUME $JAVA_DIR

#设置终端默认登录进来的工作目录
WORKDIR $ROOT_DIR

#配置中文字符 默认：LANG="en_US.UTF-8"
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
	&& yum -y install kde-l10n-Chinese \
	&& yum -y reinstall glibc-common \
	&& localedef -c -f UTF-8 -i zh_CN zh_CN.UTF-8 \
	&& echo 'LANG="zh_CN.UTF-8"' > /etc/locale.conf \
	&& source /etc/locale.conf \
	&& yum clean all
ENV LANG=zh_CN.UTF-8 \
    LC_ALL=zh_CN.UTF-8

#配置jdk
COPY ./$JDK_FILE $JAVA_DIR
# RUN 构建镜像时需要运行的Linux命令、CMD #指定容器启动时要运行的命令
RUN tar -zxvf $JAVA_DIR/$JDK_FILE -C $JAVA_DIR && rm -rf $JAVA_DIR/$JDK_FILE
#设置环境变量
ENV JAVA_HOME=$JAVA_DIR/jdk-17.0.3
ENV CLASSPATH=.:$JAVA_HOME/lib:$CLASSPATH
ENV PATH=$PATH:$JAVA_HOME/bin
# RUN source /etc/profile && java -version
CMD ["source","/etc/profile","java","-version"]

#java项目的jar包
COPY ./target/$JAR_FILE $ROOT_DIR
COPY ./src/main/resources/ $ROOT_DIR_CONFIG

RUN echo "java -Djava.security.egd=file:/dev/./urandom ${JAVA_OPTS} -jar $ROOT_DIR/$JAR_FILE" > /run_module.sh

#当前容器对外暴露出的端口
EXPOSE 51155
EXPOSE 51156
EXPOSE 51157

#指定容器启动时要运行的命令
#ENTRYPOINT ["java","-jar","/spring-boot-model-web-1.0.0.jar","--spring.profiles.active=prod"]
ENTRYPOINT ["/bin/bash", "/run_module.sh"]
#["java","-Djava.security.egd=file:/dev/./urandom","-jar","/home/javacode.jar"]

```

```shell
docker build -f DockerFileCentos7 -t model-web:1.2.0 .
docker run -p 51155:51155 -p 51156:51156 -p 51157:51157 --name web --restart=always -d model-web:1.2.0
docker run -p 51155:51155 -p 51156:51156 -p 51157:51157 --name web -v E:\code\idea\spring-boot-model\config:/data/web/config -d  model-web:1.2.0
```


