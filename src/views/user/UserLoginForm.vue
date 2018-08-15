<template>
    <div class="login-form">

      <el-card>
        <div class="company">鹰眼商家管理系统</div>
        <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="0px">
            <div class="title"></div>
            <el-form-item prop="username">
              <el-input type="text" v-model="loginInfo.username" auto-complete="off" placeholder="帐号" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginInfo.password" auto-complete="off" placeholder="密码" />
            </el-form-item>
            <div class="login-btn-box">
              <el-button @click="forget" class="login-btn" v-bind:disabled="status==0">忘记密码</el-button>
              <el-button type="primary" @click="login" class="login-btn">登录</el-button>
            </div>
        </el-form>
      </el-card>

      <!--修改密码-->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :before-close="dialogClosePwd" style="min-width:800px;">
        <el-form :model="passwordEditForm" :rules="rulesPasswordEdit" ref="passwordEditForm" label-width="100px" class="demo-passwordEditForm">
          <el-form-item label="当前密码：" prop="passwordOld">
            <el-input type="password" v-model="passwordEditForm.passwordOld" ></el-input>
          </el-form-item>
          <el-form-item label="新的密码：" prop="passwordCurrent">
            <el-input type="password" v-model="passwordEditForm.passwordCurrent" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="passwordRepeat">
            <el-input type="password" v-model="passwordEditForm.passwordRepeat" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="fnCancel">取 消</el-button>
          <el-button type="primary" @click="fnPasswordEditSubmitForm('passwordEditForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!--忘记密码-->
      <el-dialog title="忘记密码" :visible.sync="passwordVisible" :before-close="dialogClose">
        <el-form :model='passwordForm' ref="passwordForm" :rules="rulesPwd" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号名:" prop="username">
            <el-col :span="15"><el-input v-model="passwordForm.username"></el-input></el-col>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-row>
              <el-col :span="15"><el-input v-model="passwordForm.phone" @focus="needsC"></el-input></el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="passwordSubmitLast()">下一步</el-button>
        </div>
      </el-dialog>
      <!--忘记密码第二步-->
      <el-dialog title="忘记密码" :visible.sync="passwordVisibleSecond" :before-close="dialogClose">
        <el-form label-width="100px">
          <el-form-item label="手机号:" prop="phone">
            <el-row>
              <el-col :span="15"><el-input v-model="passwordForm.phone" disabled></el-input></el-col>
              <el-col :span="2"><el-button @click="code()" :class="{disabled: !this.canClick}">{{getClickName}}</el-button></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-col :span="15"><el-input  v-model="passwordForm.code" @blur="blur()"></el-input></el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="toFirst()">上 一 步</el-button>
          <el-button type="primary" @click="passwordSubmitSecond()">确 定</el-button>
        </div>
      </el-dialog>
      <!--忘记密码第三步-->
      <el-dialog title="忘记密码" :visible.sync="passwordVisibleThird" :before-close="dialogClose">
        <el-form label-width="100px">
          <el-form-item label="新密码:" prop="password">
            <el-col :span="15"><el-input v-model="passwordForm.new_password" type="password"></el-input></el-col>
          </el-form-item>
          <el-form-item label="确认密码:" prop="repassword">
            <el-col :span="15"><el-input  v-model="passwordForm.new_password2" type="password"></el-input></el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="toSecond()">上 一 步</el-button>
          <el-button type="primary" @click="passwordSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>


<script src="@/assets/js/user/UserLoginForm.js"></script>
<style lang="scss" scoped>
  .login-form{
    text-align: center;
    font-size:16px;
    .company{
      line-height:32px;
      color:#333;
    }
    .title{
      margin-bottom:30px;
      line-height:36px;
      font-size:18px;
      font-weight:bold;
      color:#409EFF;
    }
    .disabled{
      background-color: #ddd;
      border-color: #ddd;
      color:#57a3f3;
      cursor: not-allowed; // 鼠标变化
    }
  }
</style>
