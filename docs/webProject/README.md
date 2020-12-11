## Linux基础命令使用
在服务其使用之前，我们需要了解一下Linux的基础使用，才能愉快地玩耍

### SSH
有了服务器，如何在本地登录登陆是一个开始

```shell
ssh root@服务器ip
```

:::tip
每次都输入密码很是繁琐，所以我们可以配置本地免密登陆
:::

```shell
# 生成rsa秘钥，一路回车（已有rsa秘钥的请跳过此步骤）
ssh-keygen -t rsa

# 找到刚才生成的秘钥
cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAA---------中间部分生路--------ji4lr xiaofengge@xiaofengge.local

# 登录云服务器，找到秘钥文件，将本地秘钥拷贝到云服务器即可
vim ~/.ssh/authorized_keys

# 再次登录云服务器，会发现不用输入密码
ssh root@服务器ip

# 配置别名
vim ~/.ssh/config

$  Host 126 # 126就是别名，我们可以用ssh 126 登录我们的服务器
$  User root # 用户名
$  Port 22 # 端口号
$  HostName 47.116.27.64 # 云服务器IP
$  IdentityFile ~/.ssh/id_rsa # 秘钥位置
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| ssh    | 登陆的协议  |
| root     | 用户名      |
| 服务器ip | 服务器的地址      |

### uname
可显示电脑以及操作系统的相关信息

```shell
uname [-amnrsv][--help][--version]
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| -a或--all    | 　显示全部的信息。  |
| -m或--machine     | 　显示电脑类型。      |
| -n或-nodename | 　显示在网络上的主机名称。      |
| -r或--release | 　显示操作系统的发行编号。      |
| -s或--sysname |   显示操作系统名称。      |
| -v |   　显示操作系统的版本。      |
| --help |   　显示帮助。      |
| --version |   　显示版本信息。      |


### ls
查看当前目录下包含的内容

```shell
ls [-alrtAFR] [name...]
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| -a    | 显示所有文件及目录 (ls内定将文件名或目录名称开头为"."的视为隐藏档，不会列出)  |
| -l     | 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出      |
| -r | 　显示在网络上的主机名称。      |

### cd
跳入其他的目录

```shell
cd [dirName]

# 返回上层目录
cd ..

# 返回根目录
cd
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| dirName    | 要切换的目标目录  |

### mkdir
用于建立名称为 dirName 之子目录

```shell
mkdir [-p] dirName
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| dirName    | 创建的目录名  |
| -p    | 确保目录名称存在，不存在的就建一个  |

### vim
使用vim打开或创建一个文档

```shell
vim path
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| path    | 文件路径  |

### sudo
以系统管理者的身份执行指令，也就是说，经由 sudo 所执行的指令就好像是 root 亲自执行

```shell
sudo $shell
```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| $shell    | 执行的命令  |

### scp(重点)

**什么是scp**
- secure copy
- 用于在Linux下进行远程拷贝文件，scp传输是加密的
- 需要输入密码

**什么是scp**
- 远程服务器既不需要配置ftp服务器
- 不需要开启web服务器
- 也不需要开启共享

```shell
# 上传文件到远程服务器
scp -r 本地需要上传的文件的路径 root@服务器ip:服务器文件路径

# 下载远程服务器文件到本地
scp -r root@服务器ip:服务器文件路径 本地文件路径
```

:::tip
scp上传文件到服务器是在我们本地电脑运行命令，不是登录服务器
:::

### rm
删除目录或者文件

```shell

# 删除文件
rm -f path

# 删除文件夹
rm -rf path

```

**参数**
| 参数        | 含义           |
| ------------- |:-------------:|
| path    | 文件路径  |

## Pm2
- 日志管理：应用程序日志保存在服务器的硬盘中~/.pm2/logs/

- 负载均衡：PM2可以通过创建共享同一服务器端口的多个子进程来扩展您的应用程序。这样做还允许您以零秒停机时间重新启动应用程序。

- 终端监控：可以在终端中监控您的应用程序并检查应用程序运行状况（CPU使用率，使用的内存，请求/分钟等）。

- SSH部署：自动部署，避免逐个在所有服务器中进行ssh。

