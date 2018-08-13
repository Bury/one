/**
 * 当前用户登录、退出、修改密码、信息
 */
import axios from 'axios'

export default {
  lists(list){
    return new Promise((resolve, reject) => {
      axios.post(global.USER_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  view () {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_INFO).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getUserInfo () {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_INFO).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editUser (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_EDIT_INFO,list).then((res) => {
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
  menu (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_MENU, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  childMenu (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_CHILD_MENU, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
