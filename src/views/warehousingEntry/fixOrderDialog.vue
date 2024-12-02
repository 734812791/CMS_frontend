<template>
    <div>
    <el-dialog
      v-model="dialogFlag"
      title="オーダーを更新して再提出"
      width="30%"
      :before-close="close"
    >
      <div>
          単価<input v-model="price">
      </div>
      <div>
          数量<input v-model="number">
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
  
  export default {
    props:['dialogFlag','id'],
    emits:['sendFlag'],
    name: '',
    data () {
      return {
          price:'',
          number:''
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
          this.$http.post('order/fixOrder',{
              price:this.price,
              number:this.number,
              id:this.id,
              status:1
          })
  
          this.close
          location.reload()
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  