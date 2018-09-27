<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
        <div  class="header-wrap">
            <div :class="[isCollapse ? 'ml90' : 'ml190' , 'company']"><img src="../../assets/images/headLogo.png"/></div>
            <!-- <div class="top-menu" style="float:left;">
                <el-menu :default-active="horizontalIndex"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#409EFF">
                    <el-menu-item index="1">我的工作台1</el-menu-item>
                    <el-menu-item index="2">我的工作台2</el-menu-item>
                    <el-menu-item index="3">我的工作台3</el-menu-item>
                    <el-menu-item index="4">我的工作台4</el-menu-item>
                </el-menu>
            </div> -->            
            <div class="user">
                <el-dropdown trigger="hover" >
                    <span class="el-dropdown-link" style="color:#2A2A2A;">
                      您好，{{userName}}
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="text-align:center;">
                        <el-dropdown-item divided @click.native="user_personal">个人中心</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout" command="logout" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <span class="el-icon-yy-home briefing-btn" @click="goDataView"></span>
          <!--<div class="user1">-->
            <!--<el-dropdown trigger="hover" >-->
                    <!--<span class="el-dropdown-link" style="color:#fff;">-->
                      <!--通知-->
                      <!--<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
                    <!--</span>-->
              <!--<el-dropdown-menu slot="dropdown" style="text-align:center;">-->
                <!--<el-dropdown-item divided @click.native="created_notice">创建通知</el-dropdown-item>-->
                <!--<el-dropdown-item divided @click.native="inbox">收件箱</el-dropdown-item>-->
                <!--<el-dropdown-item divided @click.native="outbox">发件箱</el-dropdown-item>-->
                <!--<el-dropdown-item divided @click.native="drafts">草稿箱</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</div>-->


        </div>
        <div class="left-menu-wrap">
        	<div class="leftNav">
              <img  :width="isCollapse ? 54 : 84" src="../../assets/images/leftLogo.png" />
              <!--<img  v-if="isCollapse" src="../../assets/images/leftLogoMini.png"/>-->
            </div>
            <div class="left-arrow">
            	<ul class="arrow-wrap">
            		<li v-if="isCollapse" @click="isCollapse = false"><img class="moveImg" src="../../assets/images/right.png"/></li>
            		<li v-if="!isCollapse" @click="isCollapse = true"><img class="moveImg" src="../../assets/images/left.png"/></li>            		
            	</ul>
            </div>
            <MenuLeft v-if="leftMenu.leftMenu1" :isCollapse="isCollapse" :isShow="leftMenu.leftMenu1"></MenuLeft>
        </div>
        <div class="content-wrap" ref="content" :style="isCollapse ? 'margin-left:74px;' : 'margin-left:170px;'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import MenuLeft from './MenuLeft'

import userApi from '../../api/user.js'

export default {

  name: 'main-box',

  components: {
    MenuLeft
  },

  data () {
    return {
        userName:'xxxxx',
        horizontalIndex: '1',
        isCollapse: false,
        leftMenu: {
            leftMenu1:true,
            leftMenu2:false,
            leftMenu3:false,
            leftMenu4:false
        }
    }

  },

  created: function(){
    this.$data.userName = localStorage.getItem('username')
  },

  methods: {

    handleSelect(key, keyPath) {
        var nowKey = "leftMenu"+key;
        for(var i in this.$data.leftMenu){
            var nowI = i;
            this.$data.leftMenu[nowI] = false;
            if(nowKey == nowI){
                this.$data.leftMenu[nowI] = true;
            }
        }

    },

    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },

    logout(){
        userApi.logout().then((res) => {
            if(res.data.errno === 0){
                localStorage.setItem('knock_knock', null);
                localStorage.setItem('username', '');
                window.location.href = '/';
            }else{
                //logout failed
            }
        });
    },

    user_personal(){
        this.$router.push('/UserPersonal')
    },

    created_notice(){
      this.$router.push('/Notice')
    },
    inbox(){
      this.$router.push('/Inbox')
    },
    outbox(){
      this.$router.push('/Outbox')
    },
    drafts(){
      this.$router.push('/Drafts')
    },
    goDataView(){
    	this.$router.push('/DataView')
    }

  }

}

</script>

<style lang="scss" scoped src="@/assets/css/menu/main.scss">
