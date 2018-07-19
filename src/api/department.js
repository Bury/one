/**
 * 角色管理
 */
import axios from 'axios'

export default {

  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEPARTMENT_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEPARTMENT_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEPARTMENT_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEPARTMENT_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  lists_results (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEPARTMENT_LISTS_RESULTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}