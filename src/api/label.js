/**
 * 标签列表
 */
import axios from 'axios'

export default {
	labelList (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_LABEL_LIST,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	addLabel (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.ADD_LABEL,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	editLabel (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.EDIT_LABEL,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	deleLabel (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DELE_LABEL,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	//子级
	labeChildlList (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_CHILD_LABEL_LIST,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	addChildLabel (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.ADD_CHILD_LABEL,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	editChildLabel (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.EDIT_CHILD_LABEL,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	deleChildLabel (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DELE_CHILD_LABEL,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},


}