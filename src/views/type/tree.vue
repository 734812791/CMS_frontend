<template>
  <div>
        <el-tree default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick" @node-contextmenu.stop="handleNodeContextmenu" />
  </div>


  <div id="menu">
    <div class="menu__item" @click="openUpdateDialog">更新</div> 
    <div class="menu__item" @click="deletaRow">削除</div> 
    <div class="menu__item" @click="openDialog">下級を追加</div>   
  </div>

  <typeDialog v-bind:dialogFlag="dialogFlag" @sendFlag="getFlag" :id="id"></typeDialog>
  <typeUpdateDialog v-bind:dialogFlag="updateDialogFlag" @sendFlag="getUpdateFlag" :id="id" :obj="obj"></typeUpdateDialog>
</template>

<script>
import typeDialog from './typeDialog.vue'
import typeUpdateDialog from './typeUpdateDialog.vue'

export default{

  components:{typeDialog,typeUpdateDialog},
  data () {
    return {
        list:[],
        defaultProps : {
        children: 'children',
        label: 'label',
        },
        data:[],
        dialogFlag:false,
        updateDialogFlag:false,
        id:'',
        obj:''
    }
  },
  mounted () {
    this.$http.post('type/getTypeList',{

    }).then((res)=>{
        this.list=res.data

        let data=[]
        for(let i=0;i<res.data.length;i++){
            if(res.data[i].pId==null){
                res.data[i].label=res.data[i].name
                data.push(res.data[i])
            }
        }

        for(let i=0;i<data.length;i++){
            data[i].children=this.treeList(data[i].id,this.list)  
        }

        this.data=data

    })
  },
  methods: {
    openUpdateDialog(){
      this.updateDialogFlag=true
    },
    deletaRow(){
      if(this.obj.children.length!=0){
        alert('该类别有下级，请先删除下级')
        return
      }

      this.$http.post('type/deleteType',{
        id:this.id
      }).then(()=>{
        location.reload()
      })
    },
    openDialog(){
      this.dialogFlag=true
    },
    handleNodeClick(data){
        // console.log(data)
        document.getElementById('menu').style.top= -500 + 'px';
        document.getElementById('menu2').style.top= -500 + 'px';
    },
    handleNodeContextmenu(ev,data){
      document.getElementById('menu2').style.top= -500 + 'px';
        console.log(data)

        this.obj=data
        this.id=data.id
        //获取我们自定义的右键菜单
        var menu=document.getElementById('menu');
        //根据事件对象中鼠标点击的位置，进行定位
        menu.style.left=ev.clientX-200+'px';
        menu.style.top=ev.clientY+'px';  
    },
    treeList(id,arr){
        
            let childArr=[]
            for(let j=0;j<arr.length;j++){
                if(id==arr[j].pId){
                    arr[j].label=arr[j].name
                    childArr.push(arr[j])
                    arr[j].children = this.treeList(arr[j].id,arr)
                }
            }
            return childArr;
        
    },
    getFlag(flag){
      this.dialogFlag=flag
    },
    getUpdateFlag(flag){
      this.updateDialogFlag=flag
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
</style>
