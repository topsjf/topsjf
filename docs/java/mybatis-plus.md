---
icon: edit
title: 整合mybatis-plus
category: mybatis
date: 2020-01-01
tag:
- mybatis-plus
---

# 整合mybatis-plus

## 1、commen引入依赖

```xml
		<dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.2.0</version>
            <exclusions>
                <exclusion>
                    <groupId>com.baomidou</groupId>
                    <artifactId>mybatis-plus-generator</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <!--    导入mysql驱动    -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.17</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.13</version>
        </dependency>
```

## 2、数据源

```bash
##### application.yml
    server:
      port: 8100

    spring:
      # 环境 dev|test|prod
      profiles:
        active: dev
    #mybatis-plus
    mybatis-plus:
      mapper-locations: classpath:/mapper/**/*.xml
      #实体扫描，多个package用逗号或者分号分隔
      typeAliasesPackage: com.kong.yumall.product.entity
      global-config:
        #数据库相关配置
        db-config:
          #主键类型  AUTO:"数据库ID自增", INPUT:"用户输入ID", ID_WORKER:"全局唯一ID (数字类型唯一ID)", UUID:"全局唯一ID UUID";
          id-type: AUTO
          logic-delete-value: -1
          logic-not-delete-value: 0
        banner: false
 ##### application-dev.yml
 	spring:
      datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        druid:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/yumall_pms?useUnicode=true&characterEncoding=UTF-8&useSSL=false
          username: root
          password: root
          initial-size: 10
          max-active: 100
          min-idle: 10
          max-wait: 60000
          pool-prepared-statements: true
          max-pool-prepared-statement-per-connection-size: 20
          time-between-eviction-runs-millis: 60000
          min-evictable-idle-time-millis: 300000
```

## 3、测试id自增

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoTest {

    @Autowired
    private BrandService brandService;

    @Test
    public void getAotuId(){
        BrandEntity brandEntity = new BrandEntity();
        brandEntity.setBrandId(1L);
        brandEntity.setLogo("123456");
        brandService.updateById(brandEntity);
        System.out.println("保存OK");
    }
/**
         * String eq： =
         * int ge: >=
         * int gt: >
         * int le: <=
         * int lt: <
         */
//        brandService.list(new QueryWrapper<BrandEntity>().gt("brand_id", 0));
//        brandService.list(new QueryWrapper<BrandEntity>().eq("name", "华为pro"));
        brandService.list(new QueryWrapper<BrandEntity>().lt("brand_id", 2))
            .forEach((ins) -> {
            System.out.println(ins.toString());
        });
```

## 4、启动controller测试：coupon

http://localhost:8400/coupon/coupon/info/1

```
{"msg":"success","code":0,"coupon":{"id":1,"couponType":null,"couponImg":"images-images-images-imagesimages","couponName":null,"num":null,"amount":null,"perLimit":null,"minPoint":null,"startTime":null,"endTime":null,"useType":null,"note":null,"publishCount":null,"useCount":null,"receiveCount":null,"enableStartTime":null,"enableEndTime":null,"code":null,"memberLevel":null,"publish":null}}
```

