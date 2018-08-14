import OrderApi from '@/api/order'
import storeApi from '@/api/store'
import storeRole from '@/api/store_role'
import * as utils from '@/utils/index'


export default {
  name:'guest-list',
  components: {

  },
  data(){
    return{
      tableData: [],
      organizes: [],
      selectStore:[],
      organizeCode:[],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
      cashTimes:['',''],
      createdTimes:['',''],
      materials:[],
      styles:[],
      requestParameters: {
        page: 1,
        page_size:10,
        store_id:'',
        sn:'',
        // id:'',
        material:'',
        style:'',
        price_start:'',
        price_end:'',
        cash_t_start:'',
        cash_t_end:'',
        created_at_start:'',
        created_at_end:''
      },
      nodatatext:'请选择门店架构',
      noeditStore:'请选择门店架构',
      defaultAttr:{
        label:'name',
        value:'id',
        children:'children',
      },
      pickerOptionsSet: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      noData:false,
      editForm:{
        cash:'',
        traffic:{
          avatar:'',
          customer_id:'',
          orderGoods:[],
        }
      },
      viewVisible:false,
      editAllNum:'',
      rules:[],
    }
  },
  created: function () {
    this.getAll();
    this.lists();
    this.getOrganizes();
    this.getRoleLists();
  },
  methods: {
    getAll() {
      let list = {
        'all': 1,
        'customer_id': ''
      };
      let qs = require('querystring');
      OrderApi.getAll(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0) {
          let labels = res.data.data;
          for(let i = 0; i < labels.length; i++) {
            if(labels[i].name === '材质') {
              this.materials = labels[i].children;
            } else if(labels[i].name === '款式') {
              this.styles = labels[i].children;
            } else {
              return false
            }
          }
        }
      })
    },
    //列表
    lists(){
      this.$data.requestParameters.cash_t_start = this.$data.cashTimes[0];
      this.$data.requestParameters.cash_t_end = this.$data.cashTimes[1];
      this.$data.requestParameters.created_at_start = this.$data.createdTimes[0];
      this.$data.requestParameters.created_at_end = this.$data.createdTimes[1];

      let qs = require('querystring');
      OrderApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if(res.data.errno === 0){
          console.log(res.data.data.list)
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }
      })
    },

    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.$data.requestParameters.page = currentPage;
      this.lists();
    },
    onSubmit() {
      if((this.$data.cashTimes != null) && (this.$data.createdTimes != null)) {
        this.$data.requestParameters.cash_t_start = utils.getDateTime(this.$data.cashTimes[0]);
        this.$data.requestParameters.cash_t_end = utils.getDateTime(this.$data.cashTimes[1]);
        this.$data.requestParameters.created_at_start = utils.getDateTime(this.$data.createdTimes[0]);
        this.$data.requestParameters.created_at_end = utils.getDateTime(this.$data.createdTimes[1]);
      } else {
        this.$data.cashTimes = ['', ''];
        this.$data.createdTimes = ['', ''];
        this.lists();
      }
      let qs = require('querystring');
      OrderApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if (res.data.errno === 0) {
          console.log(res.data.data.list);
          console.log(res.data.data.list.length);
          if(res.data.data.list.length === 0){
            console.log(res.data.data.list.length);
            this.$data.noData = true;
          }else{
            this.$data.noData = false;

          }
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        }
      })
      // this.lists();
    },
    fnView(row){
      this.$data.editForm = row;
      let time = row.cash_t * 1000;
      this.$data.editForm.cash = time;
      this.$data.editAllNum = row.orderGoods.length;
      this.$data.viewVisible = true;
    },
    viewClose(){
      this.$data.viewVisible = false;
      // this.$data.editForm = {};
    },
    fnRemove(row){
      this.$confirm('确认删除该订单：'+row.sn+' ？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring')
        OrderApi.dele(qs.stringify(list)).then((res) => {
          console.log(res)
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
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
//门店架构
    getOrganizes(){
      storeRole.organizeTree().then((res) => {
        if(res.data.errno == 0) {
          this.$data.organizes = res.data.data;
        } else {
          this.$message(res.data.msg)
        }
      })
    },
    getRoleLists(){
      storeRole.allList().then((res) => {
        if(res.data.errno === 0){
          this.$data.allRole = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    getStore(){
      this.$data.requestParameters.store_id = "";
      let organ = this.$data.organizeCode[this.$data.organizeCode.length - 1];
      let data = {
        merchant_organize_id:organ
      };
      storeApi.organizeStoreResult(data).then((res) => {
        if(res.data.errno === 0) {
          if(res.data.data == null){
            this.$data.nodatatext = "暂无门店"
            this.$data.selectStore = [];
          }else{
            this.$data.selectStore = res.data.data
          }
        } else {
          this.$message(res.data.msg)
        }
      })
    },
    resetForm(){
      this.$data.organizeCode = [];
      this.$data.selectStore = [];
      this.$data.requestParameters = {
        store_id:'',
        merchant_organize_id:'',
        merchant_role_id:'',
        username:'',
        truename:'',
        phone:'',
        page: 1,
        page_size:10,
      };
      this.$data.cashTimes = [];
      this.$data.createdTimes = [];
    }
  },
}
