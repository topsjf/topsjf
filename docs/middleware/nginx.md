---
icon: nginx
title: Nginx
category: 中间件
date: 2020-03-10
tag:
- nginx
---

# nginx

## 常用指令

1) **重启**：./sbin/nginx -s quit && ./sbin/nginx
2) **加载配置**：./sbin/nginx -s reload
3) **退出**： ./sbin/nginx -s quit
4) **启动**：./sbin/nginx
5) **检查文件**：./sbin/nginx -t
6) **查看服务**：ps -ef | grep nginx

## 配置

### http配置

```yaml
http {
  #隐藏version
  server_tokens off;

  log_format  main  '$remote_addr - $remote_user [$time_iso8601] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

log_format  mylog '{"date_time": "$year-$month-$day $hour:$minutes:$seconds",'
                      '"host": "$server_addr",'
                      '"client_ip": "$remote_addr",'
                      '"client_id": "$remote_user",'
                      '"url": "$request_uri",'
                      '"request": "$request",'
                      '"referer": "$http_referer",'
                      '"request_time": "$request_time",'
                      '"status": "$status",'
                      '"size": "$body_bytes_sent",'
                      '"info": "$http_user_agent",'
                      '"x_forwarded_for": "$http_x_forwarded_for"'
                      ' }';

  keepalive_timeout  65;
  client_max_body_size 50m;
  #缓冲区代理缓冲用户端请求的最大字节数,可以理解为保存到本地再传给用户
  client_body_buffer_size 256k;
  client_header_timeout 3m;
  client_body_timeout 3m;
  send_timeout 3m;
  #代理配置参数
  #nginx 跟后端服务器连接超时时间(代理连接超时)
  proxy_connect_timeout 300s;
  #连接成功后，后端服务器响应时间(代理接收超时)
  proxy_read_timeout 300s;
  proxy_send_timeout 300s;
  #设置代理服务器（nginx）保存用户头信息的缓冲区大小
  proxy_buffer_size 64k;
  #proxy_buffers 缓冲区，网页平均在 32k 以下的话，这样设置
  proxy_buffers 4 32k;
  #高负荷下缓冲大小（proxy_buffers*2）
  proxy_busy_buffers_size 64k;
  #设定缓存文件夹大小，大于这个值，将从 upstream 服务器传递请求，而不缓冲到磁盘
  proxy_temp_file_write_size 64k;
  #不允许代理端主动关闭连接
  proxy_ignore_client_abort on;
  ## 可以放到具体的 location
  proxy_set_header Host $host;
  proxy_set_header X-Forwarder-For $remote_addr;

  include /etc/nginx/conf.d/*.conf;
}
```

### 日志+自定义格式

获取不到的值：以 - 代替

```yaml
http{
  ## $time_iso8601、$time_local
  log_format  main  '$remote_addr - $remote_user [$time_iso8601] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';
#172.17.0.1 - - [20/Jan/2022:03:05:54 +0000] "GET /codeutil/get/log HTTP/1.1" 200 19
#"-" "ApiPOST Runtime +https://www.apipost.cn" "-"
#172.17.0.1 - - [2022-01-20T04:21:16+00:00] "GET /codeutil/get/log HTTP/1.1" 200 19
#"-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0" "-"

log_format  mylog '{"date_time": "$year-$month-$day $hour:$minutes:$seconds",'
                      '"host": "$server_addr",'
                      '"client_ip": "$remote_addr",'
                      '"client_id": "$remote_user",'
                      '"url": "$request_uri",'
                      '"request": "$request",'
                      '"referer": "$http_referer",'
                      '"request_time": "$request_time",'
                      '"status": "$status",'
                      '"size": "$body_bytes_sent",'
                      '"info": "$http_user_agent",'
                      '"x_forwarded_for": "$http_x_forwarded_for"'
                      ' }';
#{"date_time": "2022-01-20 06:25:05","host": "172.17.0.9","client_ip": "172.17.0.1","client_id": "-","url":"/codeutil/get/log",
#"request": "GET /codeutil/get/log HTTP/1.1","referer": "-","request_time": "0.004","status": "200","size": "19",
#"info": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0","x_forwarded_for": "-"}

  server{
      ### 这里仅仅是当前配置
      include /etc/nginx/conf.d/time.txt;
      #把if(){}抽离到time.txt
      #if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})") {
      #  set $year $1;
      #  set $month $2;
      #  set $day $3;
      #  set $hour $4;
      #  set $minutes $5;
      #  set $seconds $6;
      #}
      access_log  /var/log/nginx/my.log  mylog; # buffer=32k;
  }

}

```

