/**
 * 定义所有的常量
 */
// 接口地址
import apiUrl from './API.js'

const SERVER_IP = apiUrl.apiUrl
const COMMON = 'mv1/'

//标签数据
global.TAG_LISTS_RESULTS = `${SERVER_IP}${COMMON}tag/tree-form`

//客流统计
global.GRAPH_CUSTOMER_SUM = `${SERVER_IP}${COMMON}analysis/graph-customer-sum` //客流统计折线图求和
global.GRAPH_CUSTOMER_DIFF = `${SERVER_IP}${COMMON}analysis/graph-customer-diff` //客流统计折线图比对
global.PIE_FEATURE_SUM = `${SERVER_IP}${COMMON}analysis/pie-feature-sum`  //特征饼图求和
global.GRAPH_FEATURE_SUM = `${SERVER_IP}${COMMON}analysis/graph-feature-sum`  //特征折线图求和
global.BAR_FEATURE_DIFF = `${SERVER_IP}${COMMON}analysis/bar-feature-diff`  //特征柱状图比对

global.GRAPH_ORDER_SUM = `${SERVER_IP}${COMMON}analysis/graph-order-sum`  //成交率折线图求和
global.GRAPH_ORDER_DIFF = `${SERVER_IP}${COMMON}analysis/graph-order-diff`  //成交率折线图比对

global.GRAPH_CUSTOMER_LOST_SUM = `${SERVER_IP}${COMMON}analysis/graph-customer-lost-sum`  //潜在客户流失率折线图求和
global.GRAPH_CUSTOMER_LOST_DIFF = `${SERVER_IP}${COMMON}analysis/graph-customer-lost-diff`  //潜在客户流失率折线图比对

global.GRAPH_ORDER_LOST_SUM = `${SERVER_IP}${COMMON}analysis/graph-order-lost-sum`  //成交客户流失率折线图求和
global.GRAPH_ORDER_LOST_DIFF = `${SERVER_IP}${COMMON}analysis/graph-order-lost-diff`  //成交客户流失率折线图比对

global.ANALYSIS_LIST = `${SERVER_IP}${COMMON}analysis/list`  //客流列表

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

/*订单管理*/
global.GET_ORDER_LIST = `${SERVER_IP}${COMMON}order/list`
global.DELE_OTDER = `${SERVER_IP}${COMMON}order/dele`

/*标签管理*/
//1、父级
// post tag/list 标签列表
global.GET_LABEL_LIST = `${SERVER_IP}${COMMON}tag/parent-list`
global.ADD_LABEL = `${SERVER_IP}${COMMON}tag/parent-adds`
global.EDIT_LABEL = `${SERVER_IP}${COMMON}tag/parent-edit`
global.DELE_LABEL = `${SERVER_IP}${COMMON}tag/parent-dele`