- 静态服务：支持静态服务器功能

- 多平台支持：适用于Linux（稳定）和macOS（稳定）和Windows（稳定）

### pm2安装（全局）
```shell
# npm安装
npm install pm2 -g
# mac 系统：添加sudo

# yarn安装
yarn global add pm2
```

### 启动服务
```shell
pm2 start app.js                # 启动app.js应用
pm2 start app.js --name demo    # 启动应用并设置name
pm2 start app.sh                # 脚本启动
```

### 监听服务
```shell
pm2 start app.js --watch    # 当文件发生变化，自动重启
```

### 查看启动列表
```shell
pm2 list
```

### 日志查看
```shell
pm2 logs            # 查看所有应用日志
pm2 logs [Name]     # 根据指定应用名查看应用日志
pm2 logs [ID]       # 根据指定应用ID查看应用日志
```

### 停止服务
```shell
pm2 stop all               # 停止所有应用
pm2 stop [AppName]         # 根据应用名停止指定应用
pm2 stop [ID]              # 根据应用id停止指定应用
```

### 重启应用
```shell
pm2 restart app.js        # 重启app.js进程
pm2 restart all           # 重启所有进程
```

## Nginx
nginx (engine x) 是一个高性能的HTTP和反向代理服务，也是一个IMAP/POP3/SMTP服务

### 安装依赖
```shell
yum -y install gcc-c++  
yum -y install pcre pcre-devel  
yum -y install zlib zlib-devel  
yum -y install openssl openssl--devel
```

### 下载
```shell
wget -c https://nginx.org/download/nginx-1.14.0.tar.gz
```

### 解压
```shell
tar -zxvf nginx-1.14.0.tar.gz
cd nginx-1.14.0
```

### 使用默认配置
```shell
./configure
```

### 编译安装
```shell
make
make install
```

### 找到nginx路径
```shell
whereis nginx
# /usr/local/nginx
```

### 启动
```shell
cd /usr/local/nginx/sbin/
./nginx :启动
./nginx -s stop # 此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程
./nginx -s quit # 此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s reloa # 重启
```

### 重启nginx
```shell
cd /usr/local/nginx/sbin/
./nginx -s quit
./nginx
```

:::tip
此时，nginx安装启动完毕，我们可以通过服务器IP访问我们的网站了！！！
需要注意的一点是，nginx默认部署在80端口，服务器一定要注意开放80端口
:::


## 服务端部署前端服务
上面我们已经学到了linux的基本使用和Nginx的安装配置，下面我们开始部署自己的前端服务。首先我们以CentOS7+服务器为例，先看一下默认网站目录

```shell
# 这个html目录就是默认nginx网站存放目录
/usr/local/nginx/html
```

### 本地文件上传至服务器
首先我们需要把我们的前端项目进行build构建，我们需要把构建后的dist文件部署到服务器指定位置上

```shell
# 本地shell
scp -r xxx/xxx/xxx/dist root@服务器ip: /usr/local/nginx/html
```

:::tip
scp上传文件到服务器是在我们本地电脑运行命令，不是登录服务器!!!
:::

### 打开配置文件

```shell
vim /usr/local/nginx/conf/nginx.conf
```

文件内参数
| 参数        | 含义           |
| ------------- |:-------------:|
| main    | 用于进行nginx全局信息的配置  |
| events    | 用于nginx工作模式的配置  |
| http    | 用于进行http协议信息的一些配置  |
| http->server    | 用于进行服务器访问信息的配置  |
| http->location    | 用于进行访问路由的配置  |
| upstream    | 用于进行负载均衡的配置  |

### 进行文件配置

