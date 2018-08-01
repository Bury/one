import noticeApi from '@/api/notice'
export default{
  name:'check-set',
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
      console.log(121212)
      let qs = require('querystring')
      noticeApi.detail(qs.stringify(this.$data.requestParameters)).then((res) => {
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

    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.$data.requestParameters.page = currentPage;
      this.lists();
    },
  }
}
