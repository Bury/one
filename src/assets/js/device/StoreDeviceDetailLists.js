
import deviceApi from '@/api/device'
import storeApi from '@/api/store'
import storeRole from '@/api/store_role'

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
        page_size:20,
        belong_sid:'',
      },
      operationForm:{

      },
      distributionForm:{
        device_id:'',
        belong_sid:''
      },
      distributionFormVisible:false,
      organizes: [],
      dorganizeCode: [],
      dallStores: [],
      operationRules:{},
      defaultAttr: {
        label: 'name',
        value: 'id',
        children: 'children',
      },
      nodatatext: "请选择门店架构",
      dnodatatext: '请选择门店架构',
    }
  },
  created:function(){
    this.deviceList();
    //this.allVersion();
    this.storeAll();
    this.getOrganizes();
  },
  methods:{
    deviceList(){
      this.$data.requestParameters.belong_sid = this.$route.query.storeId;
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
          this.$data.allVersions = res.data.data;

        }else{

        }

      })
    },
    handleCurrentChange(currentPage) {
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
          this.$data.allStores = res.data.data;

        }else{

        }

      })
      this.$data.operationFormVisible = true;
    },
    storeAll(){
      storeApi.listsResults().then((res) => {
        if(res.data.errno === 0){
          this.$data.allStores = res.data.data;
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
    	this.$router.go(-1);
    },
    fnDistribution(row){
			this.$data.dorganizeCode = [];
			this.$data.distributionForm = {
				device_id: '',
				belong_sid: ''
			};
      this.$data.distributionForm.device_id = row.device_id;
      this.$data.distributionForm.belong_sid = '';
      this.$data.distributionFormVisible = true;
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
            this.deviceList();
          } else {
            this.$message(res.data.msg)
          }

        })

      })

    },

    //分配
    distributionCancel() { 
      this.$data.distributionFormVisible = false;
    },
    getOrganizes() {
      storeRole.organizeTree().then((res) => {
        if(res.data.errno == 0) {
          this.$data.organizes = res.data.data
        } else {
          this.$message(res.data.msg)
        }
      })
    },
    distributionSubmit() {
      if(this.$data.distributionForm.belong_sid == "") {
        this.$message("请选择门店")
        return false;
      };
      let qs = require('querystring');
      deviceApi.distribution(qs.stringify(this.$data.distributionForm)).then((res) => {
        if(res.data.errno === 0) {
          this.$message('分配成功');
          this.$data.dorganizeCode = [];
          this.deviceList();
          this.$data.distributionFormVisible = false;
        } else {
          this.$message(res.data.msg)
        }

      })
    },
    dialogStore() {
      let organ = this.$data.dorganizeCode[this.$data.dorganizeCode.length - 1]
      let data = {
        merchant_organize_id: organ
      };
      storeApi.organizeStoreResult(data).then((res) => {
        if(res.data.errno === 0) {
          if(res.data.data != null && res.data.data.length > 0) {
            this.$data.dallStores = res.data.data;
          } else {
            this.$data.dnodatatext = "此地区暂无门店";
            this.$data.distributionForm.belong_sid = "";
          }
        } else {
          this.$message(res.statusText)
        }
      })

    },

  }
}
