<template>
  <div style="width: 100%;height: 100%;" @click.prevent="click" @contextmenu.prevent="contextmenu">
    <tree></tree>
    <typeDialog v-bind:dialogFlag="dialogFlag" @sendFlag="getFlag" :id="id"></typeDialog>
  </div>
  <div id="menu2">
        <div class="menu__item" @click="openDialog">添加下级</div>   
  </div>
</template>

<script>
import tree from './tree.vue'
import typeDialog from './typeDialog.vue'
export default {
  name: '',
  components:{tree,typeDialog},
  data () {
    return {
      dialogFlag:false,
      id:''
    }
  },
  mounted () {
    
  },
  methods: {
    openDialog(){
      this.dialogFlag=true
    },
    getFlag(flag){
      this.dialogFlag=flag
    },
    click(){
      document.getElementById('menu2').style.top= -500 + 'px';
      document.getElementById('menu').style.top= -500 + 'px';
    },
    contextmenu(e){
      document.getElementById('menu').style.top= -500 + 'px';
      this.id=null
      //获取我们自定义的右键菜单
      var menu=document.getElementById('menu2');
        //根据事件对象中鼠标点击的位置，进行定位
        menu.style.left=e.clientX-200+'px';
        menu.style.top=e.clientY+'px';
          
    }
  }
}
</script>

<style scoped>
#menu2 {
  position: absolute;
  top: -500px;
  color: green;
} 
</style>