| 属性                                 | 示例                                                                                                                             | 说明                                                                                                                             |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| $server_addr                       | 172.17.0.9                                                                                                                     | 服务端IP地址                                                                                                                        |
| $remote_addr,$http_x_forwarded_for | 172.17.0.1,"-"                                                                                                                 | 客户端IP地址                                                                                                                        |
| $remote_user                       | -                                                                                                                              | 客户端用户                                                                                                                          |
| $time_iso8601                      | 2022-01-20T03:25:07+00:00                                                                                                      | 时间                                                                                                                             |
| $time_local                        | 20/Jan/2022:03:05:54 +0000                                                                                                     | 时间                                                                                                                             |
| $request                           | "GET /codeutil/get/log HTTP/1.1"                                                                                               | 请求                                                                                                                             |
| $request_time                      | 12                                                                                                                             | 请求处理时间-秒                                                                                                                       |
| $status                            | 200                                                                                                                            | 状态                                                                                                                             |
| $body_bytes_sent                   | 19                                                                                                                             | 发送的正文字节                                                                                                                        |
| $http_referer                      | "-"                                                                                                                            | 记录从哪个页面链接访问过来的。<br/>场景：防盗链（某网站通过url引用了你的页面，当用户在浏览器上点击url时，<br/>http请求的头部中会通过referer头部，将该网站当前页面的url带上，<br/>告诉服务器本次请求是由这个页面发起的。） |
| $http_user_agent                   | "ApiPOST Runtime +https://www.apipost.cn"<br/>"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0" | 记录调用端、访问端浏览器相关信息                                                                                                               |

### https配置

```yaml
server {
  listen       443 ssl;
  server_name  www.xxx.cn;

  charset utf-8;
  root html;
  index index.html index.htm;

  ssl_certificate /etc/nginx/conf.d/cert/www.xxx.cn.pem;
  ssl_certificate_key /etc/nginx/conf.d/cert/www.xxx.cn.key;

  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  #表示使用的加密套件的类型。
  ssl_protocols TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。 TLSv1 TLSv1.1 TLSv1.2
  ssl_prefer_server_ciphers on;

  access_log  logs/https.www.xxx.log  mylog;

  #代理
  location / {
      proxy_pass https://www.xxx.cn/wwwvue/;
  }
  location ^~/wwwvue/ {
      alias   /data/xxxweb/wwwvue/;
      index	index.html index.htm;
      # vue解决刷新404问题
      try_files $uri $uri/ /$1/index.html last;
  }
  location @rewrites {
      rewrite ^/(wwwvue)/(.+)$ /$1/index.html last;
  }
  # www 权限管理系统：后端
  location /www/ {
      proxy_pass https://xxx_server/www/;
  }
  error_page  400 404              /40x.html;
  location = /40x.html {
      root   html;
  }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
}
```

### 代理配置

### 负载均衡配置

