/**
 * 获取省市
 */
import axios from 'axios'

export default {
	
	cityData(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.STORE_LOCATE,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	}
	
}