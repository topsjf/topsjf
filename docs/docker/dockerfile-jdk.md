---
icon: /icons/docker/docker_16x16.png
title: DockerFile基于jdk
category: Docker
date: 2020-01-20
tag:
- docker
- dockerfile
---

# DockerFile 配置基于jdk

```shell
# 添加JAVA启动的必要镜像，推荐使用jre版本
# openjdk:8-jre(295.16 MB)、openjdk:11-jre(328.63 MB)、openjdk:17-jdk|oracle(492.57 MB)
FROM registry.cn-chengdu.aliyuncs.com/jinfang/openjdk:17-jdk

#声明镜像维护者信息
MAINTAINER jinfang
#镜像描述元信息
LABEL name="model-web"

#添加JVM参数
ENV JAVA_OPTS="-server -Xmx1024M -Xms1024M -Xmn750M -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=512M -XX:GCTimeRatio=19 -XX:+ClassUnloading"

# 项目打包后的jar包名
ENV JAR_FILE=spring-boot-model-web-1.0.0.jar

# 项目根目录
ENV ROOT_DIR=/data/web
#动态加载配置文件
ENV ROOT_DIR_CONFIG=/data/web/config

RUN mkdir -p $ROOT_DIR
RUN mkdir -p $ROOT_DIR_CONFIG

#在容器运行时声明一个 volume, 在容器中创建目录
VOLUME $ROOT_DIR

#设置终端默认登录进来的工作目录
WORKDIR $ROOT_DIR

# java项目的jar包
COPY ./spring-boot-model-web/target/$JAR_FILE $ROOT_DIR
COPY ./spring-boot-model-web/src/main/resources $ROOT_DIR_CONFIG

# Create a script 由于ENTRYPOINT无法使用dockerfile中定义的环境变量
# 所以需要按照指定的环境变量生成运行脚本，并输出到文件，之后ENTRYPOINT运行脚本文件就行了
#  --spring.config.location=${ROOT_DIR_CONFIG}/application-${PROFILES}.yml
#  --spring.profiles.active=$PROFILES
RUN echo "java -Djava.security.egd=file:/dev/./urandom ${JAVA_OPTS} -jar $ROOT_DIR/$JAR_FILE" > /run_module.sh

# 当前容器对外暴露出的端口
EXPOSE 51155
EXPOSE 51156
EXPOSE 51157

# 指定容器启动时要运行的命令
#ENTRYPOINT ["java","-jar","/spring-boot-model-web-1.0.0.jar","--spring.profiles.active=prod"]
ENTRYPOINT ["/bin/bash", "/run_module.sh"]

```

