<template>
  <el-menu style="height:100%" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#304156"
    text-color="#fff" @open="handleOpen" @close="handleClose" :default-active="defaultPage" router unique-opened
    :collapse="!$store.getters.siderType" :collapse-transition='false'>
    <template v-for="subitem in list" :key="subitem.id">
      <el-sub-menu v-if="subitem.menus &&subitem.menus.length>0" :index="subitem.id">
        <template #title>
          <el-icon>
            <component :is="subitem.icon"></component>
          </el-icon>
          <span>{{subitem.text}}</span>
        </template>
        <el-menu-item v-for="item in subitem.menus" @click="changePage(item.url)" :index="'/index' + item.url"
          :key="item.id">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{item.text}}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="'/index' + subitem.url" @click="changePage(subitem.url)">
        <el-icon>
          <component :is="subitem.icon"></component>
        </el-icon>
        <span>{{subitem.text}}</span>
      </el-menu-item>
    </template>
  </el-menu>



</template>

<script>



export default {
  name: '',
  data () {
    return {
      defaultPage: "",//为了让页面刷新后还是打开上一次的组件
      list: [],
      roleId:''
    }
  },
  mounted () {
    this.roleId=localStorage.getItem('roleId')

    //页面刷新后的加载组件 layout下的index.vue也有配置
    this.defaultPage = sessionStorage.getItem('path') || "/index/welcome";

    //查询后端菜单数据
    this.queryMenuList();

  },
  methods: {
    queryMenuList () {
      //写远程调用接口获取服务器的数据
      //此处暂时拿测试数据
      this.$http.post('index/menu',{
        roleId:this.roleId
      }).then((res)=>{
        
        this.list = res.data;
       
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
    menus(){

    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },

    changePage (path) {
      //点击了菜单按钮后，记录当前按钮的path值
      let t = '/index' + path
      this.defaultPage = t
      sessionStorage.setItem('path', t)
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

</style>
