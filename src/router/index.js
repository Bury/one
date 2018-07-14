import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/menu/Main'

// 登录页面
import UserLogin from '../views/user/UserLogin'

//个人中心
import UserPersonal from '../views/user/UserPersonal'

//客流统计
import Statistics from '../views/home/Statistics'

//来客列表
import GuestList from '../views/guest/GuestList'

/*订单管理*/
import OrderList from '../views/order/OrderList'

/*标签管理*/
import LabelList from '../views/label/LabelList'
import LabelDetail from '../views/label/LabelDetail'

/*设备管理*/
import DeviceList from '../views/device/DeviceList'
import StoreDetail from '../views/device/StoreDetail'

/*****系统设置*****/

//角色管理
import Role from '../views/role/Role'

//门店管理
import Store from '../views/store/Store'

//StoreAccount
import StoreAccount from '../views/store/StoreAccount'

//提醒设置
import StoreRemind from '../views/store/StoreRemind'

//营业时间设置
import StoreTime from '../views/store/StoreTime'



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
        {path: 'GuestList',name: 'GuestList',component: GuestList},
        {path: 'OrderList',name: 'OrderList',component: OrderList},
        {path: 'LabelList',name: 'LabelList',component: LabelList},
        {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
        {path: 'DeviceList',name: 'DeviceList',component: DeviceList},
        {path: 'StoreDetail',name: 'StoreDetail',component: StoreDetail},
        {path: 'Store',name:'Store',component:Store},
        {path: 'StoreAccount',name:'StoreAccount',component:StoreAccount},
        {path: 'Role',name:'Role',component:Role},
        {path: 'StoreRemind',name: 'StoreRemind',component: StoreRemind},
        {path: 'StoreTime',name: 'StoreTime',component: StoreTime},
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
