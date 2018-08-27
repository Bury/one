<template>
	<div class="role-set-page">
    <table width="90%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
      <tr height="40">
        <th class="col-md-2 text-center">标题</th>
        <th class="col-md-3 text-center">内容</th>
        <th class="col-md-2 text-center">操作人</th>
        <th class="col-md-2 text-center">时间</th>
        <th class="col-md-2 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.title}}</td>
        <td>{{item.content | fonts(10)}}</td>
        <td>{{item.author}}</td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnCheck(item)" type="text" size="small">查看</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>
	</div>
</template>
<script src="@/assets/js/notice/Drafts.js"></script>
<style lang="scss" scoped>
	.role-set-page{

	}

</style>
