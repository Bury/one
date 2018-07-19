/**
 * 门店管理
 */
import axios from 'axios'

export default {

  lists(list){
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  listsResults(list){
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_LISTS_RESULTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //提醒配置
  remindView () {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_REMIND_VIEW).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  remindSet (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_REMIND_SET, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  timeView () {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_TIME_VIEW).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  timeSet (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_TIME_SET, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}