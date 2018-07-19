<<<<<<< HEAD
# 鹰眼系统-商家端-WEB

#### 项目介绍
鹰眼系统-商家端-WEB
=======
# 客流统计系统前端

#### 项目介绍
客流统计系统前端
>>>>>>> origin/v1.0.0

#### 软件架构
软件架构说明


#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
<<<<<<< HEAD
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
=======
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)



### 需要修改和优化
1. 各页面请求参数（时间）需要转化成秒，搜索条件和表内字段根据新需求修改
2. components/UserInfo.vue 个人信息修改中的标签改写，参考移动端；
   components/OrderRecord.vue 布局和分页复制 components/StoreRecord.vue，进行部分字段修改（因为接口过来没有具体数据，所以没调整）
3. 登陆页面添加首次登陆修改密码
4. 菜单权限：
	role/left-menu 获取左侧菜单----menu/Menu1.vue添加（新需求上增加页面需要跟后端说：文案和文件名）
	role/child-menu 几乎每个页面都要调 （点击左侧菜单后获取页面某个具体按钮、字段等权限）
5. 订单管理等其他的根据新需求写
6. 统计页面 home/Statistics.vue 请求参数（时间）转化成秒，年龄统计颜色根据ui图添加
7. 细节注意检查 ----例如：登入拦截方面在登入、退出、修改密码、刷新页面等操作上是否存在遗漏
>>>>>>> origin/v1.0.0
