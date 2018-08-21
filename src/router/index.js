import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/menu/Main'

// 登录页面
import UserLogin from '../views/user/UserLogin'





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
import StoreOrganize from '../views/store/StoreOrganize'
import Store from '../views/store/Store'
import StoreAccount from '../views/store/StoreAccount'
import StoreAccountManage from '../views/store/StoreAccountManage'
import StorePost from '../views/store/StorePost'
import StoreRemind from '../views/store/StoreRemind'
import StoreTime from '../views/store/StoreTime'

/*****系统设置*****/
//部门管理
import Department from '../views/department/Department'
//岗位管理
import Role from '../views/role/Role'
//帐号管理
import User from '../views/user/User'


//个人中心
import UserPersonal from '../views/user/UserPersonal'
//通知
import Notice from '../views/notice/Notice'
import Inbox from '../views/notice/Inbox'
import Outbox from '../views/notice/Outbox'
import Drafts from '../views/notice/Drafts'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login',name: 'UserLogin',component: UserLogin},
    {

      path: '/',
      meta: { requiresAuth: true },
      component: Main,

      children: [
        {path: 'Statistics',name: 'Statistics',component: Statistics},
        {path: 'Guest',name: 'Guest',component: Guest},
        {path: 'Order',name: 'Order',component: Order},
        {path: 'LabelList',name: 'LabelList',component: LabelList},
        {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
        {path: 'Device',name: 'Device',component: Device},
        {path: 'StoreDeviceDetailLists',name: 'StoreDeviceDetailLists',component: StoreDeviceDetailLists},
        {path: 'Store',name:'Store',component:Store},
        {path: 'StoreOrganize',name:'StoreOrganize',component:StoreOrganize},
        {path: 'StoreAccount',name:'StoreAccount',component:StoreAccount},
        {path: 'StoreAccountManage',name:'StoreAccountManage',component:StoreAccountManage},
        {path: 'StorePost',name:'StorePost',component:StorePost},
        {path: 'StoreRemind',name: 'StoreRemind',component: StoreRemind},
        {path: 'StoreTime',name: 'StoreTime',component: StoreTime},
        {path: 'UserPersonal',name: 'UserPersonal',component: UserPersonal},
        // {path: 'Department',name:'Department',component:Department},
        {path: 'Role',name:'Role',component:Role},
        {path: 'User',name:'User',component:User},
        {path: 'Notice',name:'Notice',component:Notice},
        {path: 'Notice/:id',name:'Notice',component:Notice},
        {path: 'Inbox',name:'Inbox',component:Inbox},
        {path: 'Outbox',name:'Outbox',component:Outbox},
        {path: 'Drafts',name:'Drafts',component:Drafts},
      ]

  }]
})

router.beforeEach((to, from, next) => {
  let knock_knock = window.sessionStorage.getItem('knock_knock')
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
