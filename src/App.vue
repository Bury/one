<template>
  <div>
    <div id="app" v-show="false">
      <router-view></router-view>
    </div>
    <div id="imageBg">
      <div class="top">
        <div class="top-left">
          <img src="./assets/images/logo.png"/>
          <img src="./assets/images/logoname.png"/>
        </div>
        <div class="top-middle"></div>
        <div class="top-right"></div>
      </div>

      <div class="content">
        <div class="content-left">
          <div class="content-left-top"></div>
          <div class="content-left-middle"></div>
          <div class="content-left-bottom"></div>
        </div>
        <div class="content-middle">
          <div class="content-middle-top"></div>
          <div class="content-middle-middle"></div>
          <div class="content-middle-bottom"></div>
        </div>
        <div class="content-right">
          <div class="content-right-top"></div>
          <div class="content-right-bottom"></div>
        </div>
      </div>
    </div>
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
  min-height: 100%;
  color: #ffffff;
  background-color: #fff;
  overflow: auto;
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
  #imageBg{
    background: url("./assets/images/bg.png") center center no-repeat;
    background-size: cover;
    width: 100%;
    padding: 15px 25px;
    overflow: hidden;
  }
  .top,.content{
    display: flex;
    overflow: hidden;
  }
  .top-middle{
    width: 67rem;
    height: 4.6rem;
    background: rgba(149,199,255,0.5);
  }
  .top-right{
    width: 18rem;
    background: #95c7ff;
    opacity: 0.5;
  }
  .content{
    width: 100%;
    height:48.1rem;
    margin-top: 2rem;
  }
.content-left{
  width:47rem;
  background: rgba(149,199,255,0.5);
}
.content-middle{
  width:30rem;
  background: rgba(149,199,255,0.5);
}
.content-right{
  width:25rem;
  background: rgba(149,199,255,0.5);
}
</style>
