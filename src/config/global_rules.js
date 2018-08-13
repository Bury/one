const rules={
		
        //用户名验证
		username(text){
			return [
	    		{ required: true, message: text, trigger: 'blur' },
	        	{
	        		validator:(rule,value,callback) =>{
	        			if(value.match(/^[a-zA-Z0-9]{5,16}$/)){
	        				callback();
	        			}else{
	        				callback("只能是字母和数字5-16位")
	        			}
	        		},
	        		trigger:'blur'
	        	}
	    	]
		},
		
		//姓名验证
		truename(){
			return [
	    		{ required: true, message: '请输入姓名', trigger: 'blur' },
	    		
	        	{
	                validator: (rule, value, callback) => {
		                    if (value.match(/^[a-zA-Z\u4e00-\u9fa5]{2,8}$/)){
		                        callback();
		                    } else {
		                        callback("请输入2-8位汉字或英文");
		                    }
	                	},
	                	trigger: 'blur'
	            	}
	    	]
		},
        
        //密码验证
		password() {
			 return [
		        { required: true, message: '请输入密码', trigger: 'blur' },
		        { validator:(rule,value,callback) =>{
	        			if(value.match(/^[a-zA-Z0-9]{5,16}$/)){
	        				callback();
	        			}else{
	        				callback("数字和字母6-16位")
	        			}
	        		},
	        		trigger:'blur' 
		        }
			]
		},
		
		repassword(pwd) {
			 return [
		        { required: true, message: '请输入密码', trigger: 'blur' },
		        {
			        validator: (rule, value, callback) => {
			             if (value !== pwd) {
			             	console.log(pwd)
			                    callback('两次输入密码不一致!');
			               } else {
			                    callback();
			                }
			            },
			         trigger: 'blur'
			    }
			]
		},
        
        //手机号验证
		phone(){
			return [
	        		{ required: true, message: '请输入手机号', trigger: 'blur' },
	          		{
	                	validator: (rule, value, callback) => {
		                    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
		                        callback();
		                    } else {
		                        callback("请输入正确的手机号");
		                    }
	                	},
	                	trigger: 'blur'
	            	}
	        	]
		},
		
		//select选择器验证
		selectRule(text){
			return [
			    { required: true, message: text, trigger: 'change' }
			]
			
		}
     
	
	
}

export default {
  rules
}