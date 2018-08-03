/**
 * 门店角色管理
 */
import axios from 'axios'

export default {

  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_ROLE_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_ROLE_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_ROLE_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_ROLE_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  view (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_ROLE_VIEW,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  listResults (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_LIST_RESULTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_EDIT_PERMISSION,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  viewPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_VIEW_PERMISSION,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  organizeTree(list){
  	return new Promise((resolve, reject) => {
      axios.post(global.MERCHANT_ORGANIZE_TREE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  organizeAdds(list){
  	return new Promise((resolve, reject) => {
      axios.post(global.MERCHANT_ORGANIZE_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  organizeDele(list){
  	return new Promise((resolve, reject) => {
      axios.post(global.MERCHANT_ORGANIZE_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  organizeEdit(list){
  	return new Promise((resolve, reject) => {
      axios.post(global.MERCHANT_ORGANIZE_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }


}
