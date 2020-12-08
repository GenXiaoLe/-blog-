## 服务端部署

## Pm2启动node服务

## Docker使用
Docker是一款以容器虚拟化技术为基础的软件。为程序跨平台兼容而生，将虚拟化应用于资源管理，是一个由 Go 语言实现的容器引擎。

:::tip
  Docker是围绕镜像 ( Image )、容器 ( Container )、网络 ( Network )、数据卷 ( Volume )所展开。我们所有的操作均以CentOS操作系统为例
:::

### 安装docker
首先进行 Docker 的安装

```
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

```
$ sudo systemctl start docker
```

- **docker version**

在 Docker 服务启动之后，我们先来尝试一个最简单的查看 Docker 版本的命令：**docker version**。

```
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

```
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

```
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

```
$ sudo docker info
## ......
Registry Mirrors:
 https://registry.docker-cn.com/
## ......
```

- **查看镜像**

如果要查看当前连接的 docker daemon 中存放和管理了哪些镜像，我们可以使用 **docker images** 这个命令 ( Linux、macOS 还是 Windows 上都是一致的 )。

```
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
php                 7-fpm               f214b5c48a25        9 days ago          368MB
redis               3.2                 2fef532eadb3        11 days ago         76MB
redis               4.0                 e1a73233e3be        11 days ago         83.4MB
cogset/cron         latest              c01d5ac6fc8a        15 months ago       125MB
```

- **获取镜像**

要拉取镜像，我们可以使用 **docker pull** 命令，命令的参数就是我们之前所提到的镜像仓库名。

```
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

```
$ sudo docker pull openresty/openresty:1.13.6.2-alpine
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

```
$ sudo docker inspect redis:3.2
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

```
$ sudo docker rmi redis:3.2 redis:4.0
Untagged: redis:3.2
Untagged: redis@sha256:745bdd82bad441a666ee4c23adb7a4c8fac4b564a1c7ac4454aa81e91057d977
Deleted: sha256:2fef532eadb328740479f93b4a1b7595d412b9105ca8face42d3245485c39ddc
## ......
Untagged: redis:4.0
Untagged: redis@sha256:b77926b30ca2f126431e4c2055efcf2891ebd4b4c4a86a53cf85ec3d4c98a4c9
Deleted: sha256:e1a73233e3beffea70442fc2cfae2c2bab0f657c3eebb3bdec1e84b6cc778b75
## ......
```

## Jenkins使用
1. 安装docker
2. 服务器安装java8
3. 安装镜像jenkins(不要使用官方jenkins 版本太低、使用jenkins/jenkins)
4. 启动容器 8080端口指向8000，容器命名为reina-jenkins，使用镜像jenkins/jenkins：docker run --name reina-jenkins -p 8000:8080 -p 50000:50000 jenkins/jenkins
5. 打开8000端口，复制logs中的用户密码 登录，选择推荐插件进行安装
6. 创建用户
7. 系统设置->插件管理->高级设置、替换站点https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json并保存
8. 可选插件，搜索github和git进行安装
9. 在github进行设置，得到token：b301e05beb0ca90fbec24523a3cdb66dbdd4ecbb
10. jenkins创建任务
11. 再次启动 docker start [id/name]