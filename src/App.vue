<template>
    <div id="app">
      <router-view></router-view>
    </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  },
  created: function () {
  },
  mounted: function () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width:1204px;
  height: 100%;
  color: #ffffff;
  background-color: #EEF1F6;
}

input, .el-select-dropdown, .el-textarea, .el-textarea__inner, .el-message-box, .el-message,
.el-dropdown-menu, .el-button, .el-cascader-menu, .el-tooltip__popper, .el-picker-panel, .el-date-picker {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

a:focus {
  outline :none;
}
ul,li{list-style: none;}


.el-table th>.cell{
  text-align: center;
  color:#333;
}
.el-message .el-message__icon{
	margin: 0 10px;
}

/*左侧导航栏图标颜色重置*/
 .el-submenu__title i{
 	color: #fff;
 }

 /*表格初始化样式*/
 .yingyanTable thead tr{
 	color: #666666;
 	background-color: #FAFAFA;
 	border: solid 1px #F5F5F5;
 }
 .yingyanTable td{
 	color: #2A2A2A;
 	border-bottom: solid 1px #F5F5F5;
 }

 /*分页底部样式*/
.paginationBox{
	text-align: center;
}
/*输入框和按钮的圆角*/
.el-input__inner{
  -webkit-border-radius:2px;
  -moz-border-radius:2px;
  border-radius:2px;
}
button,.el-button{
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
</style>
