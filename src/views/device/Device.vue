<template>
	<div class="device-box">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
				<el-form-item label="添加时间：">
					<el-date-picker
				      v-model="createdTimes"
				      type="datetimerange"
				      range-separator="至"
				      start-placeholder="开始时间"
				      end-placeholder="结束时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="设备编号：">
			    	<el-input v-model="requestParameters.device_id"></el-input>
			  	</el-form-item>
			  	<el-form-item label="版本：">
				    <el-select v-model="requestParameters.version" placeholder="请选择">
				      <el-option v-for="(item,idx) in allVersions" :label="allVersions[idx].val" :value="allVersions[idx].id" :key="idx"></el-option>
				    </el-select>
			  	</el-form-item>
				<el-form-item label="启用时间：">
					<el-date-picker
				      v-model="startTimes"
				      type="datetimerange"
				      range-separator="至"
				      start-placeholder="开始时间"
				      end-placeholder="结束时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="所属门店：">
				    <el-select v-model="requestParameters.belong_sid" placeholder="请选择">
				        <el-option v-for="(item,idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width:1312px;text-align:center;">
	    	<el-table-column fixed prop="device_id" label="设备编号" width="120"></el-table-column>
		    <el-table-column prop="version" label="版本" width="100"></el-table-column>
		    <el-table-column label="添加时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.created_at | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="启用时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.start_at | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="是否启用" width="90">
		    	<template slot-scope="scope">
		    		{{scope.row.is_start == 0 ? '未启用' : '已启用'}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="store.name" label="所属门店" width="220"></el-table-column>
		    <el-table-column label="安装位置" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.locate}} —— {{scope.row.locate_desc}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="分配状态" width="90">
		    	<template slot-scope="scope">
		    		{{scope.row.belong_sid == 0 ? '未分配' : '已分配'}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="status" label="设备状态" width="90">
		    	<template slot-scope="scope">
		    		{{scope.row.status == 0 ? '断开' : '正常'}}
		    	</template>
		    </el-table-column>
		    <el-table-column fixed="right" label="操作" width="120">
			    <template slot-scope="scope">
			        <el-button @click="fnOperation(scope.row)" type="text" size="small">分配</el-button>
			        <el-button @click="fnEdit(scope.row)" type="text" size="small">编辑</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

	    <!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1332px;">
			<el-pagination 
				background
	            class="pagination" 
	            layout="prev, pager, next" 
	            small 
	            @current-change="handleCurrentChange" 
	            :current-page="pagination.currentPage" 
	            :page-size="requestParameters.page_size"
	            :total="pagination.totalCount">
	        </el-pagination>
		</div>

		<!-- 分配 -->
		<el-dialog title="分配" :visible.sync="operationFormVisible">
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">设备编号：</span>{{operationForm.device_id}}</div>
		 	<el-form :model="operationForm" :rules="operationRules" ref="operationForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
			    <el-form-item label="所属门店：" prop="belong_sid">
			    	<el-select v-model="operationForm.belong_sid" placeholder="请选择">
				        <el-option v-for="(item,idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
				    </el-select>
			    </el-form-item>
		    </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="operationCancel">取 消</el-button>
		    <el-button type="primary" @click="operationSubmit">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible">
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">设备编号：</span>{{editForm.device_id}}</div>
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">所属门店：</span>{{editForm.store_name}}</div>
		 	<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
			    <el-form-item label="类型：">
			    	<el-select v-model="editForm.locate" placeholder="请选择">
				        <el-option label="收银" value="cashier"></el-option>
				        <el-option label="其他" value="other"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="安装位置：" prop="locate_desc">
			    	<el-input v-model="editForm.locate_desc"></el-input>
			  	</el-form-item>
		    </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editCancel">取 消</el-button>
		    <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import deviceApi from '../../api/device'
	import remindApi from '../../api/remind'
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
	                start_at_end:''
	            },
	            operationFormVisible:false,
	            operationForm:{
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
	            }
			}
		},
		created:function(){
			this.deviceList();
			this.allVersion();
			this.getStores();
		},
		methods:{
			deviceList(){
				this.$data.requestParameters.created_at_begin = this.$data.createdTimes[0];
	            this.$data.requestParameters.cteated_at_end = this.$data.createdTimes[1];
	            this.$data.requestParameters.start_at_begin = this.$data.startTimes[0];
	            this.$data.requestParameters.start_at_end = this.$data.startTimes[1];
			    let qs = require('querystring');
        		deviceApi.deviceList(qs.stringify(this.$data.requestParameters)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res) 
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;

        			}else{

        			}
        			
        		})
			},

			getStores(){
				remindApi.getStores().then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.allStores = res.data.data;
        			}else{

        			}
        			
        		})
			},
			allVersion(){
				deviceApi.allVersion().then((res) => {
        			if(res.data.errno === 0){
						console.log(res) 
						this.$data.allVersions = res.data.data;

        			}else{

        			}
        			
        		})
			},
			handleCurrentChange(currentPage) {
	            console.log(currentPage)
	            this.$data.requestParameters.page = currentPage;
	            this.deviceList();
	        },
			onSubmit(){
				this.deviceList();
			},
			fnOperation(row){
				this.$data.operationForm.belong_sid = row.store.id;
				this.$data.operationForm.device_id = row.device_id;
        		remindApi.getStores().then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.allStores = res.data.data;
						this.$data.operationFormVisible = true;
        			}else{

        			}
        			
        		})
			},
			operationCancel(){
				this.$data.operationFormVisible = false;
	            this.$data.operationForm = {
	            	device_id:'',
	            	belong_sid:''
	            };
			},
			operationSubmit(){
				let qs = require('querystring');
        		deviceApi.setDepoly(qs.stringify(this.$data.operationForm)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res) 
						this.deviceList();
						this.$data.operationFormVisible = false;
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
				console.log(formName)
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						let list = {
							'locate': this.$data.editForm.locate,
	            			'locate_desc': this.$data.editForm.locate_desc
						}
						let qs = require('querystring');
		        		deviceApi.editDevice(qs.stringify(list)).then((res) => {
		        			if(res.data.errno === 0){
								console.log(res) 
								this.deviceList();
								this.editCancel();
		        			}else{

		        			}
		        			
		        		})
			        } 
		        });
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>