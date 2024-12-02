<template>
    <el-button  type="primary" @click="dialogVisible = true">
     選択
   </el-button>
 
   <el-dialog
     v-model="dialogVisible"
     title="プロダクトをご選択ください"
     width="30%"
   >
     <div>
         <tree @sendRow="getRow"></tree>
     </div>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="dialogVisible = false">
           選択
         </el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script>
 import { ref } from 'vue'
 import { ElMessageBox } from 'element-plus'
 import tree from './tree.vue'
 
 export default {
   emits:['sendRow'],
   components:{tree},
   name: '',
   data () {
     return {
         dialogVisible:ref(false),
         row:{}
     }
   },
   mounted () {
 
   },
   methods: {
     handleClose(){
         ElMessageBox.confirm('Are you sure to close this dialog?')
         .then(() => {
         done()
        })
        .catch(() => {
        // catch error
        })
    },
    getRow(row){
        if(row.children.length>0){
            alert('该类别有下级，无法被选择')
            return
        }
        this.$emit('sendRow',row)
    }
   }
 }
 </script>
 
 <style scoped>
 .dialog-footer button:first-child {
   margin-right: 10px;
 }
 </style>
 