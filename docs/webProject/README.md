## 服务端部署

## Pm2启动node服务

## Docker使用
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
