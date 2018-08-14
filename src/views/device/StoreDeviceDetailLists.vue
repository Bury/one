<template>
	<div class="device-box">
		<h4>
			{{this.$route.query.storeName}}
		</h4>
		<!-- 列表 -->
    <!--<table width="99%" class="table-bordered">-->
      <!--<thead style="background-color: #d1d1d1">-->
      <!--<tr height="40">-->
        <!--<th class="col-md-1 text-center">序号</th>-->
        <!--<th class="col-md-1 text-center">编号</th>-->
        <!--<th class="col-md-1 text-center">版本</th>-->
        <!--<th class="col-md-1 text-center">类型</th>-->
        <!--<th class="col-md-1 text-center">门店</th>-->
        <!--<th class="col-md-2 text-center">位置</th>-->
        <!--<th class="col-md-1 text-center">运行情况</th>-->
        <!--<th class="col-md-1 text-center">是否启用</th>-->
        <!--<th class="col-md-2 text-center">添加时间</th>-->
        <!--<th class="col-md-1 text-center">操作</th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody v-if="tableData.length > 0" style="text-align: center">-->
      <!--<tr v-for="(item,index) in tableData" :key="index" height="40">-->
        <!--<td>{{item.id}}</td>-->
        <!--<td>{{item.device_id}}</td>-->
        <!--<td>{{item.version}}</td>-->
        <!--<td>-->
          <!--<span v-if="item.locate = 'other'">其他</span>-->
          <!--<span v-else>收银</span>-->
        <!--</td>-->
        <!--<td>-->
						<!--<span v-if="item.store.name.length>0">-->
				         <!--{{item.store.name}}-->
			             <!--</span>-->
          <!--<span v-else>未分配</span>-->
        <!--</td>-->
        <!--<td>{{item.locate_desc}}</td>-->
        <!--<td>{{item.status == 0 ? '断开' : '正常'}}</td>-->
        <!--<td>{{item.is_start == 0 ? '是' : '否'}}</td>-->
        <!--<td>{{item.created_at | date(4)}}</td>-->
        <!--<td>-->
          <!--<el-button v-if="item.store.name.length>0" @click="fnDistribution(item)" type="text" size="small">重新分配</el-button>-->
          <!--<el-button v-else @click="fnDistribution(item)" type="text" size="small">分配</el-button>-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--<tbody v-else style="text-align: center">-->
      <!--<tr>-->
        <!--<td colspan="10" height="50">暂无数据</td>-->
      <!--</tr>-->
      <!--</tbody>-->
    <!--</table>-->
		<el-table :data="tableData" border style="width:99%;text-align:center;">
			<el-table-column fixed prop="id" label="序号" min-width="100"></el-table-column>
	    	<el-table-column fixed prop="device_id" label="编号" min-width="120"></el-table-column>
	    	<el-table-column prop="version" label="版本" min-width="100"></el-table-column>
	    	<el-table-column label="类型" width="120">
	    		<template slot-scope="scope">
	    			{{scope.row.type == 'face' ? '人脸摄像头' : scope.row.type}}
	    		</template>
	    	</el-table-column>
		    <el-table-column label="安装位置" min-width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.locate}} —— {{scope.row.locate_desc}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="status" label="运行情况" width="90">
		    	<template slot-scope="scope">
		    		{{scope.row.status == 0 ? '断开' : '正常'}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="是否启用" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.is_start == 0 ? '是' : '否'}}
		    	</template>
		    </el-table-column>
		    <!--<el-table-column label="添加时间" min-width="160">-->
		    	<!--<template slot-scope="scope">-->
		    		<!--{{scope.row.created_at | date(4)}}-->
		    	<!--</template>-->
		    <!--</el-table-column>-->
		    <el-table-column fixed="right" label="操作" min-width="120">
			    <template slot-scope="scope">
			        <el-button @click="fnOperation(scope.row)" type="text" size="small">分配</el-button>
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
			<h3 style="margin-bottom:10px;">基本信息：</h3>
			<el-table :data="tableData" border style="text-align:center;margin-bottom:30px;">
		    	<el-table-column prop="device_id" label="编号" width="120"></el-table-column>
			    <el-table-column label="种类" width="120">
			    	<template slot-scope="scope">
			    		{{scope.row.type == 'face' ? '人脸摄像头' : scope.row.type}}
			    	</template>
			    </el-table-column>
			    <el-table-column label="添加时间" width="160">
			    	<template slot-scope="scope">
			    		{{scope.row.created_at | date(4)}}
			    	</template>
			    </el-table-column>
			    <el-table-column label="首次启用时间" width="160">
			    	<template slot-scope="scope">
			    		{{scope.row.start_at | date(4)}}
			    	</template>
			    </el-table-column>
		    </el-table>
			<h3 style="margin-bottom:10px;">设置：</h3>
			<el-form :model="operationForm" ref="operationForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
				<el-form-item label="是否启用：">
			    	<el-select v-model="operationForm.status" placeholder="请选择">
				        <el-option label="未启用" :value="0"></el-option>
				        <el-option label="已启用" :value="1"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="所属门店：">
			    	<el-select v-model="operationForm.store_id" placeholder="请选择">
				        <el-option v-for="(item,idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
				    </el-select>
			    </el-form-item>
		    </el-form>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="operationCancel">取 消</el-button>
		    <el-button type="primary" @click="operationSubmit">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script>
	import deviceApi from '../../api/device'

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
	            },
	            operationFormVisible:false,
	            operationForm:{

	            },
			}
		},
		created:function(){
			this.deviceList();
			//this.allVersion();
		},
		methods:{
			deviceList(){
				//this.$data.requestParameters.belong_sid = this.$route.query.storeId;
			    let qs = require('querystring');
        		deviceApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;

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
			fnOperation(row){
				this.$data.operationForm = {
					id:row.id,
					device_id:row.device_id,
					type:row.type,
					created_at:row.created_at,
					start_at:row.start_at,
					status:row.is_start,
					store_id:row.store.id
				}
        		storeApi.listsResults().then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.$data.allStores = res.data.data;

        			}else{

        			}

        		})
        		this.$data.operationFormVisible = true;
			},
			operationCancel(){
				this.$data.operationFormVisible = false;
				this.$data.operationForm = {
					id:'',
					device_id:'',
					type:'',
					created_at:'',
					start_at:'',
					status:'',
					store_id:''
				}

			},
			operationSubmit(){
				let list = {
					'id':this.$data.operationForm.id,
					'status':this.$data.operationForm.status,
					'store_id':this.$data.operationForm.store_id
				}
				let qs = require('querystring');
        		deviceApi.setOperation(qs.stringify(list)).then((res) => {
        			if(res.data.errno === 0){
						console.log(res)
						this.deviceList();
						this.$data.operationFormVisible = false;
        			}else{

        			}

        		})
			},

		}
	}
</script>
<style lang="scss" scoped>
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>
