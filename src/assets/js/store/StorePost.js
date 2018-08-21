import storeRoleApi from '@/api/store_role'
import roleApi from '@/api/role'
import globalRules from '@/config/global_rules'

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
        name:globalRules.rules.name(),
      },
      requestParameters: {
        page: 1,
        page_size:20
      },
      dialogForm2Visible: false,
      currentName: '',
      dialogForm2: [],
      checkedIds: [],
      dialogForm:[],
      nodeId:'',
			parentId:'',
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
      this.$data.editFormVisible = true;

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
      this.$data.checkedIds = [];
      roleApi.storeRoleLists().then((res) => {
        this.$data.dialogForm = res.data.data;
      })
    },
    cancel(){
      this.$data.editFormVisible = false;
      this.$data.currentId = '';
      // this.$data.ruleForm.name = '';
      // this.clearFormData();
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.$data.currentId !== ''){
            let list = {
              'id': this.$data.currentId,
              'name': this.$data.ruleForm.name,
              'sort':this.$data.ruleForm.sort,
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
                this.$data.editFormVisible = false;

              }else{
                this.$message.error(res.data.msg);
              }

            })
          }else{
            let arr = this.$refs.tree.getCheckedKeys();
              var num ;
              for(let n=0;n<arr.length;n++){
                num = arr[n];
                this.$data.checkedIds.push(num);
              }
            Array.prototype.getOne = function(){
              for(let i=0;i<this.length - 1;i++){
                for(let j= i+1;j<this.length;j++){
                  if(this[i] == this[j]){
                    this.splice(j--,1)
                  }
                }
              }
            }
            this.$data.checkedIds.getOne();
            let list = {
              'name': this.$data.ruleForm.name,
              // 'person_in_charge':this.$data.ruleForm.person_in_charge,
              // 'phone':this.$data.ruleForm.phone,
              'permission_ids': this.$data.checkedIds.toString(),
            }
            let qs = require('querystring');
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

              }else if(res.data.errno == -1){
                this.$message.error(res.data.msg);

              }else{
                this.$message.error('请至少选择一个权限');
              }

            })
          }
        }
      });
    },
    change(data, val, child){
      //data该节点的对象，val自身是否被选中，child子节点是否被选中
      // console.log(data);
      this.$data.nodeId = data.id;
      if(val == true && data.parent_id != 0){
        this.$data.parentId = this.$refs.tree.getNode(this.$data.nodeId).parent.data.id;
        this.$data.checkedIds.push(this.$data.parentId );
      }
    },
    // changeSetting(data, val, child){
    //   //data该节点的对象，val自身是否被选中，child子节点是否被选中
    //   // console.log(this.$data.checkedIds);
    //   // console.log(data);
    //   this.$data.nodeId = data.id;
    //   if(val == true && data.parent_id != 0){
    //     this.$data.parentId = this.$refs.tree.getNode(this.$data.nodeId).parent.data.id;
    //     this.$data.checkedIds.push(this.$data.parentId );
    //   }
    // },
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
          this.getTree();
        } else {
          this.$message.error(res.data.msg);

        }

      })
      this.$data.dialogForm2Visible = true;
    },
    getTree(){
      var checkedId = [];
      for(var i = 0; i < this.$data.dialogForm2.length; i++) {
        if(this.$data.dialogForm2[i].children && this.$data.dialogForm2[i].children.length > 0) {
          for(var j = 0; j < this.$data.dialogForm2[i].children.length; j++) {
            if(this.$data.dialogForm2[i].children[j].is_permission === 1) {
              checkedId.push(this.$data.dialogForm2[i].children[j].id);
            }else if (this.$data.dialogForm2[i].children[j].is_permission === 0){
              this.$data.dialogForm2[i].is_permission = 0;
            }
          }
        }
        if(this.$data.dialogForm2[i].is_permission === 1) {
          checkedId.push(this.$data.dialogForm2[i].id);
        }
      }
      this.$data.checkedIds = checkedId;
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
          this.$message.error('请至少选择一个权限');

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
