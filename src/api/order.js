/**
 * 订单列表
 */
import axios from 'axios'

export default {
	lists (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_ORDER_LIST,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	dele (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DELE_OTDER,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	}
}
