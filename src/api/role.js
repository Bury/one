/**
 * 角色管理
 */
import axios from 'axios'

export default {

  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ROLE_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELE_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}