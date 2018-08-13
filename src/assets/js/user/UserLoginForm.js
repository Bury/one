
import userApi from '@/api/user.js'

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
      }
    }
  },
  components:{
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
              localStorage.setItem('knock_knock', res.data.data.access_token)
              localStorage.setItem('username', res.data.data.user.username)
              this.$router.replace({name: 'Statistics'});
            }else{
              this.$message.error(res.data.msg);
            }
          })

        } else {
          return false
        }
      })
    },
  },
}
