/**
 * 设备管理
 */
import axios from 'axios'

export default {
	lists (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DEVICE_LISTS,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	edit(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.DEVICE_EDIT,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	distribution(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.DEVICE_DISTRIBUTION,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	storeDeviceSumLists (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.STORE_DEVICE_SUM_LISTS,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	setOperation(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.SET_OPERATION,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	}
}