```shell
# 这里我时候用的是root用户，正常情况下是不可取的
# 配置用户或者组，默认为nobody nobody
user  root;

# 允许许生成的进程数，默认为1
worker_processes  2;

# 制定日志路径，级别
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 指定nginx进程运行文件存放地址
#pid        logs/nginx.pid;


events {
    # 最大连接数，默认为512
    worker_connections  1024;
}


http {
    # 文件扩展名与文件类型映射表
    include       mime.types;
    # 默认文件类型，默认为text/plain
    default_type  application/octet-stream;

    # 日志服务的设置
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    # 允许sendfile方式传输文件，默认为off
    sendfile        on;
    # 让nginx在一个数据包中发送所有的头文件，而不是一个一个单独发
    #tcp_nopush     on;

    # 连接超时时间
    keepalive_timeout  65;
    # 开启gzip压缩
    gzip  on;

    # 服务1
    server {
        # 监听的端口
        listen       80;
        # 用于配置路由访问信息
        location / {
           # 指定ip地址或者域名，多个配置之间用空格分隔
           server_name  xxx.xxx.com;
           # 网站存储地址
           root html/dist;
           # 用户访问web网站时的全局首页
           index index.html index.htm;
        }
    }
}
```

### 重启
```shell
cd /usr/local/nginx/sbin/
./nginx -s reload
```

## 服务端部署node服务
这里我们主要实战一下pm2+nginx反向代理，部署后端服务

### 本地文件上传至服务器
首先我们需要把我们的前端项目进行build构建，我们需要把构建后的dist文件部署到服务器指定位置上

```shell
# 本地shell
scp -r /xxx/serve root@服务器ip: /usr/local/nginx/html
```

:::tip
scp上传文件到服务器是在我们本地电脑运行命令，不是登录服务器!!!
:::

### 监听node服务
```shell
pm2 start xxx/serve/app.js --watch    # 当文件发生变化，自动重启
```

:::tip
app.js就是我们写的接口，记得在服务器上开启启动的相应端口
:::

### Nginx反向代理node服务

```shell
# 这里我时候用的是root用户，正常情况下是不可取的
# 配置用户或者组，默认为nobody nobody
user  root;

# 允许许生成的进程数，默认为1
worker_processes  2;

# 制定日志路径，级别
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 指定nginx进程运行文件存放地址
#pid        logs/nginx.pid;


events {
    # 最大连接数，默认为512
    worker_connections  1024;
}


http {
    # 文件扩展名与文件类型映射表
    include       mime.types;
    # 默认文件类型，默认为text/plain
    default_type  application/octet-stream;

    # 日志服务的设置
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    # 允许sendfile方式传输文件，默认为off
    sendfile        on;
    # 让nginx在一个数据包中发送所有的头文件，而不是一个一个单独发
    #tcp_nopush     on;

    # 连接超时时间
    keepalive_timeout  65;
    # 开启gzip压缩
    gzip  on;

    # 服务1
    server {
        # 监听的端口
        listen       80;
        # 用于配置路由访问信息
        location / {
           # 指定ip地址或者域名，多个配置之间用空格分隔
           server_name  xxx.xxx.com;
           # 网站存储地址
           root html/dist;
           # 用户访问web网站时的全局首页
           index index.html index.htm;
        }

        # 将/api/反向代理至当前端口
        location /api/ {
           # 代理到的服务器端口
           proxy_pass http://xxx.xxx.xx:8080/;
           proxy_redirect off;
        }
    }
}
```

:::tip
serve的js启动服务器的服务端口，就是nginx需要配置的反向代理端口，在前端请求时只需要使用/api/xxxx就可以进行代理请求，实现跨域。vue-cli中的proxy也是这个原理
:::

## Docker使用
Docker是一款以容器虚拟化技术为基础的软件。为程序跨平台兼容而生，将虚拟化应用于资源管理，是一个由 Go 语言实现的容器引擎。

:::tip
  Docker是围绕镜像 ( Image )、容器 ( Container )、网络 ( Network )、数据卷 ( Volume )所展开。我们所有的操作均以CentOS操作系统为例
:::

### 安装docker
首先进行 Docker 的安装

```shell
$ sudo yum install yum-utils device-mapper-persistent-data lvm2
$
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum install docker-ce
$
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

### 上手使用
在安装 Docker 完成之后，我们需要先启动 docker daemon 使其能够为我们提供 Docker 服务，这样我们才能正常使用 Docker。

```shell
$ sudo systemctl start docker
```

- **docker version**

在 Docker 服务启动之后，我们先来尝试一个最简单的查看 Docker 版本的命令：**docker version**。

```shell
$ sudo docker version
Client:
 Version:           18.06.1-ce
 API version:       1.38
 Go version:        go1.10.3
 Git commit:        e68fc7a
 Built:             Tue Aug 21 17:23:03 2018
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.06.1-ce
  API version:      1.38 (minimum version 1.12)
  Go version:       go1.10.3
  Git commit:       e68fc7a
  Built:            Tue Aug 21 17:25:29 2018
  OS/Arch:          linux/amd64
  Experimental:     false
