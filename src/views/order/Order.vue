<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="门店架构：">
          <el-cascader v-model="organizeCode" :options="organizes" :props='defaultAttr' @change="getStore">
          </el-cascader>
			  </el-form-item>
        <el-form-item label="门店：">
          <el-select v-model="requestParameters.store_id" placeholder="请选择" :no-data-text="nodatatext">
            <el-option v-for="(item,index) in selectStore" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号：">
        <el-input v-model="requestParameters.sn"></el-input>
      </el-form-item>
        <el-form-item label="材质：">
          <el-select v-model="requestParameters.material" placeholder="请选择材质">
            <el-option label="全部" value="">全部</el-option>
            <el-option v-for="material in materials" :key="material.id" :label="material.name"
                       :value="material.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="款式：">
          <el-select v-model="requestParameters.style" placeholder="请选择款式">
            <el-option label="全部" value="">全部</el-option>
            <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额：">
          <el-col :span="11">
            <el-input v-model="requestParameters.price_start"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-input v-model="requestParameters.price_end"></el-input>
          </el-col>
        </el-form-item>
			  <el-form-item label="收银时间：">
				<el-date-picker :picker-options="pickerOptionsSet"
			      v-model="cashTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="创建时间：">
				<el-date-picker :picker-options="pickerOptionsSet"
			      v-model="createdTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
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
        <th class="col-md-2 text-center">客户</th>
        <th class="col-md-1 text-center">门店</th>
        <th class="col-md-1 text-center">客户类型</th>
        <th class="col-md-2 text-center">收银时间</th>
        <th class="col-md-2 text-center">创建时间</th>
        <th class="col-md-1 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.sn}}</td>
        <td>
          <span v-for="good in item.orderGoods" class="margin">[{{good.material_name}}/{{good.style_name}}]</span>
        </td>
        <td>{{item.price | numberFilter}}</td>
        <td>
          <div style="width: 100%;display: flex;padding: 5%;">
            <div style="width:45%;">
              <img :src="item.traffic.avatar" style="width:100%;">
            </div>
            <div style="width:55%;padding:5% 0 0 8%;text-align:left">
              ID:{{item.traffic.customer_id}}<br/>
              姓名:{{item.customer_name}}<br/>
            </div>
          </div>
        </td>
        <td>{{item.store_name}}</td>
        <td>
          <span v-if="item.traffic.is_new == 1 && item.traffic.vip_level == 1">熟客已购买</span>
          <span v-if="item.traffic.is_new == 0 && item.traffic.vip_level == 1">新客已购买</span>
          <span v-if="item.traffic.is_new == 0 && item.traffic.vip_level == 0">新客未购买</span>
          <span v-if="item.traffic.is_new == 1 && item.traffic.vip_level == 0">熟客未购买</span>
        </td>
        <td>{{item.cash_t | date(4)}}</td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <!--<el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>-->
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="noData" v-if="noData" style="text-align: center;margin-top:2rem;font-size: 1.4rem;">暂无数据~</div>
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
<script src="@/assets/js/order/order.js"></script>
<style lang="scss" scoped>
	.el-table thead{
		color:#333;
	}
  .el-pagination{
    margin:10px;
    float: right;

  }
</style>
