/**
 * 门店管理
 */
import axios from 'axios'

export default {

  lists(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_STORE_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_STORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_STORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELE_STORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //提醒配置
  getRemind () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_REMIND).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  setRemind (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_REMIND, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getTime () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_TIME).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  setTime (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_TIME, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}