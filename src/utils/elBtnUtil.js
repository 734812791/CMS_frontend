//el-button 点击并移开鼠标后，并不会自动失去焦点，所以每次点击后，要主动失去焦点，让样式切换
//此方法需要主动调用，放在main.js 全局注册了
const clearCss = (e) => {
  let target = e.target;
  // 根据button组件内容 里面包括一个span标签，如果设置icon，则还包括一个i标签，其他情况请自行观察。
  // 所以，在我们点击到button组件上的文字也就是span标签上时，直接执行e.target.blur()不会生效，所以要加一层判断。
  if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
    target = e.target.parentNode;
  }
  target.blur();
}
export default clearCss;