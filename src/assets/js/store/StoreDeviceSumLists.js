
import deviceApi from '@/api/device'

export default{
  name:'store',
  data(){
    return{
      tableData:[],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
      requestParameters: {
        page: 1,
        page_size:20
      },
    }
  },
  created:function(){
    this.storeDeviceSumLists();
  },
  methods:{
    storeDeviceSumLists(){
      let qs = require('querystring');
      deviceApi.storeDeviceSumLists(qs.stringify(this.$data.requestParameters)).then((res) => {
        console.log(res)
        if(res.data.errno === 0){
          this.$data.tableData = res.data.data.list;
          console.log(this.$data.tableData)
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }else{

        }

      })
    },
    handleCurrentChange(currentPage) {
      this.$data.requestParameters.page = currentPage;
      this.storeDeviceSumLists();
    },
    fnGoPage(row){
      console.log(row);
      this.$router.push({
        name: 'StoreDeviceDetailLists',
        query: {
          storeId: row.id,
          storeName: row.name
        }
      });
    }
  }
}