```

- **docker info**

如果想要了解 Docker Engine 更多相关的信息，我们还可以通过 **docker info** 这个命令。

```shell
$ sudo docker info
Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 18.06.0-ce
Storage Driver: overlay2
 Backing Filesystem: extfs
 Supports d_type: true
 Native Overlay Diff: true
Logging Driver: json-file
Cgroup Driver: cgroupfs
## ......
Live Restore Enabled: false
```

- **配置国内镜像源**

在 Linux 环境下，我们可以通过修改 /etc/docker/daemon.json ( 如果文件不存在，你可以直接创建它 ) 这个 Docker 服务的配置文件达到效果。

:::tip
  注意镜像是以https://开头
:::

```shell
{
    "registry-mirrors": [
        "https://registry.docker-cn.com"
    ]
}
```

在修改之后，别忘了重新启动 docker daemon 来让配置生效哟：

```
$ sudo systemctl restart docker
```

要验证我们配置的镜像源是否生效，我们可以通过 **docker info** 来查阅当前注册的镜像源列表。

```shell
$ sudo docker info
## ......
Registry Mirrors:
 https://registry.docker-cn.com/
## ......
```

- **查看镜像**

如果要查看当前连接的 docker daemon 中存放和管理了哪些镜像，我们可以使用 **docker images** 这个命令 ( Linux、macOS 还是 Windows 上都是一致的 )。

```shell
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
php                 7-fpm               f214b5c48a25        9 days ago          368MB
redis               3.2                 2fef532eadb3        11 days ago         76MB
redis               4.0                 e1a73233e3be        11 days ago         83.4MB
cogset/cron         latest              c01d5ac6fc8a        15 months ago       125MB
```

- **获取镜像**

要拉取镜像，我们可以使用 **docker pull** 命令，命令的参数就是我们之前所提到的镜像仓库名。

```shell
$ sudo docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
124c757242f8: Downloading [===============================================>   ]  30.19MB/31.76MB
9d866f8bde2a: Download complete 
fa3f2f277e67: Download complete 
398d32b153e8: Download complete 
afde35469481: Download complete 
```

当然，我们也能够使用完整的镜像命名来拉取镜像。

```shell
$ sudo docker pull nginx
1.13.6.2-alpine: Pulling from openresty/openresty
ff3a5c916c92: Pull complete 
ede0a2a1012b: Pull complete 
0e0a11843023: Pull complete 
246b2c6f4992: Pull complete 
Digest: sha256:23ff32a1e7d5a10824ab44b24a0daf86c2df1426defe8b162d8376079a548bf2
Status: Downloaded newer image for openresty/openresty:1.13.6.2-alpine
```

:::tip
  Docker Hub 是 Docker 官方建立的中央镜像仓库，除了普通镜像仓库的功能外，它内部还有更加细致的权限管理，支持构建钩子和自动构建，并且有一套精致的 Web 操作页面。
  Docker Hub 的地址是：hub.docker.com/。
:::

- **管理镜像**

如果我们要获得镜像更详细的信息，我们可以通过 **docker inspect** 这个命令。

```shell
$ sudo docker inspect nginx
[
    {
        "Id": "sha256:2fef532eadb328740479f93b4a1b7595d412b9105ca8face42d3245485c39ddc",
        "RepoTags": [
            "redis:3.2"
        ],
        "RepoDigests": [
            "redis@sha256:745bdd82bad441a666ee4c23adb7a4c8fac4b564a1c7ac4454aa81e91057d977"
        ],
## ......
    }
]
```

- **删除镜像**

删除镜像的命令是 **docker rmi**，参数是镜像的名称或 ID。

```shell
$ sudo docker rmi nginx
Untagged: redis:3.2
Untagged: redis@sha256:745bdd82bad441a666ee4c23adb7a4c8fac4b564a1c7ac4454aa81e91057d977
Deleted: sha256:2fef532eadb328740479f93b4a1b7595d412b9105ca8face42d3245485c39ddc
## ......
Untagged: redis:4.0
Untagged: redis@sha256:b77926b30ca2f126431e4c2055efcf2891ebd4b4c4a86a53cf85ec3d4c98a4c9
Deleted: sha256:e1a73233e3beffea70442fc2cfae2c2bab0f657c3eebb3bdec1e84b6cc778b75
## ......
```

- **创建容器**

当我们选择好镜像以后，就可以通过 **docker create** 这个命令来创建容器了。

```shell
$ sudo docker create nginx
34f277e22be252b51d204acbb32ce21181df86520de0c337a835de6932ca06c3
```

执行 **docker create** 后，Docker 会根据我们所给出的镜像创建容器，在控制台中会打印出 Docker 为容器所分配的容器 ID，此时容器是处于 Created 状态的。

要使用容器名操作容器，就先得给容器命名，在创建容器时，我们可以通过 --name 这个选项来配置容器名。

```shell
$ sudo docker create --name nginx nginx
```

- **启动容器**
通过 **docker create** 创建的容器，是处于 Created 状态的，其内部的应用程序还没有启动，所以我们需要通过 **docker start** 命令来启动它。

```shell
sudo docker start nginx
```

在 Docker 里，还允许我们通过 **docker run** 这个命令将 **docker create** 和 **docker start** 这两步操作合成为一步，进一步提高工作效率。

```shell
$ sudo docker run --name nginx -d nginx:1.12
89f2b769498a50f5c35a314ab82300ce9945cbb69da9cda4b022646125db8ca7
```

- **管理容器**
通过 **docker ps** 这个命令，我们可以罗列出 Docker 中的容器。

```shell
$ sudo docker ps
```

默认情况下，**docker ps** 列出的容器是处于运行中的容器，如果要列出所有状态的容器，需要增加 -a 或 --all 选项。

```shell
$ sudo docker ps -a
```

- **停止和删除容器**
要将正在运行的容器停止，我们可以使用 **docker stop** 命令。

```shell
$ sudo docker stop nginx
```

容器停止后，其维持的文件系统沙盒环境还是存在的，内部被修改的内容也都会保留，我们可以通过 **docker start** 命令将这个容器再次启动。

当我们需要完全删除容器时，可以通过 **docker rm** 命令将容器进行删除。

```shell
$ sudo docker rm nginx
```

正在运行中的容器默认情况下是不能被删除的，我们可以通过增加 -f 或 --force 选项来让 **docker rm** 强制停止并删除容器，不过这种做法并不妥当。

- **进入容器**

使用exec可以进入容器，进行操作

```shell
sudo docker exec -it 容器id /bin/bash
```

:::tip
在容器中可能出现无sudo方法，并且使用apt-get、yum等安装缺需要root权限等，可以使用以下的命令进入管理者模式
:::

```shell
sudo docker exec -it -u root 容器id /bin/bash
```

- **可以用来试水的镜像**

在我们使用docker，可以先搞一些比较好玩的镜像来使用

```shell
# docker 安装 portainer（ docker 容器的 GUI 管理方案
# 下载镜像
docker pull portainer/portainer

