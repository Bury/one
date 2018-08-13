import axios from 'axios'
import router from '../router/index'
import qs from 'qs'
axios.interceptors.request.use(function (config) {
    let knock_knock = sessionStorage.getItem('knock_knock')
    if (knock_knock && knock_knock!==null && knock_knock!=='') {
            if(config.method=='post'){
                let data = qs.parse(config.data)
                config.data = qs.stringify({
                    'access_token': knock_knock,
                    ...data
                });          
            }else if(config.method=='get'){
                config.param = {
                    'access_token' : knock_knock,
                    ...config.params
                };
            }
        }
    return config;
  }, function (err) {
    return Promise.reject(err);
  });

axios.interceptors.response.use(function (res) {
    if (res.data.errno == 1000000 || res.data.msg=='access-token不能为空' || res.data.msg=='用户不存在') {
            sessionStorage.setItem('knock_knock', '')
            sessionStorage.setItem('username', '')
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
    return res;
  }, function (err) {
    if(err.data==undefined || err.data==''){
        return;
    }
     if (err.data.errno == 1000000 || err.data.msg=='access-token不能为空' || res.data.msg=='用户不存在') {
            sessionStorage.setItem('knock_knock', '')
            sessionStorage.setItem('username', '')
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
    }
    return Promise.reject(err);
  });

