import noticeApi from '@/api/notice'
export default{
  name:'role-set',
  data(){
    return {
      tableData: [],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
    }
  },
  created:function(){
    this.lists();
  },
  methods: {
    //列表
    lists(){
        let list = {
          is_send:1,
          is_delete:0,
          page:1,
          page_size:20,
        }
      let qs = require('querystring')
      noticeApi.myboxList(qs.stringify(this.$data.requestParameters)).then((res) => {
        if(res.data.errno === 0){
          console.log(res);
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    fnCheck(){
      this.$router.push('/Check')
    },

    fnRemove(row){
      this.$confirm('确认删除该角色：'+row.title+' ？', '删除提示', {
        confirmButtonText: '确定',
        fnCancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring')
        noticeApi.noticeDele(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.lists();
          }else{
            this.$message.error(res.data.msg);
          }

        })
      }).catch(() => {
      });
    },
  }
}