# 创建 volume
docker volume create portainer_data
# 单机 portainer
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
# 访问：http://xxx.xxx.xxx.xxx:9000

# docker 安装 jenkins docker 自动化部署集成方案 下面在使用中会重点提到
docker pull jenkins
```


## Jenkins使用
以上我们学习了前端的部署，node服务的部署，docker的基本使用，那么我们就可以开始我们的服务持续集成的最后一步，jenkins的使用

### 安装java8

- 可以先查看可安装java版本。

```shell
yum -y list java**
```

- 因为我们的机器是64位的，所以选择安装java-1.8.0-openjdk-devel.x86_64，耐心等待至自动安装完成

```shell
yum install -y java-1.8.0-openjdk-devel.x86_64
```

- 查看安装的版本，检查是否安装成功

```shell
java -version
```

- 查看安装的路径

```shell
1rpm -ql java-1.8.0-openjdk

# 目录一般是 /usr/lib/jvm
```

### 安装镜像jenkins

:::tip
因为官方jenkins镜像已经停止维护，一些插件无法安装，所以建议不要使用官方jenkins、使用中文版的jenkins/jenkins
:::

```shell
docker pull jenkins/jenkins
```

### 启动jenkins容器

```shell
# 把jenkins/jenkins重新命名为reina-jenkins，并代理制8080端口启动
docker run --name reina-jenkins -p 8000:8080 -p 50000:50000 jenkins/jenkins
```

### 查看容器的运行状态

```shell
docker ps
```

:::tip
因为我们使用的是8080端口，记得在服务器上配置好哦
:::

### jenkins的关闭&重新启动

```shell
# 关闭
docker stop [id/name]

