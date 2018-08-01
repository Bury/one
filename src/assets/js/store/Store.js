import storeApi from '@/api/store'
import getCity from '@/api/getCity'
import storeRoleApi from '@/api/store_role'
	export default{
		name:'store-set',
		data(){
			return{
				tableData: [],
				cityData:[],
				organizes:[],
				defaultAttr:{
					label:'name',
					value:'id',
					children:'children',					
				},	
				lookData:{
					organize:[],
					store_name:''
				},
				props:{
	            	value:'code',
	            	label:'name',
	            	children:"children"
	            },
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        dialogTitle:"",
				dialogFormVisible: false,
		        ruleForm: {
		          	name: '',
		          	phone:'',		          	
		          	person_in_charge:'',		          	
		          	locate:[],
		          	address:'',
		          	merchant_organize_id:[],
		        },
		        initVal:{
		        	initlocate:'',
		        	initorganize:'',
		        },
		        currentId:'',
		        rules: {
		          name: [
		            { required: true, message: '请输入门店名称', trigger: 'blur' },
		            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
		          ],
		          person_in_charge:[
		          	{ required: true, message: '请输入负责人姓名', trigger: 'blur' },
		            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
		          ],
		          phone:[
		          	{ required: true, message: '请输入手机号码', trigger: 'blur' },
		          	{
		                validator: (rule, value, callback) => {
		                    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
		                        callback();
		                    } else {
		                        callback("请输入正确的手机号码！");
		                    }
		                },
		                trigger: 'blur'
		            }
		          ],
		          address:[
		             { required: true, message: '请输入详细地址', trigger: 'blur' },
		             { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
		          ],
		          merchant_organize_id:[
		             { required: true, message: '请选择门店架构'},
		          ],
		          locate:[
		             {required: true, message: '请选择省市'}
		          ]
		        },
				requestParameters: {
	                page: 1,
	                page_size:10,
	                organize:'',
					store_name:'',
	            },
			}
		},
		created:function(){
			this.storeLists();
			this.getCityData();
			this.getOrganizes();
		},
		methods: {
			//列表
			storeLists(){
				let qs = require('querystring')
	    		storeApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res.data.errno === 0){
						console.log(res);
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},

	    	handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.storeLists();
	        },

			fnRemove(row){
				this.$confirm('确认删除该门店：'+row.name+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		storeApi.dele(qs.stringify(list)).then((res) => {
	        			if(res.data.errno === 0){
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.storeLists();
	        			}else{
							this.$message.error(res.data.msg);
	        			}

	        		})
		        }).catch(() => {
		          // this.$message({
		          //   type: 'info',
		          //   message: '已取消删除'
		          // });
		        });
			},
			fnEdit(row){
				console.log(row)
				this.$data.dialogTitle = '门店编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm = {
					name: row.name,
		          	phone:row.phone,				          	
		          	locate:[row.province.code,row.city.code,row.area.code],
		          	merchant_organize_id:row.organizes.id.split(','),
				}

				this.$data.dialogFormVisible = true;

			},
			fnAdds(){				
				this.$data.dialogTitle = '门店添加';
				this.$data.currentId = "";
				this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:'',
		          	locate:[],
		          	address:'',
		          	merchant_organize_id:[],
		        };
				this.$data.dialogFormVisible = true;
			},
			cancel(){
				this.$data.dialogFormVisible = false;
				this.$data.currentId = '';
				this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:'',
		          	locate:[],
		          	address:'',
		          	merchant_organize_id:[],
		        };
		        
		        this.$refs.ruleForm.resetFields()
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						if(this.$data.currentId !== ''){
							let loc = this.$data.ruleForm.phone[this.$data.ruleForm.phone.length - 1]
							let mer = this.$data.ruleForm.merchant_organize_id[this.$data.ruleForm.merchant_organize_id.length - 1]
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name,
					          	'person_in_charge':this.$data.ruleForm.person_in_charge,
					          	'phone':this.$data.ruleForm.phone,
					          	'locate':loc,
					          	'address':this.$data.ruleForm.address,
					          	'merchant_organize_id':mer,
							}
							let qs = require('querystring')
			        		storeApi.edit(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '修改成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.storeLists();
									this.$data.currentId = '';
									this.$data.ruleForm = {
							          	name: '',
		          	                    person_in_charge:'',
		          	                    phone:'',
		          	                    locate:[],
		          	                    address:'',
		          	                    merchant_organize_id:[],
							        };
									this.$data.dialogFormVisible = false;

			        			}else{
									this.$message.error(res.data.msg);
								}

			        		})
						}else{
							let loc = this.$data.ruleForm.phone[this.$data.ruleForm.phone.length - 1]
							let mer = this.$data.ruleForm.merchant_organize_id[this.$data.ruleForm.merchant_organize_id.length - 1]
							let list = {
						        'name': this.$data.ruleForm.name,
					          	'person_in_charge':this.$data.ruleForm.person_in_charge,
					          	'phone':this.$data.ruleForm.phone,
					          	'locate':loc,
					          	'address':this.$data.ruleForm.address,
					          	'merchant_organize_id':mer,
						    }
						    let qs = require('querystring')
						    console.log(list)
			        		storeApi.adds(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									
									this.$message({
				                      message: '添加成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.storeLists();
									this.$data.currentId = '';
									this.$data.ruleForm = {
							          	name: '',
		          	                    person_in_charge:'',
		          	                    phone:'',
		          	                    locate:[],
		          	                    address:'',
		          	                    merchant_organize_id:[],
							        };
									this.$data.dialogFormVisible = false;

			        			}else{
			        				this.$message.error(res.data.msg);

			        			}

			        		})
						}
			        }
		        });
			},
			fnGoPage(row){
				this.$router.push({
					name: 'StoreAccount',
					query: {
	                    StoreId: row.id,
	                    StoreName:row.name
	                }
				});
			},
			
			switchRepet(row,flag){
				let alertmsg= ["关闭去除重复?","开启去除重复？"];
				let qs = require('querystring');
				this.$confirm(alertmsg[flag], '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(()=>{
		        	 storeApi.switchRepet(qs.stringify({id:row.id,is_distinct:flag})).then((res) => {
		        	 	if(res.data.errno === 0){
		        	 		this.storeLists();
		        	 	}else{
		        	 		this.$message(res.data.msg)
		        	 	}
		        	 })
		        })
			},
			getOrganizes(){
				storeRoleApi.organizeTree().then((res) => {
					if(res.data.errno == 0) {
						this.$data.organizes = res.data.data
					} else {
						this.$message(res.data.msg)
					}
				})
				
			},
			
			lookSubmit(){
				console.log(this.$data.requestParameters)
				this.$data.requestParameters.organize = this.$data.lookData.organize.join();
				this.$data.requestParameters.store_name = this.$data.lookData.store_name;
				
				this.storeLists();
			},
			
			getCityData(){
				 getCity.cityData().then((res) => {
        			if(res.status === 200){
        				 this.$data.cityData = res.data
        			}else{
        				this.$message(res.statusText)
        			}
        		})
			}
			
		}
	}