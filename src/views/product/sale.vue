<template>
  <el-button  type="primary" @click="dialogVisible = true">
    売渡
 </el-button>

 <el-dialog
   v-model="dialogVisible"
   title="売渡"
   width="30%"
 >
   <div>
       プロダクト <input readonly v-model="name"> <selectTypeDialog @sendRow="getRow"></selectTypeDialog><br>
       売渡単価 　<input v-model="price"><br>
       売渡数量 　<input v-model="number"><br>
   </div>
   <template #footer>
     <span class="dialog-footer">
       <el-button @click="dialogVisible = false">取消</el-button>
       <el-button type="primary" @click="submit">
         提出
       </el-button>
     </span>
   </template>
 </el-dialog>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import selectTypeDialog from './selectTypeDialog.vue'

export default {
 components:{selectTypeDialog},
 name: '',
 data () {
   return {
       dialogVisible:ref(false),
       name:'',
       id:'',
       price:'',
       number:'',
       creater:'',
       createrId:''
   }
 },
 mounted () {
   this.createrId=localStorage.getItem('userId')
   this.creater=localStorage.getItem('userName')
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
       this.name=row.name
       this.id=row.id
   },
   submit(){
       this.$http.post('order/addOrder',{
           id:'',
           typeId:this.id,
           number:this.number,
           price:this.price,
           creater:this.creater,
           createrId:this.createrId,
           orderType:2,
           status:1
       }).then((res)=>{
         alert('提交成功')
       })

       this.dialogVisible = false
   }
 }
}
</script>

<style scoped>
.dialog-footer button:first-child {
 margin-right: 10px;
}
</style>
