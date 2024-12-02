<!-- 用户管理页 -->
<template>
    <div>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input clearable placeholder="役名をご入力ください" v-model="queryParams.account"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button type="primary" @click="tableQuery">
              <el-icon>
                <Search />
              </el-icon>&nbsp;サーチ
            </el-button>
            <el-button type="primary" @click="openDialog">
              役職を追加
            </el-button>
          </el-col>
        </el-row>
      </el-card>
  
      <el-table :data="tableData" border stripe class="tableCls">
        <el-table-column prop="name" label="役名" width="180" />
        <el-table-column prop="flag" label="標識" width="180" />
        <!-- 单元格格式化的示例 -->
        <!-- <el-table-column prop="name" label="状态" width="180" :formatter="cellFormat" /> -->
        <!-- el-switch修改数值的示例 -->
        <!-- <el-table-column label="启用">
        <template v-slot="scope">
          <el-switch v-model="scope.row.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            @change="changeEnable(scope.row)" />
        </template>
      </el-table-column> -->
        <el-table-column prop="id" label="操作">
          <template v-slot="scope">
            <el-button size="small" type="primary" @click="openDialog($event,scope.row)">
              <el-icon>
                <Edit />
              </el-icon>編集
            </el-button>
            <el-button size="small" type="danger" @click="deleRole($event,scope.row.id)">
              <el-icon>
                <Delete />
              </el-icon>削除
            </el-button>
            <el-button size="small" type="primary" @click="openMenuDialogFlag($event,scope.row)">
              <el-icon>
                <Delete />
              </el-icon>メニューと関連
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:currentPage="queryParams.page" v-model:page-size="queryParams.size" :background="true"
        layout="->,total, prev, pager, next" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <InfoDialog :editObj="dialogUser" :title="dialogTitle" v-model="dialogFlag" @updateFlag="changeDialogFlag"
        @tableRefresh="initTableData" v-if="dialogFlag" />
      <menuDialog  :menuDialogFlag="menuDialogFlag" :obj="obj" @sendFlag="getMenuDialogFlag"></menuDialog>
    </div>
  </template>
  
  <script>
  import InfoDialog from './infoDialog.vue'
  import menuDialog from './menuDialog.vue'
  export default {
    name: 'user',
    components: { InfoDialog ,menuDialog},
    data () {
      return {
        queryParams: {//查询条件
          account: "",
          page: 1,
          size: 10
        },
        tableData: [],//每页数据
        total: 0,//总条数
        dialogFlag: false, //默认不显示dialog，true时显示窗口
        dialogTitle: "",//dialog的标题
        dialogUser: {},//点击编辑的时候，将表格行数据赋值给该参数，传递到dialog
        menuDialogFlag:false,
        obj:''
      }
    },
    mounted () {
      //组件挂载之后开始调用接口查询数据
      this.initTableData();
    },
  
    methods: {
      openMenuDialogFlag(ev,obj){
        this.menuDialogFlag=true
        this.obj=obj
      },
      getMenuDialogFlag(flag){
        this.menuDialogFlag=flag
      },
      initTableData () {
        this.$http.post('role/getRoleList',{
            page:this.queryParams.page,
            size:this.queryParams.size,
            account:this.queryParams.account
        }).then((res)=>{
            this.tableData=res.data
        })

        this.$http.post('role/getRoleTotal',{
            page:this.queryParams.page,
            size:this.queryParams.size,
            account:this.queryParams.account
        }).then((res)=>{
            this.total=res.total
        })

        // const res = this.$test.userTableData
        // if (res && res.code == 1) {
        //   //更新每页的数据
        //   this.tableData = res.rows
        //   //更新表格的总条数
        //   this.total = res.total
        // }
      },
      tableQuery (e) {
        //查询按钮的事件
        this.$clearCss(e);
        //点击了查询按钮
        this.queryParams.page = 1;
        this.initTableData();
      },
      handleSizeChange (val) {
        //每页条数变化
        this.initTableData();
      },
      handleCurrentChange (val) {
        //页码变化
        this.initTableData()
      },
      cellFormat (row, column, cellValue, index) {
        //单元格的数据格式化
        return cellValue + "状态值"
      },
      changeEnable (data) {
        //switch按钮触发更改状态值
        let user = {
          id: data.id,
          status: data.status
        }
        // this.$http.post("/user/changeStatus", user).then((res) => {
        //   if (res && res.code == 1) {
        //   }
        // });
      },
      openDialog (e, user) {//打开dialog，新增和编辑按钮触发
        //参数1，事件源对象
        //参数2，编辑的对象
        this.$clearCss(e);
        this.dialogFlag = true;
        if (!user) {//没有传递用户，则是添加
          this.dialogTitle = "役職を追加"
          this.dialogUser = {}
        } else {
          this.dialogTitle = "役職を編集"
          //进行深拷贝，防止后面修改数据对表格造成影响
          let _obj = JSON.stringify(user);
          this.dialogUser = JSON.parse(_obj);
        }
  
      },
      changeDialogFlag (flag) {
        //dialog内部触发该自定义方法，用于关闭dialog
        this.dialogFlag = flag;
      },
      deleRole (e, userId) {
        this.$clearCss(e);
        ElMessageBox.confirm(
          'このデータを削除するですか?',
          '確認',
          {
            confirmButtonText: 'はい',
            cancelButtonText: 'いいえ',
            type: 'warning',
          }
        )
          .then(() => {
            //远程调用服务端的接口，传递用户id，执行删除操作
            this.$http.post('role/deleteRole',{
                id:userId
            })
            ElMessage({
              type: 'success',
              message: '削除完了',
            })
            location.reload()
          })
          .catch(() => {
          })
      }
  
    }
  }
  </script>
  
  <style scoped>
  :deep(.el-pagination) {
    margin-top: 5px;
  }
  
  .tableCls {
    width: 100%;
    margin-top: 10px;
  }
  </style>
  