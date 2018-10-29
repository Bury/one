import MenuLeft from '@/views/menu/MenuLeft'

import userApi from '@/api/user.js'

export default {

  name: 'main-box',

  components: {
    MenuLeft
  },

  data () {
    return {
        userName:'xxxxx',
        horizontalIndex: '1',
        isCollapse: false,
        leftMenu: {
            leftMenu1:true,
            leftMenu2:false,
            leftMenu3:false,
            leftMenu4:false
        }
    }

  },

  created: function(){
    this.$data.userName = localStorage.getItem('username')
  },

  methods: {

    handleSelect(key, keyPath) {
        var nowKey = "leftMenu"+key;
        for(var i in this.$data.leftMenu){
            var nowI = i;
            this.$data.leftMenu[nowI] = false;
            if(nowKey == nowI){
                this.$data.leftMenu[nowI] = true;
            }
        }

    },

    handleOpen(key, keyPath) {
    },

    handleClose(key, keyPath) {
    },

    logout(){
        userApi.logout().then((res) => {
            if(res.data.errno === 0){
                localStorage.setItem('knock_knock', null);
                localStorage.setItem('username', '');
                window.location.href = '/';
            }else{
                //logout failed
            }
        });
    },

    user_personal(){
        this.$router.push('/UserPersonal')
    },

    created_notice(){
      this.$router.push('/Notice')
    },
    inbox(){
      this.$router.push('/Inbox')
    },
    outbox(){
      this.$router.push('/Outbox')
    },
    drafts(){
      this.$router.push('/Drafts')
    },
    goDataView(){
    	this.$router.push('/DataView')
    }

  }

}