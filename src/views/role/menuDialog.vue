<template>
    <div>
    <el-dialog
      v-model="menuDialogFlag"
      title="关联菜单"
      width="30%"
      :before-close="close"
      :destroy-on-close="true"
    >
      <div>
        <menuTree :obj="obj" @sendCheckedMenuId="getCheckedMenuId"></menuTree>
        {{ this.checkedMenuId }}
      </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="submit">
              提出
            </el-button>
          </span>
        </template>
      </el-dialog>
      </div>
  </template>
  
  <script>
  
  import { ElMessageBox } from 'element-plus'
  import menuTree from './menuTree.vue'
  
  export default {
    components:{menuTree},
    props:['menuDialogFlag','obj'],
    emits:['sendFlag'],
    name: '',
    data () {
      return {
          name:'',
          checkedMenuId:''
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
          this.$emit('sendFlag',false)
      },
      close(){
          this.$emit('sendFlag',false)
      },
      submit(){
        console.log(this.checkedMenuId);
        this.$http.post('role/updateRoleMenu',{
          checkedMenuId:this.checkedMenuId.toString(),
          roleId:this.obj.id
        }).then((res)=>{
          location.reload()
        })
      },
      getCheckedMenuId(ids){
        this.checkedMenuId=ids
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  