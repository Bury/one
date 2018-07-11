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


/*个人中心*/
//1、门店管理
// psot store/lists 门店列表
global.GET_STORE_LIST = `${SERVER_IP}${COMMON}store/lists`
// post store/adds 添加门店
global.ADD_STORE = `${SERVER_IP}${COMMON}store/adds`
// post store/edit 编辑门店
global.EDIT_STORE = `${SERVER_IP}${COMMON}store/edit`
// post store/dele 删除门店
global.DELE_STORE = `${SERVER_IP}${COMMON}store/dele`

//账号管理
// post account/list 账号列表
global.GET_ACCOUNT_LIST = `${SERVER_IP}${COMMON}account/list`
// post account/adds 
global.ADD_ACCOUNT = `${SERVER_IP}${COMMON}account/adds`
// post account/view 详情
global.DETAIL_ACCOUNT = `${SERVER_IP}${COMMON}account/view`
// post account/edit 
global.EDIT_ACCOUNT = `${SERVER_IP}${COMMON}account/edit`
// post account/dele 
global.DELE_ACCOUNT = `${SERVER_IP}${COMMON}account/dele`
//post account/edit-password 
global.CHANGEpWD_ACCOUNT = `${SERVER_IP}${COMMON}account/edit-password`


//2、角色管理
// post role/list 角色列表
global.GET_ROLE_LIST = `${SERVER_IP}${COMMON}role/list`
// post role/adds 添加
global.ADD_ROLE = `${SERVER_IP}${COMMON}role/adds`
// POST role/edit 修改
global.EDIT_ROLE = `${SERVER_IP}${COMMON}role/edit`
// post role/dele 删除
global.DELE_ROLE = `${SERVER_IP}${COMMON}role/dele`
// post role/view-permission 所有权限
global.GET_ALL_PERMISSION = `${SERVER_IP}${COMMON}role/view-permission`
// post role/edit-permission 编辑权限
global.EDIT_PERMISSION = `${SERVER_IP}${COMMON}role/edit-permission`


//3、提醒设置
// post store-config/view-remind 显示提醒
global.GET_REMIND = `${SERVER_IP}${COMMON}store-config/view-remind`
// post store-config/remind 设置提醒
global.SET_REMIND = `${SERVER_IP}${COMMON}store-config/remind`

//4、营业时间设置
// post store-config/view-time 显示营业时间
global.GET_TIME = `${SERVER_IP}${COMMON}store-config/view-time`
// post store-config/business-time 营业时间设置
global.SET_TIME = `${SERVER_IP}${COMMON}store-config/business-time`

//5、当前用户
// post user/info 当前用户信息
global.GET_USER_INFO = `${SERVER_IP}${COMMON}user/info`
// post user/change-password 修改密码
global.CHANGE_PASSWORD = `${SERVER_IP}${COMMON}user/change-password`
// post user/logout 退出
global.LOGOUT = `${SERVER_IP}${COMMON}user/logout`
// post user/login 登陆
global.LOGIN = `${SERVER_IP}${COMMON}user/login`