| server标签           | 参数说明                                                                                                                                                                                                |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| server 10.0.0.6:80 | 负载均衡后面的RS配置，可以是IP或域名，如果不写端口，默认是80端口。高并发场景下，IP可换成域名，通过DNS做负载均衡。                                                                                                                                      |
| weight=1           | 代表服务器的权重，默认值是1。权重数字越大表示接受的请求比例越大。                                                                                                                                                                   |
| max_fails=1        | Nginx尝试连接后端主机失败的次数，这个数值是配置proxy_next_upstream、fastcgi_next_upstream和memcached_next_upstream三个参数来使用的，<br/>当Nginx接受后端服务器返回这三个参数定义的状态码时，会将这个请求转发给正常工作的后端服务器，例如404、502、503。max_fails的默认值是1；企业场景：建议2-3次。 |
| backup             | 热备配置（RS）节点的高可用，当期面激活的RS都失败后会自动启用热备RS。这标志着这个服务器作为备份服务器，若主服务器全部宕机了，就会向他转发请求；<br/>注意：当负载调度算法为ip_hash时，后端服务器在负载均衡调度中的状态不能是weight和backup。                                                                |
| fail_timeout=10s   | 在max_fails定义的失败次数后，距离下次检查的间隔时间，默认是10s；如果max_fails是5，他就检测5次。如果5次都是502，那么他就会根据fail_timeout的值，<br/>等待10s再去检查，还是只检查一次，如果持续502，在不重新加载nginx配置的情况下，每隔10s都只检测一次。常规业务：2-3秒比较合理。                              |
| down               | 这标识着服务器永远不可用，这个参数可配合ip_hash使用                                                                                                                                                                       |

```yaml
upstream www_server_pool {
    server 10.0.0.7 weight=5;
    server 10.0.0.16 weight=10;
}
```

```yaml
upstream www_server {
    server 10.0.0.5;   #这一行标签和下一行是等价的
    server 10.0.0.6：80 weight=1 max_fails=1 fails_timeout=10s; #此行标签为默认配置
    server 10.0.0.7：80 weight=1 max_fails=2  fails_timeout=10s backup;
    server 10.0.0.8：80 weight=1 max_fails=3 fails_timeout=20s backup;
}
```

```yaml
upstream www_server_pool {
    server www.test.com:8080;
    server www.example.com weight=10;
}
```

#### 常规配置
```yaml
upstream www_server_pools {
    server  172.16.1.16:80 ;
    server  172.16.1.17:80 ;
}
 server {
    listen 80;
    server_name www_server_pools;
        location / {
            access_log logs/access.log main;
            proxy_pass http://www_server_pools;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_redirect default;
            proxy_buffer_size 512k;
            proxy_buffers 6 512k;
            proxy_busy_buffers_size 512k;
            proxy_temp_file_write_size 512k;
            client_max_body_size 100m;
        }
}
```

## 部署项目

### 静态资源

```yaml
server {
  listen       80;
  server_name  static.xxx.cn;
  location ~ /(css|data|fronts|img|js|common)/ {
      root   /opt/static; #静态资源位置
  }

  location ~* \.(gif|jpg|png|swf|flv)$ {
      # 白名单防盗链
      valid_referers none blocked 192.168.1.99 www.test.com  *.jfedu.net;
      root /usr/share/nginx/html;
      if ($invalid_referer) {
        return 403;
      }
  }
}
```

### 部署 vue

```yaml
server {
  listen       80;
  server_name www.xxx.cn;
  charset utf-8;
  access_log  /var/log/nginx/xxx.log  mylog;
  ##########################################################
  location / {
      proxy_pass http://www.xxx.cn/demovue/;
  }
  location ^~/demovue/ {
      alias   /data/web/demovue/;
      index	index.html index.htm;
      try_files $uri $uri/ /$1/index.html last;
  }
  location @rewrites {
      rewrite ^/(demovue)/(.+)$ /$1/index.html last;
  }
  ##########################或者如下################################
  location / {
      root   /usr/share/nginx/html/demovue/;
      index	index.html index.htm;
      # 解决vue去掉#部署刷新报错
      try_files $uri $uri/ /index.html;
  }
}
```

### 代理java服务

```yaml
# 代理后台管理01
    server {
      listen       80;
      server_name  www.xxx.cn;
      charset utf-8;
      access_log  logs/host.access.log  mylog;

      location /demo/ {
          proxy_pass http://192.168.3.2:3655/;
      }
    }
  ##########################或者如下################################
    # 代理后台管理02
    # 必须指定 [ 主机IP , 服务器IP ] 真实IP（错误：127.0.0.1）
    upstream demo_server {
        server 192.168.101.4:51320;
    }
    upstream demo_server_dev {
        server 192.168.101.4:51321;
    }
    upstream demo_server_test {
        server 192.168.101.4:51322;
    }
    
    server {
        listen       80;
        server_name  www.xxx.cn;
        charset utf-8;
        access_log logs/host.access.log  mylog;
    
        location /demo/ {
          ##http://代理列表/自己的后台名称/;
          proxy_pass http://demo_server/demo/;
        }
        location /javacode-template/ {
          proxy_pass http://javacode_util_server/javacode-template/;
        }
        location /javacode-template-dev/ {
          proxy_pass http://javacode_util_dev_server/javacode-template-dev/;
        }
        location /javacode-template-test/ {
          proxy_pass http://javacode_util_test_server/javacode-template-test/;
        }
    }
```

