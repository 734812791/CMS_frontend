<template>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-checked-keys="this.ids"
      :props="defaultProps"
      default-expand-all
      @check="check"
    />
  </template>

<script>
export default {
  name: '',
  props:['obj'],
  emits:['sendCheckedMenuId'],
  data () {
    return {
        ids:[],
        defaultProps:{
        children: 'children',
        label: 'label',
        },
        data:[],
        checkedMenuId:[]
    }
  },
  async mounted () {

    await this.getRoleMenu()
    await this.queryMenuList()
    this.checkedMenuId=this.ids
    this.$emit('sendCheckedMenuId',this.checkedMenuId)
    
  },
  methods: {
    check(row,state){
      this.checkedMenuId=[]
        for(let i=0;i<state.checkedNodes.length;i++){
          this.checkedMenuId.push(state.checkedNodes[i].id)
          if(state.checkedNodes[i].pid!=null&&state.checkedNodes[i].pid!=''&&this.checkedMenuId.indexOf(state.checkedNodes[i].pid)==-1){
            this.checkedMenuId.push(state.checkedNodes[i].pid)
          }
        }
      this.$emit('sendCheckedMenuId',this.checkedMenuId)
    },
    getRoleMenu(){

        this.$http.post('index/menu',{
        id:this.obj.id
        }).then((res)=>{
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].pid!=null&&res.data[i].pid!=''){
                    this.ids.push(res.data[i].id)
                }
                
            }
        })
    
    },
    queryMenuList () {
      //写远程调用接口获取服务器的数据
      //此处暂时拿测试数据
      this.$http.post('index/getAllMenu',{
        roleId:this.roleId
      }).then((res)=>{
        this.list = res.data;
       
        let data=[]
        for(let i=0;i<res.data.length;i++){
            if(res.data[i].pid==null||res.data[i].pid==''){
                res.data[i].label=res.data[i].text
                data.push(res.data[i])
            }
        }

        for(let i=0;i<data.length;i++){
            data[i].children=this.treeList(data[i].id,this.list)  
        }

        this.data=data
      })
    },
    treeList(id,arr){
        let childArr=[]
            for(let j=0;j<arr.length;j++){
                if(id==arr[j].pid){
                    arr[j].label=arr[j].text
                    childArr.push(arr[j])
                    arr[j].children = this.treeList(arr[j].id,arr)
                }
            }
            return childArr;
    }
  }
}
</script>

<style scoped>

</style>
