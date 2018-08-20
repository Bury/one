import storeApi from '@/api/store'
import getCity from '@/api/getCity'
import storeRoleApi from '@/api/store_role'
import globalRules from '@/config/global_rules'
	export default{
		name:'store-set',
		data(){
			return{
				tableData: [],
				cityData:[],
				organizes:[],
				selectStore:[],
				nodatatext:'请选择门店架构',
				defaultAttr:{
					label:'name',
					value:'id',
					children:'children',
				},
				lookData:{
					organize:[],
					store_id:'',
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
		          phone:globalRules.rules.phone(),
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
	                page_size:20,
	                merchant_organize_id:'',
					store_id:'',
	            },
			}
		},
		watch: {
               // dialogFormVisible: function() {
               // 	this.$refs.ruleForm.resetFields()
               // }
        },
		created:function(){
			this.storeLists();
			this.getCityData();//获得城市数据
			this.getOrganizes();//获得门店架构
		},
		methods: {
			//列表
			storeLists(){
				let qs = require('querystring')
	    		storeApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			console.log(res)
	    			if(res.data.errno === 0){
	    				if(res.data.data !== null){
	    				  this.$data.tableData = res.data.data.list;
						  this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		  this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    				}else{
	    					this.$data.tableData = [];
	    				}
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},

	    	handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.storeLists();
	        },

	        clearRuleForm(){
	        	this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:'',
		          	locate:[],
		          	address:'',
		          	merchant_organize_id:[],
		        }

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
		        })
			},
			fnEdit(row){
				let moi = [];
				row.organizes.id.split(',').forEach(function(val){
					moi.push(parseInt(val))
				});
				this.$data.dialogTitle = '门店编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm = {
					      name: row.name,
		          	merchant_organize_id:row.organizes.id.split(','),
		          	phone:row.phone,
		          	locate:[String(row.province.code),String(row.city.code),String(row.area.code)],
		          	merchant_organize_id:moi,
                address:row.address,
				}
				this.$data.dialogFormVisible = true;

			},
			fnAdds(){
				this.$data.dialogTitle = '门店添加';
				this.$data.currentId = "";
				this.clearRuleForm();
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
				this.clearRuleForm();
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						if(this.$data.currentId !== ''){
							let loc = this.$data.ruleForm.locate[this.$data.ruleForm.locate.length - 1]
							let mer = this.$data.ruleForm.merchant_organize_id[this.$data.ruleForm.merchant_organize_id.length - 1]
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name,
					          	'phone':this.$data.ruleForm.phone,
					          	'locate':loc,
					          	'address':this.$data.ruleForm.address,
					          	'merchant_organize_id':mer,
							}
							let qs = require('querystring')
			        		storeApi.edit(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									this.$message({
				                      message: '修改成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.storeLists();
									this.$data.currentId = '';
									this.clearRuleForm();
									this.$data.dialogFormVisible = false;

			        			}else{
									this.$message.error(res.data.msg);
								}

			        		})
						}else{
							let loc = this.$data.ruleForm.locate[this.$data.ruleForm.locate.length - 1]
							let mer = this.$data.ruleForm.merchant_organize_id[this.$data.ruleForm.merchant_organize_id.length - 1]
							let list = {
						        'name': this.$data.ruleForm.name,
					          	'phone':this.$data.ruleForm.phone,
					          	'locate':parseInt(loc),
					          	'address':this.$data.ruleForm.address,
					          	'merchant_organize_id':mer,
						    }
						    let qs = require('querystring')
			        		storeApi.adds(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){

									this.$message({
				                      message: '添加成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.storeLists();
									this.$data.currentId = '';
									this.clearRuleForm();
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

			getStore(){
				this.$data.lookData.store_id = "";
				let organ = this.$data.lookData.organize[this.$data.lookData.organize.length - 1]
				let data = {
					merchant_organize_id:organ
				};
				storeApi.organizeStoreResult(data).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data == null){
							this.$data.nodatatext = "暂无门店"
							this.$data.selectStore = [];
						}else{
							this.$data.selectStore = res.data.data
						}
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			lookSubmit(){
				if(this.$data.lookData.organize.length === 0){
					this.$message("请选择门店架构");
					return false;
				}else{
				    this.$data.requestParameters.merchant_organize_id = this.$data.lookData.organize[this.$data.lookData.organize.length - 1];
				    this.$data.requestParameters.store_id = this.$data.lookData.store_id;
				}
				console.log(this.$data.requestParameters)
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
