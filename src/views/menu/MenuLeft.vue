<template>
  <div class="left-menu1">
    <el-menu :default-active="currentMenu"
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#409EFF"
             @select="handleSelect">
        
      <template v-for="(item,index) in tableData">      	
        <el-menu-item :index="item.front_url" :key="index" v-if="item.no_child"  >
            <i :class="item.front_icon"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
        
        <el-submenu v-else  :key="index"  :index="item.front_url">
         <template slot="title">
          <i :class="item.front_icon"></i>
          <span slot="title">{{item.name}}</span>
         </template>
          <template v-for="(item1,index1) in item.children">
          	<el-menu-item :index="item1.front_url" :key="index1" style="padding-left:53px;">{{item1.name}}</el-menu-item>
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
        currentMenu: 'StoreTime',
        tableData: [],
      }
    },
    watch:{
    	$route(to,from){    		
    		this.getUrl();
    	}
    },
    created() {
      this.getUrl();
      this.menu();
    },
    methods: {
      getUrl() {
       switch (this.$route.name){
       	  case "Lists":
    			  this.$data.currentMenu = 'Device';
    				break;
    			case "StoreDeviceDetailLists":
    			  this.$data.currentMenu = 'Device';
    				break;
    			case "StoreDeviceSumLists":
    			  this.$data.currentMenu = 'Device';
    				break;	
    			case "StoreAccount":
    			  this.$data.currentMenu = 'Store';
    				break;	
    			case "LabelDetail":
    			  this.$data.currentMenu = 'LabelList';
    				break;	
    			default:
    			  this.$data.currentMenu = this.$route.name;
    				break;
    		}
      },
      handleSelect(index,indexPath){
      	(index === "Device") && (index = "Lists");
      	this.$router.push({
      		 name:index
      	})
      },
      menu() {
        userApi.menu().then((res) => {
        	if(res.data.errno === 0){
        		 for(let i=0;i<res.data.data.length;i++){
        		 	  if(res.data.data[i].no_child === false){
        		 	  	 res.data.data[i].front_url = String(i)
        		 	  }
        		 }
        		 this.$data.tableData = res.data.data;
        	}
          
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
