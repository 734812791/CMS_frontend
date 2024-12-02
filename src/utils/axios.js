
import axios from "axios";
import store from '../store'
// 使用element-plus ElMessage做消息提醒
import { ElMessage } from 'element-plus'
import { diffTokenTime } from './tokenAuth'

//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口 开发环境还是线上环境也可以用api
  baseURL: "/api",
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 50000,
});
// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    //  config.data = qs.stringify(config.data); //数据转化,也可以使用qs转换
    //  config.headers = {
    //    'Content-Type':'application/x-www-form-urlencoded' //配置请求头
    //  }
    const token = localStorage.getItem("token")
    if (token) {
      //判断登录是否超时
      if (diffTokenTime()) {
        //超时之后，跳转到登录页
        store.dispatch("logout")
        return Promise.reject(new Error("token 已失效"));
      }
      config.headers.token = token; //如果要求携带在请求头中
      //     config.params = {'token':token} //如果要求携带在参数中
    }
    // config.method === "post"
    //   ? (config.data = qs.stringify({ ...config.data }))
    //   : (config.params = { ...config.params });
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    if (response && response.data) {
      const res = response.data;
      if (res.code != 1) {
        ElMessage({
          message: res.msg ? res.msg : "接口有异常",
          type: 'error',
        })

      }
      return response.data
    }
    return response;
  },
  (error) => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      let msg = "";
      switch (error.response.status) {
        case 400:
          msg = "错误请求";
          break;
        case 401:
          msg = "未授权，请重新登录";
          break;
        case 403:
          msg = "拒绝访问";
          break;
        case 404:
          msg = "请求错误,未找到该资源";
          //window.location.href = "/NotFound"
          break;
        case 405:
          msg = "请求方法未允许";
          break;
        case 408:
          msg = "请求超时";
          break;
        case 500:
          msg = "服务器端出错";
          break;
        case 501:
          msg = "网络未实现";
          break;
        case 502:
          msg = "网络错误";
          break;
        case 503:
          msg = "服务不可用";
          break;
        case 504:
          msg = "网络超时";
          break;
        case 505:
          msg = "http版本不支持该请求";
          break;
        default:
          // msg = `连接错误${error.response.status}`;
          msg = `连接错误`;
      }
      ElMessage.error(msg);
      if (error.response.status == 401) {
        store.dispatch("logout")
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        ElMessage.error("服务器响应超时，请刷新当前页");
      }
      else if (error.message) {
        ElMessage.error(error.message);
      } else {
        ElMessage.error("连接服务器失败");
      }

    }
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response);
  }
);
//4.导出
export default service;

