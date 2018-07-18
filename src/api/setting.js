/**
 * 个人中心
 */
import axios from 'axios'

export default {

  //帐号
  accountList(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ACCOUNT_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addAccount (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  detailAccount (list){
    return new Promise((resolve, reject) => {
      axios.post(global.DETAIL_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editAccount (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  deleAccount (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELE_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  changPwdAccount(list){
    return new Promise((resolve, reject) => {
      axios.post(global.CHANGEpWD_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })

  },

  allPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ALL_PERMISSION,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  editPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_PERMISSION,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}