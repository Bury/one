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
        <td>{{item.sender}}</td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnCheck(item)" type="text" size="small">查看</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>

    <!--查看-->
    <el-dialog title="查看" :visible.sync="checkVisible">
      <el-form v-model="checkForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="发件人：">
              <div class="time">
                <span>{{checkForm.author}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发件时间：">
              <div class="time" disabled>
                <span>{{checkForm.created_at | date(4)}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题：">
              <div class="time">
                <span>{{checkForm.title}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容：" prop="account">
          <div class="time">
            <div>{{checkForm.content}}</div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script src="@/assets/js/notice/Inbox.js"></script>
<style lang="scss" scoped>
  .role-set-page {
    .top-box {
      position: relative;
      margin-bottom: 20px;
      height: 36px;
      border-bottom: 1px solid #d2d2d2;
      .add-btn {
        position: absolute;
        top: 0;
        right: 20px;

      }
    }

  }

  .el-pagination {
    margin: 20px 0;
    float: right;
  }
  .time{
    border: 1px solid #e1e1e1;
    border-radius:4px;
    box-sizing: border-box;
    padding-left: 15px;
  }

</style>
