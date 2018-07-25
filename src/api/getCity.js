/*
 * 获取本地项目省市区json
 * */

import axios from 'axios'
  export default  {
  	
  	
    getCityData(){
		return new Promise((resolve, reject) => {
	      axios.get('static/resource/city.json').then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	}
     

 }