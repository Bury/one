
import userApi from '@/api/user'
import roleApi from '@/api/role'

export default{
  name:'account-set',
  data(){
    return {
      tableData: [],
      allRoles:[],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
      requestParameters: {
        page: 1,
        page_size:10,
        username:'',
        role_id:'',
        telephone:'',
      },
      dialogTitle:"",
      userDialogFormVisible: false,
      ruleForm: {
        role_id:'',
        name: '',
      },
      currentId:'',
      currentName:'',
      rules: {
        username: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        truename: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11位的有效手机号码', trigger: 'blur' }
        ],
      },
      permissionDialogFormVisible:false,
      dialogForm2: [],
      checkedIds:[],
      userEditVisible:false,
      editForm:{
        role_id:'',
        username:'',
        phone:'',
        truename:'',
        status:1,
        password:'',
        roleName:'',
      },
    }
  },
  created:function(){
    this.lists();
    this.getRoles();
  },
  methods: {
    //列表
    lists(){
      let qs = require('querystring')
      userApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if(res==undefined || res=='' || res.data==undefined || res.data==''){
          return ;
        }
        if(res.data.errno === 0){
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    getRoles(){
      roleApi.lists_results().then((res) => {
        if(res.data.errno === 0){
          this.$data.allRoles = res.data.data;
        }
      })
    },
    handleCurrentChange(currentPage) {
      this.$data.requestParameters.page = currentPage;
      this.lists();
    },
    fnRemove(row){
      this.$confirm('确认删除该角色：'+row.username+' ？', '删除提示', {
        confirmButtonText: '确定',
        fnCancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring')
        userApi.dele(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.lists();
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
    //关闭弹框事件
    dialogClose(){
      this.$data.ruleForm={};
      this.$data.userDialogFormVisible = false;
    },
    fnAdds(){
      this.$data.currentId = "";
      this.$data.ruleForm.name = "";
      this.$data.userDialogFormVisible = true;
      this.getRoles();
      setTimeout(() =>{
        this.$refs.ruleForm.resetFields();
      })
    },
    fnEdit(row){

      this.$data.editForm = row;
      this.$data.editForm.roleName = row.storeRole.name;
      this.$data.editForm.role_id = row.storeRole.id;
      this.$data.currentId = row.id;
      this.$data.userEditVisible = true;
      if(row.status == '启用'){
        console.log('123');
        this.$data.editForm.status = 1;
      }else{
        console.log('147');
        this.$data.editForm.status = 0;
      }
      this.getRoles();
      console.log(row)
      console.log(this.$data.editForm);
    },
    fnCancel(){
      this.$data.userDialogFormVisible = false;
      this.$data.permissionDialogFormVisible = false;
      this.$data.ruleForm.name = '';
      this.$data.ruleForm.name = 0;
      this.$data.currentId = '';
      this.$data.ruleForm = {};
      setTimeout(() =>{
        this.$refs.ruleForm.resetFields();
      })
    },
    fuResetRuleForm(){
      this.$data.ruleForm.username = '';
      this.$data.ruleForm.password = '';
      this.$data.ruleForm.name = '';
      this.$data.ruleForm.telephone = '';
      this.$data.ruleForm.status = '';
      this.$data.currentId = '';
      this.$data.userDialogFormVisible = false;
    },
    onSubmitSearch(){
      this.lists();
    },
    submitForm(formName){
      if(this.$data.currentId !== ''){
        if(this.$data.editForm.status == '启用'){
          this.$data.editForm.status = 1;
        }else{
          this.$data.editForm.status = 0;
        }
        let list = {
          'id': this.$data.currentId,
          'username':this.$data.editForm.username,
          'password':this.$data.editForm.password,
          'truename':this.$data.editForm.truename,
          'phone':this.$data.editForm.phone,
          'role_id':this.$data.editForm.role_id,
          'status':this.$data.editForm.status,

        }
        let qs = require('querystring')
        userApi.edit(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$message({
              message: '操作成功',
              type: 'success',
              duration:1500
            });
            this.lists();
            this.userEditVisible = false;
          }else{
            this.$message.error(res.data.msg);
          }
          setTimeout(() =>{
            this.$refs.ruleForm.resetFields();
          })
        })
      }else{
        let list = {
          'username':this.$data.ruleForm.username,
          'password':this.$data.ruleForm.password,
          'truename':this.$data.ruleForm.truename,
          'phone':this.$data.ruleForm.phone,
          'role_id':this.$data.ruleForm.role_id,
        }
        let qs = require('querystring')
        userApi.adds(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$data.ruleForm = {};
            this.$message({
              message: '操作成功',
              type: 'success',
              duration:1500
            });
            this.lists();
            this.fuResetRuleForm();
          }else{
            this.$message.error(res.data.msg);

          }
        })
      }
    },
    fnEditCancel(){
      this.$data.userEditVisible = false;
      this.$data.editForm = {};
      setTimeout(()=>{
        this.$refs.editForm.resetFields();
      })
    },
    editDialogClose(){
      this.$data.userEditVisible = false;
      this.$data.editForm = {};
      setTimeout(()=>{
        this.$refs.editForm.resetFields();
      })
    },

    changeSwitch (data) {
      console.log(this.$data.editForm.status)
    }
  }
}