## 完整真实案例

nginx\conf\nginx.conf

```yaml
#user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
	server_tokens off;
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
	
    ## $time_iso8601、$time_local
	log_format  main  '$remote_addr - $remote_user [$time_iso8601] "$request" '
					  '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    log_format  mylog '{"date_time": "$year-$month-$day $hour:$minutes:$seconds",'
                      '"host": "$server_addr",'
                      '"client_ip": "$remote_addr",'
                      '"client_id": "$remote_user",'
                      '"url": "$request_uri",'
                      '"request": "$request",'
                      '"referer": "$http_referer",'
                      '"request_time": "$request_time",'
                      '"status": "$status",'
                      '"size": "$body_bytes_sent",'
                      '"info": "$http_user_agent",'
                      '"x_forwarded_for": "$http_x_forwarded_for"'
                      '}';

	
    sendfile        on;
	#tcp_nopush     on;
	keepalive_timeout  65;

	client_max_body_size 50m;
	client_body_buffer_size 256k;
	client_header_timeout 3m;
	client_body_timeout 3m;
	proxy_connect_timeout 300s;
	proxy_read_timeout 300s;
	proxy_send_timeout 300s;
	proxy_buffer_size 64k;
	proxy_buffers 4 32k;
	proxy_busy_buffers_size 64k;
	proxy_temp_file_write_size 64k;
	proxy_ignore_client_abort on;
	proxy_set_header Host $host;
	proxy_set_header X-Forwarder-For $remote_addr;

    gzip  on;
    include /etc/nginx/conf.d/*.conf;
}
```

nginx\conf.d\javacode.conf

```yaml
upstream javacode_util_server { 
    server 192.168.101.4:51320;
}
upstream javacode_util_dev_server {
    server 192.168.101.4:51321;
}
upstream javacode_util_test_server {
    server 192.168.101.4:51322;
}
upstream prod_api_server {
    server 192.168.101.4:8080;
}

server {
    listen       80;
    server_name  www.javacode.cn;
    charset utf-8;
    include /etc/nginx/conf.d/time.txt;
    access_log  /var/log/nginx/javacode.log  mylog;	# buffer=32k;

    location / {
        root   /usr/share/nginx/html/dist/;
        index	index.html index.htm;
        # 解决vue去掉#部署刷新报错
        try_files $uri $uri/ /index.html;
    }
    location /prod-api/ {
        proxy_pass http://prod_api_server/;
    }

    location /javacode-util/ {
        proxy_pass http://javacode_util_server/javacode-util/;
    }
    location /javacode-util-dev/ {
        proxy_pass http://javacode_util_dev_server/javacode-util-dev/;
    }
    location /javacode-util-test/ {
        proxy_pass http://javacode_util_test_server/javacode-util-test/;
    }

    #error_page  404              /404.html;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

nginx\conf.d\time.txt

```yaml
if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})") {
	set $year $1;
	set $month $2;
	set $day $3;
	set $hour $4;
	set $minutes $5;
	set $seconds $6;
}
```

nginx\html

- 50x.html


```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <title>50x</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
</head>
<body>
<h1>An error occurred.</h1>
<h3>500服务器异常!!</h3>
</body>
</html>
```

- 404.html

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <title>404</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
</head>
<body>
<h1>An error occurred.</h1>
<h3>404，你的资源飞了！！</h3>
</body>
</html>
```

- index.html

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <title>ok</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
</head>
<body>
<h1>OK</h1>
<h3>加载OK-666666666</h3>
</body>
</html>
```
