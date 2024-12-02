<template>
  <div>菜单配置页面</div>
  <el-menu style="height:auto" class="el-menu-vertical-demo" active-text-color="#ffd04b" 
    text-color="black" @open="handleOpen" @close="handleClose" :default-active="defaultPage" router unique-opened
    :collapse="!$store.getters.siderType" :collapse-transition='false'>
    <template v-for="subitem in list" :key="subitem.id">
      <el-sub-menu v-if="subitem.menus &&subitem.menus.length>0" :index="subitem.id">
        <template #title>
          <el-icon>
            <component :is="subitem.icon"></component>
          </el-icon>
          <span @contextmenu.stop="rightClick($event,subitem.text,subitem.url,subitem.icon,subitem.order,subitem.menus,subitem.id)">{{subitem.text}}</span>
        </template>
        <el-menu-item v-for="item in subitem.menus" @click="changePage(item.url)" :index="'/index' + item.url"
          :key="item.id">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span @contextmenu.stop="rightClick($event,item.text,item.url,item.icon,item.order,item.menus,item.id)">{{item.text}}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="'/index' + subitem.url" @click="changePage(subitem.url)">
        <el-icon>
          <component :is="subitem.icon"></component>
        </el-icon>
        <span @contextmenu.stop="rightClick($event,subitem.text,subitem.url,subitem.icon,subitem.order,subitem.menus,subitem.id)">{{subitem.text}}</span>
      </el-menu-item>
    </template>
  </el-menu>
  <div id="menu">
        <div class="menu__item" @click="show(true)">添加下级</div>   
  </div> 
  <div id="menu2">
        <div class="menu__item" @click="showUpdate(true)">修改</div>
        <div class="menu__item" @click="deleteMenu">删除</div> 
        <div class="menu__item" @click="addSonMenu(true)">添加下级</div>    
  </div> 
  
  <modal :visible=this.showAdd>
    <template #content>
      菜单名称：<input v-model="text"><br>
      菜单链接：<input v-model="url"><br>
      菜单图标：<input v-model="icon"><br>
      菜单顺序：<input v-model="order"><br>
      <button @click="show(false)">关闭</button>
      <button @click="addMenu">提交</button>
    </template>
  </modal>

  

</template>

<script>
import modal from './modal.vue'
export default {
  name: '',
  components:{modal},
  data () {
    return {
      list: [],
      text:'',
      url:'',
      icon:'',
      order:'',
      showAdd:false,
      menus:'',
      id:'',
      isAdd:'',
      roleId:'1'
    }
  },
  mounted () {

    this.queryMenuList();

    window.oncontextmenu=function(e){
            document.getElementById('menu2').style.top= -500 + 'px';   
            //取消默认的浏览器自带右键
            e.preventDefault();
            //获取我们自定义的右键菜单
            var menu=document.getElementById('menu');
            //根据事件对象中鼠标点击的位置，进行定位
            menu.style.left=e.clientX-200+'px';
            menu.style.top=e.clientY+'px';
                    
        } 

    window.onclick=function(e){
        document.getElementById('menu').style.top= -500 + 'px';
        document.getElementById('menu2').style.top= -500 + 'px';
    } 
  },
  methods: {
    menusHandler(data) {
      menu=[]
      
    },
    queryMenuList () {
      //写远程调用接口获取服务器的数据
      //此处暂时拿测试数据
      this.$http.post('index/getAllMenu',{
        roleId:this.roleId
      }).then((res)=>{
        
        this.list=res.data;
       
        // for(let i=0;i<this.list.length;i++){
        //       this.list[i].menus=[]
        //       for(let j=0;j<this.list.length;j++){
        //         // console.log(this.list[i].id,'---',this.list[j].id,'---',this.list[j].pid);
        //         if(this.list[i].id==this.list[j].pid){
        //           this.list[i].menus.push(this.list[j])
        //           this.list.splice(j,1)
        //           j--
        //         }
        //       }
        // }

        let data=[]
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].pid==null || res.data[i].pid==''){
            data.push(res.data[i])
          }
        }

        for(let i=0;i<data.length;i++){
          data[i].menus=this.treeList(data[i].id,res.data)
        }

        this.list=data
      })
      
      // this.list = this.$test.menuData.data;
    },
    show(flag){
      this.showAdd=''
      this.text=''
      this.url=''
      this.icon=''
      this.order=''
      this.id=''
      this.showAdd=flag
      this.isAdd=true
    },
    showUpdate(flag){
      this.showAdd=flag
      this.isAdd=false
    },
    addSonMenu(flag){
      this.showAdd=''
      this.text=''
      this.url=''
      this.icon=''
      this.order=''
      this.showAdd=flag
      this.isAdd=true
    },
    addMenu(){
      this.$http.post('index/addMenu',{
        text:this.text,
        url:this.url,
        icon:this.icon,
        order:this.order,
        id:this.id,
        isAdd:this.isAdd
      })
      window.location.reload()
    },
    deleteMenu(){
      if(this.menus==[]||this.menus==undefined||this.menus==''){
        console.log(this.id);
        this.$http.post('index/deleteMenu',{
          id:this.id,
        })
        window.location.reload()
      }else{
        alert('该菜单有下级，无法删除')
      }
    },
    rightClick(e,text,url,icon,order,menus,id){
      this.text=text
      this.url=url
      this.icon=icon
      this.order=order
      this.menus=menus
      this.id=id
      document.getElementById('menu').style.top= -500 + 'px';
      //取消默认的浏览器自带右键
      e.preventDefault();
            //获取我们自定义的右键菜单
            var menu=document.getElementById('menu2');
            //根据事件对象中鼠标点击的位置，进行定位
            menu.style.left=e.clientX-200+'px';
            menu.style.top=e.clientY+'px';
    },
    treeList(id,arr){
      let menusList=[]
      for(let j=0;j<arr.length;j++){
        if(id == arr[j].pid){
          menusList.push(arr[j])
          this.treeList(arr[j].id,arr)
        }
      }
      return menusList
    }
  }
}
</script>

<style scoped>
#menu {
  position: absolute;
  top: -500px;
  color: green;
} 
#menu2 {
  position: absolute;
  top: -500px;
  color: green;
} 
</style>