//2、子级
// post tag/childs-list 标签列表
global.GET_CHILD_LABEL_LIST = `${SERVER_IP}${COMMON}tag/childs-list`
global.ADD_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-adds`
global.EDIT_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-edit`
global.DELE_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-dele`

//获取特定的城市地区
global.STORE_LOCATE = `${SERVER_IP}${COMMON}store/locate`

//设备管理
global.DEVICE_LISTS = `${SERVER_IP}${COMMON}device/list`
global.DEVICE_EDIT = `${SERVER_IP}${COMMON}device/edit`
global.DEVICE_DISTRIBUTION = `${SERVER_IP}${COMMON}device/camera-deploy`
global.DEVICE_UN_DEPLOY = `${SERVER_IP}${COMMON}device/camera-un-deploy`
global.STORE_DEVICE_SUM_LISTS = `${SERVER_IP}${COMMON}device/device-list`

//设备版本
global.DEVICE_VERSION_LISTS_RESULTS = `${SERVER_IP}${COMMON}device-version/lists_results`

// post device/operation 按门店分配
global.SET_OPERATION = `${SERVER_IP}${COMMON}device/operation`


//门店管理
global.STORE_LISTS = `${SERVER_IP}${COMMON}store/lists`//带有分页的门店列表数据
global.STORE_LISTS_RESULTS = `${SERVER_IP}${COMMON}store/lists_results`//全部门店数据
global.STORE_ADDS = `${SERVER_IP}${COMMON}store/adds`
global.STORE_EDIT = `${SERVER_IP}${COMMON}store/edit`
global.STORE_DELE = `${SERVER_IP}${COMMON}store/dele`
global.DO_DISTINCT = `${SERVER_IP}${COMMON}store/do-distinct` //门店去重
global.STORE_LISTS_RESULT = `${SERVER_IP}${COMMON}store/list_result`//根据城市选择门店
global.SHORE_ORGANIZE_WHERE = `${SERVER_IP}${COMMON}store/list_result-where-organize`//根据门店架构选择门店


//帐号管理
global.STORE_USER_LISTS = `${SERVER_IP}${COMMON}account/list`
global.STORE_USER_ADDS = `${SERVER_IP}${COMMON}account/adds`
global.STORE_USER_VIEW = `${SERVER_IP}${COMMON}account/view`
global.STORE_USER_EDIT = `${SERVER_IP}${COMMON}account/edit`
global.STORE_USER_DELE = `${SERVER_IP}${COMMON}account/dele`
global.STORE_USER_PASSWORD_EDIT = `${SERVER_IP}${COMMON}account/edit-password`

//新门店账号管理
global.STORE_ACCOUNT_LISTS = `${SERVER_IP}${COMMON}store-account/list`
global.STORE_ACCOUNT_ADDS = `${SERVER_IP}${COMMON}store-account/adds`
global.STORE_ACCOUNT_VIEW = `${SERVER_IP}${COMMON}store-account/view`
global.STORE_ACCOUNT_EDIT = `${SERVER_IP}${COMMON}store-account/edit`
global.STORE_ACCOUNT_DELE = `${SERVER_IP}${COMMON}store-account/dele`
global.STORE_ACCOUNT_PASSWORD_EDIT = `${SERVER_IP}${COMMON}store-account/edit-password`

//门店架构组织
global.MERCHANT_ORGANIZE_TREE = `${SERVER_IP}${COMMON}merchant-organize/tree`
global.MERCHANT_ORGANIZE_ADDS = `${SERVER_IP}${COMMON}merchant-organize/adds`
global.MERCHANT_ORGANIZE_DELE = `${SERVER_IP}${COMMON}merchant-organize/dele`
global.MERCHANT_ORGANIZE_EDIT = `${SERVER_IP}${COMMON}merchant-organize/edit`

//提醒设置
global.MERCHANT_REMIND_VIEW = `${SERVER_IP}${COMMON}merchant-config/view-remind`
global.MERCHANT_REMIND_SET = `${SERVER_IP}${COMMON}merchant-config/remind`

//营业时间
global.MERCHANT_TIME_VIEW = `${SERVER_IP}${COMMON}merchant-config/view-time`
global.MERCHANT_TIME_SET = `${SERVER_IP}${COMMON}merchant-config/business-time`

//个人中心
global.USER_INFO = `${SERVER_IP}${COMMON}user/info`
global.USER_CHANGE_PASSWORD = `${SERVER_IP}${COMMON}user/change-password`
global.USER_EDIT_INFO = `${SERVER_IP}${COMMON}user/edit`
global.USER_SEND_PHONE = `${SERVER_IP}${COMMON}user/change-phone-sms`
global.USER_CKECK_PHONE = `${SERVER_IP}${COMMON}user/change-phone-check`
global.USER_SAVE_CHANGE_PHONE = `${SERVER_IP}${COMMON}user/change-phone-save`

//登录退出
global.USER_LOGIN = `${SERVER_IP}${COMMON}user/login`
global.USER_LOGOUT = `${SERVER_IP}${COMMON}user/logout`
//登录--忘记密码
global.USER_SEND_MSG = `${SERVER_IP}${COMMON}user/send-sms`
global.USER_CHECK_MSG = `${SERVER_IP}${COMMON}user/check-sms`
global.USER_CHANGE_PWD = `${SERVER_IP}${COMMON}user/change-password-forgot`



//商家部门管理
global.DEPARTMENT_LISTS = `${SERVER_IP}${COMMON}department/list`
global.DEPARTMENT_LISTS_RESULTS = `${SERVER_IP}${COMMON}department/list_results`
global.DEPARTMENT_ADDS = `${SERVER_IP}${COMMON}department/adds`
global.DEPARTMENT_EDIT = `${SERVER_IP}${COMMON}department/edit`
global.DEPARTMENT_DELE = `${SERVER_IP}${COMMON}department/dele`

//商家角色管理
global.ROLE_LISTS = `${SERVER_IP}${COMMON}merchant-role/list`
global.ROLE_LISTS_RESULTS = `${SERVER_IP}${COMMON}merchant-role/list-results`
global.ROLE_ADDS = `${SERVER_IP}${COMMON}merchant-role/adds`
global.ROLE_EDIT = `${SERVER_IP}${COMMON}merchant-role/edit`
global.ROLE_DELE = `${SERVER_IP}${COMMON}merchant-role/dele`

//商家角色权限和分配权限
global.ROLE_PERMISSION_EDIT = `${SERVER_IP}${COMMON}merchant-role/edit-permission`
global.ROLE_PERMISSION_VIEW = `${SERVER_IP}${COMMON}merchant-role/view-permission`


//商家帐号管理
global.USER_LISTS = `${SERVER_IP}${COMMON}merchant-account/list`
global.USER_ADDS = `${SERVER_IP}${COMMON}merchant-account/adds`
global.USER_VIEW = `${SERVER_IP}${COMMON}merchant-account/view`
global.USER_EDIT = `${SERVER_IP}${COMMON}merchant-account/edit`
global.USER_DELE = `${SERVER_IP}${COMMON}merchant-account/dele`
global.USER_PASSWORD_EDIT = `${SERVER_IP}${COMMON}merchant-account/edit-password`



//门店角色管理
global.STORE_ALL_ROLE_LIST = `${SERVER_IP}${COMMON}store-role/list-results` //获得所有岗位
global.STORE_ROLE_LIST = `${SERVER_IP}${COMMON}store-role/list`//分页岗位
global.STORE_ROLE_ADDS = `${SERVER_IP}${COMMON}store-role/adds`
global.STORE_ROLE_EDIT = `${SERVER_IP}${COMMON}store-role/edit`
global.STORE_ROLE_DELE = `${SERVER_IP}${COMMON}store-role/dele`
global.STORE_ROLE_VIEW = `${SERVER_IP}${COMMON}store-role/view`
global.STORE_LIST_RESULTS = `${SERVER_IP}${COMMON}store-role/list-results`
global.STORE_EDIT_PERMISSION = `${SERVER_IP}${COMMON}store-role/edit-permission`
global.STORE_VIEW_PERMISSION = `${SERVER_IP}${COMMON}store-role/view-permission`



//通知
global.NOTICE_DELE = `${SERVER_IP}${COMMON}message/mybox-delete`
global.NOTICE_INBOX_DELE = `${SERVER_IP}${COMMON}message/inbox-delete`
global.NOTICE_MESSAGE_SEND = `${SERVER_IP}${COMMON}message/message-send`
global.NOTICE_DRAFT = `${SERVER_IP}${COMMON}message/draft-save`
global.NOTICE_DETAIL = `${SERVER_IP}${COMMON}message/message-detail`
global.NOTICE_INBOX_LISTS = `${SERVER_IP}${COMMON}message/inbox-list`
global.NOTICE_MYBOX_LISTS = `${SERVER_IP}${COMMON}message/mybox-list`

//左侧菜单权限
global.USER_CHILD_MENU = `${SERVER_IP}${COMMON}user/child-menu`
global.USER_MENU = `${SERVER_IP}${COMMON}user/left-menu`

//岗位权限设置
global.MERCHANT_POWER_LIST = `${SERVER_IP}${COMMON}merchant-role/list-permission`
global.STORE_POWER_LIST = `${SERVER_IP}${COMMON}store-role/list-permission`



