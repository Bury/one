import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/menu/Main'

// 登录页面
import UserLogin from '../views/user/UserLogin'

//个人中心
import UserPersonal from '../views/user/UserPersonal'

import User from '../views/user/User'

//客流统计
import Statistics from '../views/guest/Statistics'
import Guest from '../views/guest/Guest'

/*订单管理*/
import Order from '../views/order/Order'

/*标签管理*/
import LabelList from '../views/label/LabelList'
import LabelDetail from '../views/label/LabelDetail'

/*设备管理*/
import Device from '../views/device/Device'
import StoreDeviceDetailLists from '../views/device/StoreDeviceDetailLists'


/*****门店管理*****/

//门店管理
import Store from '../views/store/Store'
import StoreAccount from '../views/store/StoreAccount'
import StoreRemind from '../views/store/StoreRemind'
import StoreTime from '../views/store/StoreTime'

/*****系统设置*****/

//帐号管理

//角色管理
import Role from '../views/role/Role'





Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login',name: 'UserLogin',component: UserLogin},
    {
      
      path: '/',
      meta: { requiresAuth: true },
      component: Main,
      
      children: [
        {path: '/',name: 'Statistics',component: Statistics},
        {path: 'Guest',name: 'Guest',component: Guest},
        {path: 'Order',name: 'Order',component: Order},
        {path: 'LabelList',name: 'LabelList',component: LabelList},
        {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
        
        {path: 'Device',name: 'Device',component: Device},
        {path: 'StoreDeviceDetailLists',name: 'StoreDeviceDetailLists',component: StoreDeviceDetailLists},

        {path: 'Store',name:'Store',component:Store},
        
        {path: 'StoreAccount',name:'StoreAccount',component:StoreAccount},
        {path: 'StoreRemind',name: 'StoreRemind',component: StoreRemind},
        {path: 'StoreTime',name: 'StoreTime',component: StoreTime},
        
        {path: 'User',name:'User',component:User},
        {path: 'Role',name:'Role',component:Role},
        {path: 'Personal',name: 'UserPersonal',component: UserPersonal},
      ]
      
  }]
})

router.beforeEach((to, from, next) => {
  let knock_knock = window.localStorage.getItem('knock_knock')
  if (to.matched.some(
        record => record.meta.requiresAuth)&& (!knock_knock || knock_knock === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
