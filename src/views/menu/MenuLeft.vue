<template>
	<div class="left-menu1">
		<el-menu :default-active="currentMenu" 
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse && isShow"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#409EFF">

            <router-link :to="{name: 'Statistics'}">
                <el-menu-item index="/">
                    <i class="el-icon-menu"></i>
                    <span slot="title">系统通知</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'Statistics'}">
                <el-menu-item index="/Statistics">
                    <i class="el-icon-view"></i>
                    <span slot="title">客流统计</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'GuestList'}">
                <el-menu-item index="/GuestList">
                    <i class="el-icon-service"></i>
                    <span slot="title">来客列表</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'OrderList'}">
                <el-menu-item index="/OrderList">
                    <i class="el-icon-phone-outline"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
            </router-link>
            
            <router-link :to="{name: 'DeviceList'}">
                <el-menu-item index="/DeviceList">
                    <i class="el-icon-view"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>
            </router-link>

            <el-submenu index="7-2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">门店管理</span>
                </template>
                <router-link :to="{name: 'Store'}">
                    <el-menu-item index="/Store">
                        <span slot="title">门店列表</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{name: 'StoreRemind'}">
                    <el-menu-item index="/StoreRemind">提醒配置</el-menu-item>
                </router-link>
                <router-link :to="{name: 'StoreTime'}">
                    <el-menu-item index="/StoreTime">营业时间设置</el-menu-item>
                </router-link>
            </el-submenu>

            <!-- <el-submenu index="1-6">
                <template slot="title">
                    <i class="el-icon-view"></i>
                    <span slot="title">设备管理</span>
                </template>
                <router-link :to="{name: 'Equipment'}">
                    <el-menu-item index="/Equipment">设备管理admin端</el-menu-item>
                </router-link>
                <router-link :to="{name: 'EquipmentOfOwner'}">
                    <el-menu-item index="/EquipmentOfOwner">设备管理店长端</el-menu-item>
                </router-link>
            </el-submenu> -->
            <el-submenu index="7-1" style="padding-bottom:200px;">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统设置</span>
                </template>
                <router-link :to="{name: 'Account'}">
                    <el-menu-item index="/Account">账号管理</el-menu-item>
                </router-link>
                <router-link :to="{name: 'Role'}">
                    <el-menu-item index="/Role">角色管理</el-menu-item>
                </router-link>
                <router-link :to="{name: 'UserPersonal'}">
                    <el-menu-item index="/UserPersonal">个人中心</el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
	</div>
</template>
<script>
    export default {
        name:'word-item',
        props:{
            isCollapse: Boolean,
            isShow: Boolean,
        },
        data(){
            return{
                currentMenu:'/'
            }
        },
        created(){
            this.getUrl();
        },
        methods:{
            getUrl(){
                let self = this;
                let currentUrl = window.location.href;
                self.currentMenu = currentUrl.split('#')[1];
            }
        }
    }
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 160px;
    }
    .el-menu{
        border:0;
    }
</style>