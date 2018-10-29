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
            <span class="el-icon-yy-home_icon briefing-btn" @click="goDataView"></span>

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
<script src="@/assets/js/menu/Main.js"></script>

<style lang="scss" scoped src="@/assets/css/menu/main.scss">
