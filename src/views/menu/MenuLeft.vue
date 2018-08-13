<template>
  <div class="left-menu1">
    <el-menu :default-active="$route.path" :data="tableData"
             v-for="(item,index) in tableData"
             :key="index"
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#409EFF">

      <router-link :to="{name: item.front_url}" v-if="item.no_child">
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
        <router-link v-for="(item1,index1) in item.children" :to="{name: item1.front_url}">
          <el-menu-item :index="item1.front_url" style="padding-left:53px;">{{item1.name}}</el-menu-item>
        </router-link>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
  import userApi from '@/api/user.js'

  export default {
    name: 'word-item',
    props: {
      isCollapse: Boolean,
      isShow: Boolean,
    },
    data() {
      return {
        currentMenu: '/',
        tableData: [],
      }
    },
    created() {
      // this.$nextTick(() =>{
      //   console.log(151515);
      //   this.getUrl()
      // })
      // this.getUrl();
      this.menu();
    },
    methods: {
      getUrl() {
        let self = this;
        let currentUrl = window.location.href;
        console.log(currentUrl)
        console.log(currentUrl.split('#')[1],121212)
        self.currentMenu = currentUrl.split('#')[1];
      },
      menu() {
        userApi.menu().then((res) => {
          this.$data.tableData = res.data.data;
          console.log(this.$data.tableData);
        })
      },
    }
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 160px;
  }

  .el-menu {
    border: 0;
  }
</style>
