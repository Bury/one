    import deviceApi from '@/api/device'
	import deviceVersionApi from '@/api/device_version'
	import remindApi from '@/api/remind'
	import storeApi from '@/api/store'
	import getCity from '@/api/getCity'
	export default{
		name:'device',
		data(){
			return{
				tableData: [],
				allStores:[],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        allVersions:[],
		        createdTimes:['',''],
		        startTimes:['',''],
		        requestParameters: {
	                page: 1,
	                page_size:10,
	                device_id:'',
	                version:'',
	                belong_sid:'',
	                name:'',
	                created_at_begin:'',
	                cteated_at_end:'',
	                start_at_begin:'',
	                start_at_end:'',
	                is_allocate:1
	            },
	            distributionFormVisible:false,
	            distributionForm:{
	            	device_id:'',
	            	belong_sid:''
	            },
	            operationRules:{},

	            editFormVisible:false,
	            editForm:{
	            	device_id:'',
	            	store_name:'',
	            	locate:'',
	            	locate_desc:''
	            },
	            editRules:{
	            	locate_desc:[
	            		{ required: true, message: '请输入安装位置', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
	            	]
	            },
	            cityData:[],
	            cityCode:[],
	            dialogCityCode:[],
	            props:{
	            	value:'code',
	            	label:'name',
	            	children:"children"
	            },
	            nodatatext:"请选择省市区"
			}
		},
		created:function(){
			this.lists();
			this.getDeviceVersionListsResults();
			this.getCityData()
		},
		methods:{
			lists(){
				this.$data.requestParameters.created_at_begin = this.$data.createdTimes[0];
	            this.$data.requestParameters.cteated_at_end = this.$data.createdTimes[1];
	            this.$data.requestParameters.start_at_begin = this.$data.startTimes[0];
	            this.$data.requestParameters.start_at_end = this.$data.startTimes[1];
			    let qs = require('querystring')
        		deviceApi.lists(this.$data.requestParameters).then((res) => {
        			if(res.data.errno === 0){	
                        this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
                    }else{
                        this.$message(res.data.msg)
        			}

        		})
			},
			getStores(){
                
			},
			getDeviceVersionListsResults(){
				deviceVersionApi.listsResults().then((res) => {
        			if(res.data.errno === 0){
						this.$data.allVersions = res.data.data;
                    }else{
                        this.$message(res.data.msg)
        			}

        		})
			},
			handleCurrentChange(currentPage) {
	            
	            this.$data.requestParameters.page = currentPage;
	            this.lists();
	        },
			onSubmit(){
				this.lists();
			},
			fnDistribution(row){
				this.$data.distributionForm.belong_sid = row.store.id;
				this.$data.distributionForm.device_id = row.device_id;
				this.$data.nodatatext = "请选择省市区";
				this.$data.dialogCityCode  = [];
				this.$data.distributionFormVisible = true;
			},
			distributionCancel(){
				this.$data.distributionFormVisible = false;
	            this.$data.distributionForm = {
	            	device_id:'',
	            	belong_sid:''
	            };
			},
			distributionSubmit(){
				let qs = require('querystring');				
        		deviceApi.distribution(qs.stringify(this.$data.distributionForm)).then((res) => {
        			if(res.data.errno === 0){
						this.lists();
						this.$data.distributionFormVisible = false;
        			}else{

        			}

        		})
			},
			fnEdit(row){
				this.$data.editForm = {
	            	device_id: row.device_id,
	            	store_name: row.store.name,
	            	locate: row.locate == '' ? 'other' : row.locate,
	            	locate_desc: row.locate_desc
	            },
				this.$data.editFormVisible = true;
			},
			editCancel(){
				this.$data.editForm = {
	            	device_id: '',
	            	store_name: '',
	            	locate: '',
	            	locate_desc: ''
	            }
				this.$data.editFormVisible = false;
			},
			editSubmit(formName){
				
				this.$refs[formName].validate((valid) => {
					
			        if (valid) {
						let list = {
							'id':this.$data.editForm.device_id,
							'locate': this.$data.editForm.locate,
	            			'locate_desc': this.$data.editForm.locate_desc
						}
						let qs = require('querystring');
		        		deviceApi.edit(qs.stringify(list)).then((res) => {
		        			if(res.data.errno === 0){
								
								this.$message({
						            type: 'success',
						            message: '操作成功'
					          	});
								this.lists();
								this.editCancel();
		        			}else{

		        			}

		        		})
			        }
		        });
			},
			handleClick(dom){
				switch (dom.name){
					case "first":
					    this.$data.requestParameters.is_allocate = 1;
                	    this.lists();
                	    break;
                	case "second":
                	    this.$data.requestParameters.is_allocate = 0;
                	    this.lists();
                	    break;
                }
			},
			getCityData(){
				 getCity.getCityData().then((res) => {
        			if(res.status === 200){
        				 this.$data.cityData = res.data
        			}else{
        				this.$message(res.statusText)
        			}
        		})
			},			
			getStore(t){
				let qs = require('querystring');
				 storeApi.getStoreResult(qs.stringify({locate:t[t.length - 1]})).then((res) => {
        			if(res.data.errno === 0){
      				     if(res.data.data != null && res.data.data.length>0){
      				     	this.$data.allStores = res.data.data;
      				     }else{
      				     	this.$data.nodatatext = "此地区暂无门店";
      				     	this.$data.distributionForm.belong_sid = "";
      				     }      				     
        			}else{
        				this.$message(res.statusText)
        			}
        		})
			},
			searchStore(){
				this.getStore(this.$data.cityCode)
			},
			dialogStore(){				
				this.getStore(this.$data.dialogCityCode)
			}
		}
	}