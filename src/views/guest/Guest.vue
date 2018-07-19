<template>
	<div class="remind-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="门店选择：" v-if="allStores">
			    <el-select v-model="requestParameters.store_id" placeholder="门店选择">
			      <el-option v-for="(item, idx) in allStores" :key="idx" :label="allStores[idx].name" :value="allStores[idx].id"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="进店时间：">
				<el-date-picker
			      v-model="value4"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="消费金额：">
			    <el-input v-model="requestParameters.consume_money_start"></el-input>
			  </el-form-item>
			  <el-form-item label="至">
			    <el-input v-model="requestParameters.consume_money_end"></el-input>
			  </el-form-item>
				<el-form-item label="客户等级：">
			    <el-select v-model="requestParameters.level" placeholder="客户等级">
			      <el-option label="全部" value="0"></el-option>
			      <el-option label="新客匿名" value="1"></el-option>
			      <el-option label="新客VIP" value="2"></el-option>
			      <el-option label="熟客匿名" value="3"></el-option>
			      <el-option label="熟客VIP" value="4"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="年龄：">
			    <el-select v-model="requestParameters.age" placeholder="年龄">
			      <el-option label="全部" value="0"></el-option>
			      <el-option label="20岁以下" value="1"></el-option>
			      <el-option label="20-29岁" value="2"></el-option>
			      <el-option label="30-39岁" value="3"></el-option>
			      <el-option label="40-49岁" value="4"></el-option>
			      <el-option label="50-59岁" value="5"></el-option>
			      <el-option label="60岁以上" value="6"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="性别：">
			    <el-select v-model="requestParameters.sex" placeholder="性别">
			      <el-option label="全部" value="0"></el-option>
			      <el-option label="男" value="1"></el-option>
			      <el-option label="女" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border height="380" style="margin:0 auto;width: 1551px;text-align:center;">
	    	<el-table-column fixed type="index" label="序号" width="80"></el-table-column>
		    <el-table-column label="人脸" width="60">
		    	<template slot-scope="scope">
		           <img :src="scope.row.avatar" style="display:block;margin:0 auto;width:100%;">
		        </template>
		    </el-table-column>
		    <el-table-column prop="customerMerchant.name" label="姓名" width="100"></el-table-column>
		    <el-table-column label="性别" width="50">
		    	<template slot-scope="scope">
		           <span>{{scope.row.gender == 1 ?'男':'女'}}</span>
		        </template>
		    </el-table-column>
		    <el-table-column prop="age" label="年龄" width="100"></el-table-column>
		    <el-table-column prop="customerMerchant.phone" label="手机号" width="110"></el-table-column>
		    <el-table-column prop="customerMerchant.consume_num" label="消费次数" width="80"></el-table-column>
		    <el-table-column prop="customerMerchant.consume_money" label="消费金额" width="120"></el-table-column>
		    <el-table-column label="客户等级" width="120">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.is_new == 1 && scope.row.vip_level == 0">新客匿名</span>
			    	<span v-if="scope.row.is_new == 1 && scope.row.vip_level == 1">新客VIP</span>
			    	<span v-if="scope.row.is_new == 0 && scope.row.vip_level == 0">熟客匿名</span>
			    	<span v-if="scope.row.is_new == 0 && scope.row.vip_level == 1">熟客VIP</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="store_name" label="进店信息" width="220"></el-table-column>
		    <el-table-column prop="created_at" label="进店时间" width="200">
		    	<template slot-scope="scope">
		    		{{scope.row.created_at | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="device_name" label="设备信息" width="160"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="150">
			    <template slot-scope="scope">
			    	<el-button type="text" 
			    		size="small"  
			    		v-if="avatarFormVisible"
			    		@click="getAvatar(scope.row)">关联</el-button>
			        <el-button type="text" size="small" @click="showDialog(scope.row)" >详情备注</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;">
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
		

	  	<!-- 弹窗 -->
	  	<el-dialog :visible.sync="dialogVisible" style="min-width:1200px;z-index:2010;" :before-close="closeChangeMachie" :append-to-body="true">
			<el-tabs v-model="activeName" @tab-click="checkout">
			    <el-tab-pane label="个人信息" name="first">
			    	<user-info :customerId="currentCustomerId" :showInfoEdit="showInfoEdit"></user-info>
			    </el-tab-pane>
			    <el-tab-pane label="到店记录" name="second" style="min-height:415px;">
			    	<store-record :customerId="currentCustomerId"></store-record>
			    </el-tab-pane>
			    <el-tab-pane label="订单记录" name="third">
			    	<order-record :customerId="currentCustomerId" style="min-height:415px;"></order-record>
			    </el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>
<script>
	import guestApi from '../../api/guest'
	import remindApi from '../../api/remind'
	import UserInfo from '../../components/UserInfo'
	import StoreRecord from '../../components/StoreRecord'
	import OrderRecord from '../../components/OrderRecord'
    export default {
        name:'guest-list',
        components: {
		    UserInfo,
		    StoreRecord,
		    OrderRecord
		},
		props:{
			avatarFormVisible:Boolean
		},
        data(){
					return{
						tableData: [],
						allStores:[],
						pagination:{
							currentPage:1,
							totalCount:0,
						},
		        dialogVisible:false,//弹窗是否显示
		        activeName: 'first',
		        value4: ['',''],
		        requestParameters: {
	                page: 1,
	                page_size:10,
	                id:'',
	                store_id:'',
	                store_time_start:'',
	                store_time_end:'',
	                level:'',
	                age:'',
	                gender:'',
	                consume_money_start:'',
	                consume_money_end:''
	            },
	            currentCustomerId:'',
	            showInfoEdit:false


            }
        },
        created:function(){
        	this.guestList();
        	this.getStores();
        },
        methods: {
        	//列表
        	guestList(){
        		this.$data.requestParameters.store_time_start = this.$data.value4[0];
						this.$data.requestParameters.store_time_end = this.$data.value4[1];
						let qs = require('querystring');
        		guestApi.guestList(qs.stringify(this.$data.requestParameters)).then((res) => {
        			let result = res.data
							if(result.errno === 0){
								console.log('aa')
								console.log(result.data.list) 
								this.tableData = result.data.list;
								this.$data.pagination.currentPage = result.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = result.data.pagination.totalCount;

        			}else{

        			}
        			
        		})
        	},

        	//门店
        	getStores(){
        		remindApi.getStores().then((res) => {
        			if(res.data.errno === 0){
								this.$data.allStores = res.data.data;
        			}else{

        			}
        			
        		})
        	},


        	handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.guestList();
	        },
        	onSubmit() {
		        this.guestList();
		    },
		    showDialog(row) {
		        this.$data.showInfoEdit = false;
		        this.$data.currentCustomerId = row.customer_id;
		        this.$data.activeName = 'first';
		        this.$data.dialogVisible = true;
		    },

		    
		    checkout(tab, event) {
		        this.$data.showInfoEdit = false;
		    },
		    closeChangeMachie(done){
	            done();
	            // window.location.reload();
	            this.$data.showInfoEdit = false;
	        },
	        getAvatar(row){
	        	this.$emit('getChildData',row);
	        }
	    },
    }
</script>
<style lang="scss" scoped>

	.el-table thead{
		color:#333; 
	}
	.el-pagination{
		margin:10px;
	  	float: right;
	}
	
</style>