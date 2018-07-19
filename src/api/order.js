/**
 * 订单列表
 */
import axios from 'axios'

export default {
	lists (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.ORDER_LISTS,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	dele (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.ORDER_DELE,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	}
}