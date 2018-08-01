import noticeApi from '@/api/notice'
export default {
  name: 'role-set',
  data() {
    return {
      tableData: [],
      ruleForm:{
        isRead:'',
        isDele:0,
        page:1,
        page_size:20,
      },
      checkForm:{
        author:'',
        created_at:'',
        content:'',
        title:''
      },
      checkVisible:false,

    }
  },
  created: function () {
    this.lists();
  },
  methods: {
    //列表
    lists() {
      let list = {
        isRead:'',
        is_delete:0,
        page:1,
        page_size:20,
      };
      let qs = require('querystring')
      noticeApi.inboxList(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          this.$data.tableData = res.data.data.list;
          this.$data.ruleForm.isRead = res.data.data.list.is_read;
          this.$data.ruleForm.isDele = res.data.data.list.is_delete;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    fnCheck(row) {
      this.$data.checkVisible = true;
      let list = {
        'message_id':row.message_id,
        'message_from': '',
      };
      let qs = require('querystring')
      noticeApi.detail(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          console.log(res);
          // this.$data.checkForm = res.data.data;
//moment(res.data.data.created_at).format("YYYY-MM-DD HH:mm:ss");
          this.$data.checkForm.created_at = res.data.data.created_at;
          this.$data.checkForm.author = res.data.data.author;
          this.$data.checkForm.content = res.data.data.content;
          this.$data.checkForm.title = res.data.data.title;
          console.log(this.$data.checkForm,151515);
          // this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          // this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    fnRemove(row) {
      console.log(row,11111)
      this.$confirm('确认删除该角色：' + row.title + ' ？', '删除提示', {
        confirmButtonText: '确定',
        fnCancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring')
        noticeApi.inboxDele(qs.stringify(list)).then((res) => {
          if (res.data.errno === 0) {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.lists();
          } else {
            this.$message.error(res.data.msg);
          }

        })
      }).catch(() => {
      });
    },
  }
}
