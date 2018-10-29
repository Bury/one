<template>
  <div class="left-menu1">
    <el-menu :default-active="currentMenu"
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#272454"
             text-color="#95C7FF"
             active-text-color="#FFFFFF"
             @select="handleSelect">

      <template v-for="(item,index) in tableData">
        <el-menu-item class="leftIcon" :index="item.front_url" :key="index" v-if="item.no_child" :id="item.id">
          <div onclick="clickTotal(this.parentNode.id,this.id,1)" :id="item.name">
            <i :class="item.front_icon"></i>
            <span slot="title">{{item.name}}</span>
          </div>

        </el-menu-item>

        <el-submenu v-else  :key="index"  :index="item.front_url">
         <template slot="title">
          <i  :class="item.front_icon"></i>
          <span slot="title">{{item.name}}</span>
         </template>
          <template v-for="(item1,index1) in item.children">
          	<el-menu-item :index="item1.front_url" :key="index1" style="padding-left:53px;" :id="item1.id">
              <div onclick="clickTotal(this.parentNode.id,this.id,1)" :id="item1.name">
              {{item1.name}}
              </div>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>


      <!--<router-link :to="{name: item.front_url}" v-if="item.no_child">
        <el-menu-item :index="item.front_url">
          <i :class="item.front_icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="item.front_url"  v-if="item.children">
        <template slot="title">
          <i :class="item.front_icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <router-link v-for="(item1,index1) in item.children" :key="index1" :to="{name: item1.front_url}">
          <el-menu-item :index="item1.front_url" style="padding-left:53px;">{{item1.name}}</el-menu-item>
        </router-link>
      </el-submenu>-->

    </el-menu>
  </div>
</template>
<script src="@/assets/js/menu/MenuLeft.js"></script>
<style lang="scss"  src="@/assets/css/menu/MenuLeft.scss">
