
import deviceApi from '@/api/device'
import storeApi from '@/api/store'

export default{
  name:'device',
  data(){
    return{
      tableData: [],
      allStores:[],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
      allVersions:[],
      createdTimes:['',''],
      startTimes:['',''],
      requestParameters: {
        page: 1,
        page_size:10,
      },
      operationFormVisible:false,
      operationForm:{

      },
      distributionForm:{
        device_id:'',
        belong_sid:''
      },
      distributionFormVisible:false,
    }
  },
  created:function(){
    this.deviceList();
    //this.allVersion();
    this.storeAll();
  },
  methods:{
    deviceList(){
      //this.$data.requestParameters.belong_sid = this.$route.query.storeId;
      let qs = require('querystring');
      deviceApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if(res.data.errno === 0){
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;

        }else{

        }

      })
    },
    allVersion(){
      deviceApi.allVersion().then((res) => {
        if(res.data.errno === 0){
          console.log(res)
          this.$data.allVersions = res.data.data;

        }else{

        }

      })
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.$data.requestParameters.page = currentPage;
      this.deviceList();
    },
    fnOperation(row){
      this.$data.operationForm = {
        id:row.id,
        device_id:row.device_id,
        type:row.type,
        created_at:row.created_at,
        start_at:row.start_at,
        status:row.is_start,
        store_id:row.store.id
      }
      storeApi.listsResults().then((res) => {
        if(res.data.errno === 0){
          console.log(res)
          this.$data.allStores = res.data.data;

        }else{

        }

      })
      this.$data.operationFormVisible = true;
    },
    storeAll(){
      storeApi.listsResults().then((res) => {
        if(res.data.errno === 0){
          console.log(res)
          this.$data.allStores = res.data.data;

        }else{

        }

      })
    },
    operationCancel(){
      this.$data.operationFormVisible = false;
      this.$data.operationForm = {
        id:'',
        device_id:'',
        type:'',
        created_at:'',
        start_at:'',
        status:'',
        store_id:''
      }

    },
    operationSubmit(){
      let list = {
        'id':this.$data.operationForm.id,
        'status':this.$data.operationForm.status,
        'store_id':this.$data.operationForm.store_id
      }
      let qs = require('querystring');
      deviceApi.setOperation(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          this.deviceList();
          this.$data.operationFormVisible = false;
        }
      })
    },
    goBack(){
      window.history.back(-1);
    },
    fnDistribution(row){
      console.log(row);
      this.$data.distributionForm.device_id = row.device_id;
      this.$data.distributionForm.belong_sid = '';
      this.$data.operationFormVisible = true;
    },
    //取消分配
    cancelDeploy(val) {
      this.$confirm(`是否取消分配?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          device_id: val.device_id,
          belong_sid: val.store_id
        }
        let qs = require('querystring');
        deviceApi.cancelDeploy(qs.stringify(data)).then((res) => {
          if(res.data.errno === 0) {
            this.$message('取消成功');
            this.lists();
          } else {
            this.$message(res.data.msg)
          }

        })

      })

    },

  }
}
