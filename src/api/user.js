/**
 * 当前用户登录、退出、修改密码、信息
 */
import axios from 'axios'

export default {
  view () {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_VIEW).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  changePWD (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_CHANGE_PASSWORD, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  logout (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_LOGOUT, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  login (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_LOGIN, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  

}