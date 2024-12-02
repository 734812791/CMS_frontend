<template>
  <div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" @contextmenu.prevent="handleNodeClick(row)" />
  </div>
</template>

<script>


export default {

  emits:['sendRow'],
  data () {
    return {
        list:[],
        defaultProps : {
        children: 'children',
        label: 'label',
        },
        data:[]
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
    handleNodeClick(data){
        console.log(data)
        this.$emit('sendRow',data)
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
        
    }
  }
}
</script>

<style scoped>

</style>
