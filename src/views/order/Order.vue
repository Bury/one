<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="订单编号：">
			    <el-input v-model="requestParameters.no"></el-input>
			  </el-form-item>
			  <el-form-item label="商品名称：">
			    <el-input v-model="requestParameters.product_name"></el-input>
			  </el-form-item>
			  <el-form-item label="收银时间：">
				<el-date-picker
			      v-model="cashTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="创建时间：">
				<el-date-picker
			      v-model="createdTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
    <table width="99%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-2 text-center">订单编号</th>
        <th class="col-md-1 text-center">商品名称</th>
        <th class="col-md-1 text-center">成交金额</th>
        <th class="col-md-1 text-center">客户人脸</th>
        <th class="col-md-1 text-center">客户姓名</th>
        <th class="col-md-1 text-center">客户类型</th>
        <th class="col-md-2 text-center">收银时间</th>
        <th class="col-md-2 text-center">创建时间</th>
        <th class="col-md-2 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.sn}}</td>
        <td></td>
        <td>{{parseFloat(item.price,2)}}</td>
        <td>
          <div style="width: 100px;height: 100px;padding: 10px;box-sizing: border-box;">
            <img :src="item.traffic.avatar" style="width: 100%;"/>
          </div>
        </td>
        <td>{{item.customer_name}}</td>
        <td>
          <span v-if="item.traffic.is_new == 1 && item.traffic.vip_level == 1">新客</span>
          <span v-if="item.traffic.is_new == 0 && item.traffic.vip_level == 1">熟客</span>
        </td>
        <td>{{item.cash_t | date(4)}}</td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>
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
	</div>
</template>
<script>
	import OrderApi from '../../api/order'
    export default {
        name:'guest-list',
        components: {

		},
        data(){
            return{
		        tableData: [],
		        pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        cashTimes:['',''],
		        createdTimes:['',''],
		        requestParameters: {
	                page: 1,
	                page_size:10,
	                no:'',
	                id:'',
	                product_name:'',
	                price_start:'',
	                price_end:'',
	                cash_t_start:'',
	                cash_t_end:'',
	                created_at_start:'',
	                created_at_end:''
	            },
            }
        },
        created: function () {
		    this.lists();
		},
        methods: {
        	//列表
        	lists(){
        		this.$data.requestParameters.cash_t_start = this.$data.cashTimes[0];
        		this.$data.requestParameters.cash_t_end = this.$data.cashTimes[1];
        		this.$data.requestParameters.created_at_start = this.$data.createdTimes[0];
        		this.$data.requestParameters.created_at_end = this.$data.createdTimes[1];

        		let qs = require('querystring');
        		OrderApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        			if(res.data.errno === 0){
        				console.log(res.data.data.list)
        				this.$data.tableData = res.data.data.list;
        				this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        			}else{

        			}


			    })
        	},

        	handleCurrentChange(currentPage) {
	            console.log(currentPage)
	            this.$data.requestParameters.page = currentPage;
	            this.lists();
	        },
        	onSubmit() {
		        this.lists();
		    },
          fnEdit(row){

          },
		    fnRemove(row){
				this.$confirm('确认删除该订单：'+row.sn+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		orderApi.deleOrder(qs.stringify(list)).then((res) => {
	        			console.log(res)
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.storeList();
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
	    },
    }
</script>
<style lang="scss" scoped>
	.el-table thead{
		color:#333;
	}
</style>
