import storeRoleApi from '@/api/store_role'
import roleApi from '@/api/role'

export default{
  name:'store-set',
  data(){
    return{
      tableData: [],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
      dialogFormVisible: false,
      editFormVisible: false,
      ruleForm: {
        name: '',
        person_in_charge:'',
        phone:''
      },
      currentId:'',
      rules: {
        name: [
          { required: true, message: '请输入门店岗位名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
      },
      requestParameters: {
        page: 1,
        page_size:10
      },
      dialogForm2Visible: false,
      currentName: '',
      dialogForm2: [],
      checkedIds: [],
      dialogForm:[],
    }
  },
  created:function(){
    this.storeRoleLists();
  },
  methods: {
    //列表
    storeRoleLists(){
      let qs = require('querystring')
      storeRoleApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if(res.data.errno === 0){
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    handleCurrentChange(currentPage) {
      this.$data.requestParameters.page = currentPage;
      this.storeRoleLists();
    },
    fnRemove(row){
      this.$confirm('确认删除该岗位：'+row.name+' ？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring')
        storeRoleApi.dele(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.storeRoleLists();
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
    fnEdit(row){
      this.$data.dialogTitle = '门店编辑';
      this.$data.currentId = row.id;
      this.$data.ruleForm = row;
      this.$data.dialogFormVisible = true;

    },
    fnAdds(){
      this.$data.dialogTitle = '门店添加';
      this.$data.currentId = "";
      this.$data.ruleForm = {
        name: '',
        person_in_charge:'',
        phone:''
      };
      this.$data.dialogFormVisible = true;
      roleApi.storeRoleLists().then((res) => {
        this.$data.dialogForm = res.data.data;
      })
    },
    cancel(){
      this.$data.dialogFormVisible = false;
      this.$data.currentId = '';
      this.$data.ruleForm = {
        name: '',
        person_in_charge:'',
        phone:''
      };
      this.clearFormData();
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.$data.currentId !== ''){
            this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
            let list = {
              'id': this.$data.currentId,
              'name': this.$data.ruleForm.name,
              'person_in_charge':this.$data.ruleForm.person_in_charge,
              'phone':this.$data.ruleForm.phone,
              'permission_ids': this.$data.checkedIds.toString(),
            }
            let qs = require('querystring')
            storeRoleApi.edit(qs.stringify(list)).then((res) => {
              if(res.data.errno === 0){
                this.$message({
                  message: '岗位名称修改成功',
                  type: 'success',
                  duration:1500
                });
                this.storeRoleLists();
                this.$data.currentId = '';
                this.$data.ruleForm = {
                  name: '',
                  person_in_csharge:'',
                  phone:''
                };
                this.$data.dialogFormVisible = false;

              }else{
                this.$message.error(res.data.msg);
              }

            })
          }else{
            this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
            let list = {
              'name': this.$data.ruleForm.name,
              'person_in_charge':this.$data.ruleForm.person_in_charge,
              'phone':this.$data.ruleForm.phone,
              'permission_ids': this.$data.checkedIds.toString(),
            }
            let qs = require('querystring')
            storeRoleApi.adds(qs.stringify(list)).then((res) => {
              if(res.data.errno === 0){
                this.$message({
                  message: '岗位设置成功',
                  type: 'success',
                  duration:1500
                });
                this.storeRoleLists();
                this.$data.currentId = '';
                this.$data.ruleForm = {
                  name: '',
                  person_in_charge:'',
                  phone:''
                };
                this.$data.dialogFormVisible = false;

              }else{
                this.$message.error(res.data.msg);

              }

            })
          }
        }
      });
    },
    fnGoPage(row){
      this.$router.push({
        name: 'StoreAccount',
        query: {
          StoreId: row.id,
          StoreName:row.name
        }
      });
    },
    fnSetting(row) {
      this.$data.currentName = row.name;
      this.$data.currentId = row.id;
      let list = {
        'role_id': row.id
      }
      let qs = require('querystring');
      storeRoleApi.viewPermission(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0) {
          this.$data.dialogForm2 = res.data.data;
          var checkedId = [];
          for(var i = 0; i < this.$data.dialogForm2.length; i++) {
            var rootIdx = i;
            if(this.$data.dialogForm2[rootIdx].is_permission === 1) {
              var len = checkedId.length;
              checkedId[len] = this.$data.dialogForm2[rootIdx].id;

            }
            if(this.$data.dialogForm2[rootIdx].children && this.$data.dialogForm2[rootIdx].children.length > 0) {
              for(var j = 0; j < this.$data.dialogForm2[rootIdx].children.length; j++) {
                var childIdx = j;
                if(this.$data.dialogForm2[rootIdx].children[childIdx].is_permission === 1) {
                  var len = checkedId.length;
                  checkedId[len] = this.$data.dialogForm2[rootIdx].children[childIdx].id;

                }
              }
            }
          }
          this.$data.checkedIds = checkedId;
        } else {
          this.$message.error(res.data.msg);

        }

      })
      this.$data.dialogForm2Visible = true;
    },
    fnCancel(formName){
      this.$data.dialogFormVisible = false;
      this.$data.dialogForm2Visible = false;
      this.$data.ruleForm.name = '';
      this.$data.ruleForm.sort = 0;
      this.$data.currentId = '';
    },
    submitForm2() {
      this.$data.checkedIds = this.$refs.tree.getCheckedKeys();
      let list = {
        'role_id': this.$data.currentId,
        'permission_ids': this.$data.checkedIds.toString()
      }
      let qs = require('querystring')
      storeRoleApi.editPermission(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0) {
          this.$data.currentId = '';
          this.$data.dialogForm2Visible = false;
        } else {
          this.$message.error(res.data.msg);

        }

      })
    },
    closeDialog(){
      this.clearFormData();
    },
    //清除数据
    clearFormData(){
      this.$data.ruleForm.name = '';
      // this.$data.dialogForm2 = [];
      setTimeout(() => {
        this.$refs.ruleForm.resetFields();
        this.$data.dialogFormVisible = false;
        this.$data.dialogForm = [];
      })
    },
  }
}