# 再次启动
docker start [id/name]
```

### 初始化配置jenkins
第一次进入需要输入jenkins容器密码，那么这个密码是什么呢？我们一步一步来看

- **打印容器中的信息，获取初始化登录密码**

```shell
docker logs -f reina-jenkins
```

<img :src="$withBase('/imgs/pwd.jpg')" alt="mixureSecure">

- **第一次进入需要进行安装和初始化，选择install**
<img :src="$withBase('/imgs/install.jpg')" alt="mixureSecure">

- **接着会自动进行插件安装，因没有配置代理，安装失败可暂时忽略**
<img :src="$withBase('/imgs/start.jpg')" alt="mixureSecure">

- **创建用户并登陆**
输入相应信息

- **登陆成功后，配置Jenkins代理**
路径：系统设置->插件管理->高级设置->升级站点

```
# 替换为该站点并保存
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

- **安装插件**

系统管理 -> 管理插件 -> 可选插件，可参考初始登陆时推荐安装的插件进行选择。因为要配置Jenkins从GitHub自动拉取代码，因此必须安装Git和GitHub。

- **github中token获取**

登陆GitHub，依次选择settings - developer settings - personal access tokens - generate new token，选择如下选项（repo和admin: repo_hook）后生成token（记得复制，每个token只能显示一次）

- **github更新通知jenkins**

登录要自动部署的项目，Settings -> Webhooks -> 右上角Add webhook -> Payload URL中输入jenkins地址(http://<jenkins地址>/github-webhook/) -> 保存

- **在Jenkins，创建构建任务**
  - 自定义任务名称 输入任务名称。并选择构建一个自由风格的项目
  - ​创建完成后进入配置页面，选则GitHub项目，并输入Github的URL
  - ​源码管理中，选择Git，填入对应仓库URL
  - ​添加Credentials，选择类型为Secret Text，在Secret处填入github中生成的token
  - 指定需要构建的分支，默认为master(github目前新分支改为了main)，并选择构建触发时机，此处我勾选的是代码提交时自动触发
  - 为了测试配置是否成功，下面配置构建脚本，打印‘Hello World’

:::tip
到这里我们已经完成了一大半了，github提交代码的时候 会自动触发jenkins的构建，可以试验一下
:::

### jenkins构建部署至服务器
我们使用自定义linux命令的方式部署到服务器上

- **安装插件**
和上面安装插件的方式一样，安装Publish Over SSH

- **配置服务器地址**
回到jenkins首页，系统管理 -> 系统配置 -> 找到Publish over SSH

配置参数
| 参数        | 含义           |
| ------------- |:-------------:|
| name    | 选项的名字，随意起  |
| Hostname    | 服务器的地址  |
| Username    | 用户名，一般是root  |
| Remote Directory    | 根目录，一般输入/  |

- **进行配置**
 - 进入到jenkins的项目配置中，找到构建环境，选择Send files or execute commands over SSH after the build runs
 - Name选择刚才配置好的选项
 - Source files 源文件名
 - Remote directory 移动到服务器的目录
 - Exec command 部署完之后的操作，可以直接写入linux指令
 - 保存应用


:::tip
至此，我们docker+jenkins+github的项目持续集成就可以了，可以push文件到github进行试验了。
:::
