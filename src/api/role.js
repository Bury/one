/**
 * 角色管理
 */
import axios from 'axios'

export default {

  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  lists_results (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_LISTS_RESULTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  editPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_PERMISSION_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  viewPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_PERMISSION_VIEW,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
//岗位权限设置
  merchantRoleLists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MERCHANT_POWER_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
 storeRoleLists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_POWER_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },



}
