/**
 * 客流统计
 */
import axios from 'axios'

export default {	
	
	//客流统计折线图求和
	getCustomerSum (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_CUSTOMER_SUM,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//客流统计折线图比对
	getCustomerDiff (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_CUSTOMER_DIFF,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//特征饼图求和
	getFeaturePie (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.PIE_FEATURE_SUM,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//特征柱状图比对
	getFeatureDiff (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.BAR_FEATURE_DIFF,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	
	
	//特征折线图求和
	getFeatureGraph (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_FEATURE_SUM,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//成交率折线图求和
	getOrderSum (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_ORDER_SUM,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//成交率折线图比对
	getOrderDiff(list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_ORDER_DIFF,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//潜在客户流失率折线图求和
	customerlostSum(list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_CUSTOMER_LOST_SUM,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//潜在客户流失率折线图比对
	customerlostDiff(list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_CUSTOMER_LOST_DIFF,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//成交客户流失率折线图求和
	orderlostSum(list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_ORDER_LOST_SUM,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//成交客户流失率折线图比对
	orderlostDiff(list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GRAPH_ORDER_LOST_DIFF,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	 
	
	//客流列表
	customerList(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.ANALYSIS_LIST,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	//客流统计，门店数据统计
	statisticsNew(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.STORE_STATISTICS_NEW,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
}