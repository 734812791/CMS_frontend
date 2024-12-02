<template>
    <div>
    <el-dialog
      v-model="dialogFlag"
      title="却下する理由"
      width="30%"
      :before-close="close"
    >
      <div>
          <textarea v-model="reason"></textarea>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">
            却下
          </el-button>
        </span>
      </template>
    </el-dialog>
    </div>
  </template>
  
  <script>
  
  import { ElMessageBox } from 'element-plus'
  
  export default {
    props:['dialogFlag','id'],
    emits:['sendFlag'],
    name: '',
    data () {
      return {
          price:'',
          number:'',
          reason:''
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
          this.$http.post('order/rejectOrder',{
              id:this.id,
              status:2,
              reason:this.reason
          })
  
          this.close
          location.reload()
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  