import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
const Main = resolve => require(['@/views/menu/Main'],resolve)

// 登录页面
const UserLogin = resolve => require(['@/views/user/UserLogin'],resolve);




//数据图
const DataView = resolve => require(['@/components/DataView'],resolve);

//客流统计
const Statistics = resolve => require(['@/views/guest/Statistics'],resolve);
const Guest = resolve => require(['@/views/guest/Guest'],resolve);

/*订单管理*/
const Order = resolve => require(['@/views/order/Order'],resolve);

/*标签管理*/
const LabelList = resolve => require(['@/views/label/LabelList'],resolve);
const LabelDetail = resolve => require(['@/views/label/LabelDetail'],resolve);

/*设备管理*/
const Device = resolve => require(['@/views/device/Device'],resolve);
const Lists = resolve => require(['@/views/device/Lists'],resolve);
const StoreDeviceSumLists = resolve => require(['@/views/device/StoreDeviceSumLists'],resolve);
const StoreDeviceDetailLists = resolve => require(['@/views/device/StoreDeviceDetailLists'],resolve);


/*****门店管理*****/

//门店管理
const StoreOrganize = resolve => require(['@/views/store/StoreOrganize'],resolve);
const Store = resolve => require(['@/views/store/Store'],resolve);
const StoreAccount = resolve => require(['@/views/store/StoreAccount'],resolve);
const StoreAccountManage = resolve => require(['@/views/store/StoreAccountManage'],resolve);
const StorePost = resolve => require(['@/views/store/StorePost'],resolve);
const StoreRemind = resolve => require(['@/views/store/StoreRemind'],resolve);
const StoreTime = resolve => require(['@/views/store/StoreTime'],resolve);

/*****系统设置*****/
//部门管理
const Department = resolve => require(['@/views/department/Department'],resolve);
//岗位管理
const Role = resolve => require(['@/views/role/Role'],resolve);
//帐号管理
const User = resolve => require(['@/views/user/User'],resolve);


//个人中心
const UserPersonal = resolve => require(['@/views/user/UserPersonal'],resolve);
//通知
const Notice = resolve => require(['@/views/notice/Notice'],resolve);
const Inbox = resolve => require(['@/views/notice/Inbox'],resolve);
const Outbox = resolve => require(['@/views/notice/Outbox'],resolve);
const Drafts = resolve => require(['@/views/notice/Drafts'],resolve);

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login',name: 'UserLogin',component: UserLogin},
    {path: '/DataView',meta:{requiresAuth: true },name: 'DataView',component: DataView},
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
        {
        	path: 'Device',
          component: Device,
          children:[
          {path: '',name: 'Lists',component: Lists},
          {path: 'StoreDeviceSumLists',name: 'StoreDeviceSumLists',component: StoreDeviceSumLists},
          {path: 'StoreDeviceDetailLists',name: 'StoreDeviceDetailLists',component: StoreDeviceDetailLists},
         ]
        },
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
  let knock_knock = window.localStorage.getItem('knock_knock')
  if (to.matched.some(record => record.meta.requiresAuth)&& (!knock_knock || knock_knock === null)) {
               window.location.href = '/';
// next({
// path: '/login',
// query: { redirect: to.fullPath }
// })
  } else {
    next()
  }
})

export default router
