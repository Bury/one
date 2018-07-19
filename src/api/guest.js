/**
 * 来客列表 
 */
import axios from 'axios'

export default {
	
	lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_LISTS, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  

}