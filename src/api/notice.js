/**
 * 通知
 */
import axios from 'axios'

export default {

  noticeDele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  inboxDele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_INBOX_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  send (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_MESSAGE_SEND,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  draft (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_DRAFT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  detail (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_DETAIL,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  inboxList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_INBOX_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  myboxList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NOTICE_MYBOX_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
