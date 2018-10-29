import userApi from '@/api/user.js'

  export default {
    name: 'word-item',
    props: {
      isCollapse: Boolean,
      isShow: Boolean,
    },
    data() {
      return {
        currentMenu: 'StoreTime',
        tableData: [],
      }
    },
    watch:{
    	$route(to,from){
    		this.getUrl();
    	}
    },
    created() {
      this.getUrl();
      this.menu();
    },
    methods: {
      getUrl() {
       switch (this.$route.name){
       	  case "Lists":
    			  this.$data.currentMenu = 'Device';
    				break;
    			case "StoreDeviceDetailLists":
    			  this.$data.currentMenu = 'Device';
    				break;
    			case "StoreDeviceSumLists":
    			  this.$data.currentMenu = 'Device';
    				break;
    			case "StoreAccount":
    			  this.$data.currentMenu = 'Store';
    				break;
    			case "LabelDetail":
    			  this.$data.currentMenu = 'LabelList';
    				break;
    			default:
    			  this.$data.currentMenu = this.$route.name;
    				break;
    		}
      },
      handleSelect(index,indexPath){
      	(index === "Device") && (index = "Lists");
      	this.$router.push({
      		 name:index
      	})
      },
      menu() {
        userApi.menu().then((res) => {
        	if(res.data.errno === 0){
        		 for(let i=0;i<res.data.data.length;i++){
        		 	  if(res.data.data[i].no_child === false){
        		 	  	 res.data.data[i].front_url = String(i)
        		 	  }
        		 }
        		 this.$data.tableData = res.data.data;
        	}

        })
      },
    }
  }