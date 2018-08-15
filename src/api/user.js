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
  //忘记密码
  sendSms (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_SEND_MSG, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkSms (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_CHECK_MSG, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  passwordForget (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_CHANGE_PWD, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //个人中心修改手机号
  phoneSms (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_SEND_PHONE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  phoneCheck (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_CKECK_PHONE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  savePhone (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_SAVE_CHANGE_PHONE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
