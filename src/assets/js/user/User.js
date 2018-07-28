
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
        sort: '0',
        status:0,
      },
      currentId:'',
      currentName:'',
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11位的有效手机号码', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个数字', trigger: 'blur' }
        ]
      },
      permissionDialogFormVisible:false,
      dialogForm2: [],
      checkedIds:[],
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
          console.log(res.data.data)
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
          console.log(res)
          this.$data.allRoles = res.data.data;
        }else{

        }
      })
    },
    handleCurrentChange(currentPage) {
      this.$data.requestParameters.page = currentPage;
      this.lists();
    },
    fnRemove(row){
      this.$confirm('确认删除该角色：'+row.name+' ？', '删除提示', {
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
    fnAdds(){
      this.$data.dialogTitle = '添加';
      this.$data.currentId = "";
      this.$data.ruleForm.name = "";
      this.$data.ruleForm.sort = 0;
      this.$data.userDialogFormVisible = true;
      this.getRoles();
    },
    fnEdit(row){
      this.$data.dialogTitle = '编辑';
      this.$data.currentId = row.id;
      this.$data.ruleForm.name = row.name;
      this.$data.ruleForm.sort = row.sort;
      this.$data.userDialogFormVisible = true;
      this.getRoles();
    },
    fnCancel(){
      this.$data.userDialogFormVisible = false;
      this.$data.permissionDialogFormVisible = false;
      this.$data.ruleForm.name = '';
      this.$data.ruleForm.name = 0;
      this.$data.currentId = '';
    },
    fuResetRuleForm(){
      this.$data.ruleForm.username = '';
      this.$data.ruleForm.password = '';
      this.$data.ruleForm.name = '';
      this.$data.ruleForm.telephone = '';
      this.$data.ruleForm.status = '';
      this.$data.ruleForm.sort = '';
      this.$data.currentId = '';
      this.$data.userDialogFormVisible = false;
    },
    onSubmitSearch(){
      console.log(this.$data.requestParameters)
      this.lists();
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.$data.currentId !== ''){
            let list = {
              'id': this.$data.currentId,
              'username':this.$data.ruleForm.username,
              'password':this.$data.ruleForm.password,
              'name':this.$data.ruleForm.name,
              'telephone':this.$data.ruleForm.telephone,
              'status':this.$data.ruleForm.status,
              'sort':this.$data.ruleForm.sort
            }
            let qs = require('querystring')
            userApi.edit(qs.stringify(list)).then((res) => {
              if(res.data.errno === 0){
                console.log(res)
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
          }else{
            let list = {
              'username':this.$data.ruleForm.username,
              'password':this.$data.ruleForm.password,
              'name':this.$data.ruleForm.name,
              'telephone':this.$data.ruleForm.telephone,
              'status':this.$data.ruleForm.status,
              'sort':this.$data.ruleForm.sort
            }
            let qs = require('querystring')
            userApi.adds(qs.stringify(list)).then((res) => {
              if(res.data.errno === 0){
                console.log(res)
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
        }
      });
    },

    fnSet(row){
      alert('暂未支持');
      return ;
      this.$data.currentName = row.name;
      this.$data.currentId = row.id;
      let list = {
        'role_id':row.id
      }
      let qs = require('querystring')
      userApi.allPermission(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          console.log(res)
          this.$data.dialogForm2 = res.data.data;
          var checkedId = [];
          for(var i=0; i< this.$data.dialogForm2.length; i++){
            var rootIdx = i;
            if(this.$data.dialogForm2[rootIdx].is_permission === 1){
              var len = checkedId.length;
              checkedId[len] = this.$data.dialogForm2[rootIdx].id;

            }
            if(this.$data.dialogForm2[rootIdx].children && this.$data.dialogForm2[rootIdx].children.length>0){
              for(var j=0; j<this.$data.dialogForm2[rootIdx].children.length; j++){
                var childIdx = j;
                if(this.$data.dialogForm2[rootIdx].children[childIdx].is_permission === 1){
                  var len = checkedId.length;
                  checkedId[len] = this.$data.dialogForm2[rootIdx].children[childIdx].id;

                }
              }
            }
          }
          this.$data.checkedIds = checkedId;
          console.log(this.$data.checkedIds)
        }else{
          this.$message.error(res.data.msg);

        }

      })
      this.$data.permissionDialogFormVisible = true;
    },

    submitForm2(){
      this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
      console.log(this.$data.currentId)
      console.log(this.$data.checkedIds)
      let list = {
        'role_id':this.$data.currentId,
        'permission_ids':this.$data.checkedIds.toString()
      }
      let qs = require('querystring')
      userApi.editPermission(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          console.log(res)
          this.$data.currentId = '';
          this.$data.permissionDialogFormVisible = false;
        }else{
          this.$message.error(res.data.msg);

        }

      })
    },
    changeSwitch (data) {
      console.log(this.$data.ruleForm.status)
    }
  }
}
