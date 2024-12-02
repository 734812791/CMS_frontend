/**
 * 该工具类用于token的失效时间的配置
  在axios.js里，对请求发起之前进行数据的校验
**/
const TOKEN_TIME = "token_time"
//TOKEN设置为1小时失效
// const TOKEN_TIME_VALUE = 1000 * 6
const TOKEN_TIME_VALUE = 1000 * 60 * 60 * 24 * 7

//设置当前时间 登录成功后，调用该方法
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now())
}
//获取登录时间
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

/*判断时间是否过期*/
export const diffTokenTime = () => {
  let curTime = Date.now();
  let loginTime = getTokenTime();
  return curTime - loginTime > TOKEN_TIME_VALUE
}
