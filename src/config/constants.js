/**
 * 定义所有的常量
 */
// 接口地址
import apiUrl from './API.js'

const SERVER_IP = apiUrl.apiUrl
const COMMON = 'v1/'

//客流统计
// post analysis/customer
global.GET_CUSTOMER = `${SERVER_IP}${COMMON}analysis/customer`
// post analysis/feature
global.GET_FEATURE = `${SERVER_IP}${COMMON}analysis/feature`

/*提醒列表*/
// post customer//remind-list 获取提醒列表
global.GET_REMIND_LIST = `${SERVER_IP}${COMMON}customer/remind-list`
// post customer/personal-info 个人信息
global.GET_PERSONAL_INFO = `${SERVER_IP}${COMMON}customer/personal-info`
// post customer/edit-personal-info
global.EDIT_PERSONAL_INFO = `${SERVER_IP}${COMMON}customer/edit-personal-info`
// post customer/store-recore 到店记录
global.GET_STORE_RECORE = `${SERVER_IP}${COMMON}customer/store-recore`
// post customer/order-recore 订单记录
global.GET_ORDER_RECORE = `${SERVER_IP}${COMMON}customer/order-recore`
// post customer/levels 提醒列表用户等级筛选项
global.GET_LEVELS = `${SERVER_IP}${COMMON}customer/levels`
// post customer/store-list 门店筛选项
global.GET_STORES = `${SERVER_IP}${COMMON}customer/store-list`
// post customer/is-reception 接待
global.IS_RECEPTION = `${SERVER_IP}${COMMON}customer/is-reception`

/*来客列表*/
// post customer/visitor-list 获取提醒列表
global.GET_GUEST_LIST = `${SERVER_IP}${COMMON}customer/visitor-list`

/*订单管理*/
// post order/list订单列表
global.GET_ORDER_LIST = `${SERVER_IP}${COMMON}order/list`
// post order/dele
global.DELE_OTDER = `${SERVER_IP}${COMMON}order/dele`

/*标签管理*/
//1、父级
// post tag/list 标签列表
global.GET_LABEL_LIST = `${SERVER_IP}${COMMON}tag/parent-list`
// post tag/parent-adds 添加
global.ADD_LABEL = `${SERVER_IP}${COMMON}tag/parent-adds`
// post tag/parent-edit 修改
global.EDIT_LABEL = `${SERVER_IP}${COMMON}tag/parent-edit`
// post tag/parent-dele 删除
global.DELE_LABEL = `${SERVER_IP}${COMMON}tag/parent-dele`

//2、子级
// post tag/childs-list 标签列表
global.GET_CHILD_LABEL_LIST = `${SERVER_IP}${COMMON}tag/childs-list`
// post tag/childs-adds 添加
global.ADD_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-adds`
// post tag/childs-edit 修改
global.EDIT_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-edit`
// post tag/childs-dele 删除
global.DELE_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-dele`

//设备管理
// post device/list 按设备
global.GET_DEVICE_LIST = `${SERVER_IP}${COMMON}device/list`
// post device/version 
global.GET_ALL_VERSION = `${SERVER_IP}${COMMON}device/version`
// post device/camera-depoly 按设备分配
global.SET_DEPOLY = `${SERVER_IP}${COMMON}device/camera-depoly`
// post device/edit
global.EDIT_DEVICE = `${SERVER_IP}${COMMON}device/edit`
// post device/device-list 按门店
global.GET_DEVICE_LIST_STORE = `${SERVER_IP}${COMMON}device/device-list`
// post device/operation 按门店分配
global.SET_OPERATION = `${SERVER_IP}${COMMON}device/operation`

//2、角色管理
global.ROLE_LISTS = `${SERVER_IP}${COMMON}role/list`
global.ROLE_ADDS = `${SERVER_IP}${COMMON}role/adds`
global.ROLE_EDIT = `${SERVER_IP}${COMMON}role/edit`
global.ROLE_DELE = `${SERVER_IP}${COMMON}role/dele`

//permisstion
global.ROLE_PERMISSION_VIEW = `${SERVER_IP}${COMMON}role/view-permission`
global.ROLE_PERMISSION_EDIT = `${SERVER_IP}${COMMON}role/edit-permission`

//账号管理
global.ACCOUNT_LISTS = `${SERVER_IP}${COMMON}account/list`
global.ACCOUNT_ADDS = `${SERVER_IP}${COMMON}account/adds`
global.ACCOUNT_VIEW = `${SERVER_IP}${COMMON}account/view`
global.ACCOUNT_EDIT = `${SERVER_IP}${COMMON}account/edit`
global.ACCOUNT_DELE = `${SERVER_IP}${COMMON}account/dele`
global.ACCOUNT_PASSWORD_EDIT = `${SERVER_IP}${COMMON}account/edit-password`

//门店管理
global.STORE_LISTS = `${SERVER_IP}${COMMON}store/lists`
global.STORE_ADDS = `${SERVER_IP}${COMMON}store/adds`
global.STORE_EDIT = `${SERVER_IP}${COMMON}store/edit`
global.STORE_DELE = `${SERVER_IP}${COMMON}store/dele`

//账号管理
global.STORE_ACCOUNT_LISTS = `${SERVER_IP}${COMMON}account/list`
global.STORE_ACCOUNT_ADDS = `${SERVER_IP}${COMMON}account/adds`
global.STORE_ACCOUNT_VIEW = `${SERVER_IP}${COMMON}account/view`
global.STORE_ACCOUNT_EDIT = `${SERVER_IP}${COMMON}account/edit`
global.STORE_ACCOUNT_DELE = `${SERVER_IP}${COMMON}account/dele`
global.STORE_ACCOUNT_PASSWORD_EDIT = `${SERVER_IP}${COMMON}account/edit-password`

//提醒设置
global.STORE_REMIND_VIEW = `${SERVER_IP}${COMMON}store-config/view-remind`
global.STORE_REMIND_SET = `${SERVER_IP}${COMMON}store-config/remind`

//营业时间
global.STORE_TIME_VIEW = `${SERVER_IP}${COMMON}store-config/view-time`
global.STORE_TIME_SET = `${SERVER_IP}${COMMON}store-config/business-time`

//user
global.USER_VIEW = `${SERVER_IP}${COMMON}user/info`
global.USER_CHANGE_PASSWORD = `${SERVER_IP}${COMMON}user/change-password`
global.USER_LOGOUT = `${SERVER_IP}${COMMON}user/logout`
global.USER_LOGIN = `${SERVER_IP}${COMMON}user/login`

