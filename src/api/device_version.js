/**
 * 设备管理
 */
import axios from 'axios'

export default {

	listsResults () {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DEVICE_VERSION_LISTS_RESULTS).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

}