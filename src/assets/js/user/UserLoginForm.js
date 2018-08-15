import userApi from '@/api/user.js'
import globalRules from '@/config/global_rules'
import globalFunctions from '@/config/global_functions'

export default {
  name: 'login-form',
  data () {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写登录帐号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请填写登录密码', trigger: 'blur' },
        ]
      },
      dialogFormVisible:false,
      passwordEditForm:{
        passwordOld:'',
        passwordCurrent:'',
        passwordRepeat:'',
      },
      rulesPasswordEdit: {
        passwordOld: globalRules.rules.password(6,20,'请输入当前密码'),
        passwordCurrent: globalRules.rules.password(6,20,'请输入新的密码'),
        passwordRepeat: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.$data.passwordEditForm.passwordCurrent) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
    }
  },
  created: function () {

  },
  mounted: function () {
  },
  methods: {
    /*
    reset() {
      this.$refs.loginForm.resetFields();
    },
    */
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let qs = require('querystring');
          userApi.login(qs.stringify(this.$data.loginInfo)).then((res) => {
            if(res.data.errno === 0){
              console.log(res);
              sessionStorage.setItem('knock_knock', res.data.data.access_token)
              sessionStorage.setItem('username', res.data.data.user.username)
              if(res.data.data.user.is_change_pwd == 0){
                this.$data.dialogFormVisible = true;
              }else{
                this.$router.push('/Statistics');
              }
              // this.$router.replace({name: 'Statistics'})
            }else if(res.data.msg === '此账号被禁用'){
              this.$message.error(res.data.msg);
              this.$data.status = 0
            }else {
              this.$message.error(res.data.msg);
            }
          })

        } else {
          return false
        }
      })
    },

    //修改密码
    fnPasswordEditSubmitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(this.$data.passwordEditForm.passwordOld==this.$data.passwordEditForm.passwordCurrent){
          globalFunctions.functions.message(this,'error','新的密码与当前密码不能相同');
          return false;
        }else{
          if(this.$data.passwordEditForm.passwordCurrent==this.$data.passwordEditForm.passwordRepeat){
            if (valid) {
              let list = {
                'old_password':this.$data.passwordEditForm.passwordOld,
                'new_password':this.$data.passwordEditForm.passwordCurrent,
                'new_password2':this.$data.passwordEditForm.passwordRepeat
              }
              let qs = require('querystring')
              userApi.changePWD(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                  globalFunctions.functions.message(this,'success','修改成功');
                  this.$data.dialogFormVisible = false;
                  this.$data.passwordEditForm.passwordOld = '';
                  this.$data.passwordEditForm.passwordCurrent = '';
                  this.$data.passwordEditForm.passwordRepeat = '';
                  this.$router.push('/Statistics');
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }
          } else{
            this.$message.error('密码输入不正确，请再次输入');
          }

        }


      });
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
      },0)
    },
    fnCancel(){
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
        this.$data.dialogFormVisible = false;
        this.$data.dialogFormVisible = false;
        this.$data.passwordEditForm.passwordOld = '';
        this.$data.passwordEditForm.passwordCurrent = '';
        this.$data.passwordEditForm.passwordRepeat = '';
      },0)
    },
    dialogClosePwd(){
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
        this.$data.dialogFormVisible = false;
        this.$data.dialogFormVisible = false;
        this.$data.passwordEditForm.passwordOld = '';
        this.$data.passwordEditForm.passwordCurrent = '';
        this.$data.passwordEditForm.passwordRepeat = '';
      },0)
    },


  },
}
