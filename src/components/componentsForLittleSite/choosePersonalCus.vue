<template>
  <div class="ChoiceClientWrap">
    <el-dialog
      :visible.sync="cusIdObj.cusIdVisible"
      :before-close="handleClose"
      :title="cusIdObj.cusIdFind">
      <div/>
      <div class="content">
        <div class="chooseListWrap">
          <div class="demo-input-suffix">
            <div class="inputTitWrap">
              <div class="inputTit">
                客户名称：
              </div>
              <el-input
                v-model="personalInfoQuery.custName"
                placeholder=""/>
            </div>
            <div class="inputTitWrap">
              <div class="inputTit">
                证件号码：
              </div>
              <el-input v-model="personalInfoQuery.certNo"/>
            </div>
          </div>
          <el-button class="search" @click="getList()">查询</el-button>
        </div>
        <div class="enterpriseWrap">
          <div v-if="!personalInfo">
            <h1 style="font-weight: 700;font-size: 14px">未查询到客户资料，是否立即创建？</h1>
          </div>
          <el-table
            v-if="personalInfo"
            :data="personalInfo"
            style="width: 100%"
            height="160">
            <el-table-column
              fixed
              prop="custName"
              label="客户名称"/>
            <el-table-column
              prop="certNo"
              label="证件号码"/>
            <el-table-column
              prop="sex"
              label="性别"/>
            <el-table-column
              prop="city"
              label="操作">
              <template slot-scope="scope">
                <el-checkbox v-model="cusChecked" label="" @change.native="chooseEnterprise(scope.row)"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="!personalInfo" type="primary" @click="createNewAccount()">立即创建</el-button>
        <el-button v-show="personalInfo" type="primary" @click="returnCusSearch">确 定</el-button>
        <el-button @click="closeModel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { qryCustInfoService } from '@/api/clientManagement'
import { getToken } from '@/utils/auth' // getToken from cookie
import store from '@/store'
import router from '@/router'

export default {
  props: {
    cusIdObj: {
      type: Object,
      default() {
        return {
          cusIdFind: '个人客户选择',
          cusIdVisible: false
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      enterpriseName: '',
      enterpriseCertificate: '',
      personalInfo: [],
      enterpriseId: 3,
      personalInfoQuery: {
        custName: '',
        certNo: ''
      },
      cusChecked: false,
      choiceName: ''
    }
  },
  created() {
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    },
    handleNodeClick(data) {
      console.log(data)
    },
    getList() {
      if (!this.personalInfoQuery.custName && !this.personalInfoQuery.certNo) {
        this.$message({
          message: '请输入查询条件',
          type: 'warning'
        })
        return
      }
      this.listLoading = true
      qryCustInfoService({ ...this.personalInfoQuery }).then(response => {
        console.log(response.data.respCode)
        if (response.data.respCode !== '9999') {
          this.choiceName = response.data.data.custName
          if (!this.personalInfo) {
            this.personalInfo = []
            this.personalInfo[0] = response.data.data
          } else {
            this.personalInfo = []
            this.personalInfo.push(response.data.data)
          }
        } else {
          this.personalInfo = null
        }
        this.listLoading = false
      })
    },
    reset() {
      this.personalInfo = []
      this.personalInfoQuery = {
        custName: '',
        certNo: ''
      }
      this.cusChecked = false
    },
    returnCusSearch() {
      if (!this.cusChecked) {
        this.$message({
          message: '请选择客户',
          type: 'warning'
        })
        return
      }
      this.$bus.$emit('getCustomerName', this.choiceName)
      console.log(this.cusChecked)
      sessionStorage.setItem('cusObj', JSON.stringify(this.personalInfo[0]))
      this.closeModel()
      this.reset()
    },
    closeModel() {
      this.$emit('cusSearchShowPerson', {
        cusChoice: false
      })
    },
    chooseEnterprise(row) {
      console.log(row)
    },
    createNewAccount() {
      this.$emit('cusSearchShowPerson', {
        cusChoice: false
      })
      this.$bus.$emit('changeTopMenuIndex', '3')
      const menuId = 3
      const roles = [getToken()]
      sessionStorage.removeItem('SideMenu') // 删除本地缓存的菜单项
      store.dispatch('GenerateRoutes', { roles, menuId }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters)
        router.push('/clientManagementPersonal/openAccountPersonalA')
      })
      this.reset()
    }
  }
}
</script>
<style lang="scss">
@import "src/styles/variables.scss";

.ChoiceClientWrap {
  .el-dialog {
    width: $sww;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    padding: 0 20px 0;
    background-color: $sc1;
    .el-dialog__title {
      color: $menuHover;
      line-height: $sh8;
      font-size: $sfs0;
      font-weight: $sfw1;
    }
    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
      .el-icon-close {
        color: $menuHover;
      }
    }
  }
  .content {
    min-height: 355px;
    width: 100%;
    position: relative;
    .chooseListWrap {
      padding: 30px 40px 40px;
      .inputTitWrap {
        float: left;
        margin-right: 20px;
        .el-input {
          width: 170px;
        }
      }
      .inputTit {
        float: left;
        line-height: $sh5;
      }
      .el-input--medium {
        float: left;
        width: 170px;
        input {
          height: $sh5;
          width: 150px;
        }
      }
      .el-button {
        background: $sc1;
        width: 70px;
        height: $sh5;
        color: $menuHover;
        line-height: 0;
      }
    }
    .enterpriseWrap {
      margin: 0 40px;
    }
  }
  .el-dialog__footer {
    text-align: center;
    padding: 26px 0 14px;
    .el-button {
      width: $sw5;
      height: $sh5;
      line-height: $sh5;
      padding: 0;
      &.el-button--primary {
        color: $menuHover;
        background-color: $sc1;
        border-color: $sc1;
      }
      &.el-button--default {
        background-color: $sc17;
        color: $menuHover;
      }
    }
  }
}
</style>
