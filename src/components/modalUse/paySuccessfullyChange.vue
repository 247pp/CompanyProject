<template>
  <div class="dimensionWrap">
    <el-dialog
      :visible.sync="showPaySucc"
      :before-close="handleClose"
      :title="titleChange"
      class="paymentPage">
      <div class="dimensionContent">
        <div v-if="peymentSuc" class="sucClass">
          <p class="sucTitle">订单提交成功！</p>
          <p>订单流水：{{ newAccount.orderId }}</p>
        </div>
        <div v-if="paymentDetail">
          <el-card class="box-card detail1" style="padding: 32px 60px 0">
            <!--<div>客户信息</div>-->
            <el-row>
              <el-col :span="3" class="text item right"><span class="title" style="font-weight: 700">客户名称:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.custName }}</el-col>
            </el-row>
            <!--<div>-->
            <!--业务信息-->
            <!--</div>-->
            <el-row>
              <el-col :span="3" class="text item right"><span class="title">订单流水:</span>
              </el-col>
              <el-col :span="4" class="text item">小站开户</el-col>
              <el-col :span="3" class="text item right"><span class="title">区域信息:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.coverageRange }}</el-col>
              <el-col :span="3" class="text item right"><span class="title">产品信息:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ productInfo }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="text item right"><span class="title">增值产品:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ productInfoExtra }}</el-col>
              <el-col :span="3" class="text item right"><span class="title">上网服务:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.smallStationName }}</el-col>
              <el-col :span="3" class="text item right"><span class="title">发展人:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.users.devPerson }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="text item right"><span class="title">安装地址:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.installAddr }}</el-col>
              <el-col :span="3" class="text item right"><span class="title">联系人:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.installContact }}</el-col>
              <el-col :span="3" class="text item right"><span class="title">联系电话:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.users.phone }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="text item right"><span class="title">备注:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.note }}</el-col>
            </el-row>
            <!--<div>费用信息</div>-->
            <el-row>
              <el-col :span="3" class="text item right"><span class="title">营业费用:</span>
              </el-col>
              <el-col :span="4" class="text item">{{ newAccount.operaExpenses[0].feeAmount }}元</el-col>
            </el-row>
            <!--<div>付费方式</div>-->
            <el-row>
              <el-col :span="3" class="text item right">
                <span class="title" style="font-weight: 700">支付方式:</span>
              </el-col>
              <el-col :span="6" class="text item">
                <el-radio-group v-model="radio2">
                  <el-radio :label="3">现金</el-radio>
                  <el-radio :label="9">网银</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="showPayment" type="primary" @click="gotoPaymentPage">缴费</el-button>
        <el-button v-show="showClose" @click="closePage">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // getToken from cookie
import store from '@/store'
import router from '@/router'
import $ from 'jquery'

export default {
  data() {
    return {
      radio2: '',
      dialogVisible: false,
      paymentDetail: false,
      peymentSuc: true,
      secondChoice: '',
      showPaySucc: false,
      showClose: false,
      showPayment: true,
      newAccount: {
        custs: {},
        operaExpenses: [{}],
        users: {},
        products: [{
          propackages: []
        }],
        orderAccessory: {},
        rescources: []
      },
      orderPaymentSubmit: {},
      titleChange: '订单提交成功'
    }
  },
  computed: {
    productInfo() {
      const arr = []
      this.newAccount.products[0].propackages.filter((item) => {
        if (item.prodPackageType === '00') {
          arr.push(item.prodPackageName)
        }
      })
      return arr.join(',')
    },
    productInfoExtra() {
      const arr = []
      this.newAccount.products[0].propackages.filter((item) => {
        if (item.prodPackageType === '02') {
          arr.push(item.prodPackageName)
        }
      })
      return arr.join(',')
    }

  },
  mounted() {
    this.$bus.$on('hideDetailListen', (obj) => {
      this.showPaySucc = obj
    })
    this.$bus.$on('hideDetailListenData', (obj) => {
      console.log(obj)
      if (obj) {
        this.newAccount = obj
      }
    })
    this.$bus.$on('callbackEvent', function(data) {
      alert(data)
    })
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    },
    handleNodeClick(data) {
      console.log(data)
    },
    gotoPaymentPage() {
      sessionStorage.setItem('OrderId', this.newAccount.orderId)
      const thisT = this
      $.ajax({
        url: 'http://47.93.202.14:8101/json/PayMentFee.txt',
        type: 'GET',
        async: false,
        jsonpCallback: 'callback',
        dataType: 'jsonp',
        success: function(data) {

          // const data = res
          console.log(data)
          if (data.respCode === '0000') {
            thisT.paymentDetail = false
            thisT.showClose = true
            thisT.showPayment = false
            thisT.handleSelect()
            thisT.closePage()
            thisT.titleChange = '订单提交成功'
            thisT.$bus.$emit('paymentSucPageOrderId', thisT.newAccount.orderId)
            sessionStorage.setItem('OrderId', thisT.newAccount.orderId)
            return
          }
        }
      })
      // if (this.paymentDetail) {
      //   this.orderPaymentSubmit = {
      //     oderId: this.newAccount.orderId,
      //     fee: this.newAccount.operaExpenses[0].feeAmount,
      //     fee_code: this.newAccount.operaExpenses[0].feeCode,
      //     fee_name: this.newAccount.operaExpenses[0].feeName
      //   }
      //   console.log(this.orderPaymentSubmit)
      //   const thisT = this
      //   // Axios.get('http://47.93.202.14:8101/json/PayMentFee.txt').then(function(data) {
      //   //   console.log(data)
      //   //   if (data.data.respCode === '0000') {
      //   //     thisT.paymentDetail = false
      //   //     thisT.showClose = true
      //   //     thisT.showPayment = false
      //   //     thisT.handleSelect()
      //   //     thisT.closePage()
      //   //     thisT.titleChange = '订单提交成功'
      //   //     thisT.$bus.$emit('paymentSucPageOrderId', thisT.newAccount.orderId)
      //   //     sessionStorage.setItem('OrderId', thisT.newAccount.orderId)
      //   //     return
      //   //   }
      //   // })
      //
      //
      // }
      this.paymentDetail = true
      this.peymentSuc = false
      this.titleChange = '缴费'
    },

    handleSelect(key, keyPath) {
      this.activeIndex = key // 切换菜单
      const menuId = 1
      const roles = [getToken()]
      sessionStorage.removeItem('SideMenu') // 删除本地缓存的菜单项
      store.dispatch('GenerateRoutes', { roles, menuId }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters)
        this.$store.dispatch('delAllVisitedViews')
        router.push('/littleSite/paymentSuccPage')
      })
    },

    closePage() {
      this.showPaySucc = false
      this.peymentSucRes = false
      this.showClose = false
      this.showPayment = true
      this.peymentSuc = true
    }
  }
}
</script>
<style lang="scss">
  @import "src/styles/variables.scss";

  .dimensionWrap .paymentPage {
    .el-dialog {
      width: 900PX;
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
        font-size: $sfs1;
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
    .dimensionContent {
      width: 100%;
      min-height: 300px;
      overflow: hidden;
      position: relative;
      .sucClass {
        position: absolute;
        left: 0;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;
        margin: auto;
        width: 200px;
        height: 100px;
        text-align: center;
        .sucTitle {
          font-size: 16px;
          line-height: 30px;
          font-weight: 700;
        }
      }
      h4 {
        font-weight: $sfw1;
        font-size: $sfs1;
        margin: 20px 0 6px;
      }
      .dimensionWrapLeft {
        width: 322px;
        height: 294px;
        margin-left: 30px;
        float: left;
        .forSelect {
          border: 1px solid $sc16;
          width: 100%;
          height: 252px;
        }
        .el-tree > .el-tree-node {
          margin-bottom: 2px;
        }
        .el-tree-node {
          .el-tree-node__content {
            background-color: $sc11;
            .el-tree-node__label {
              font-weight: $sfw1;
            }
          }
          .is-focusable {
            .el-tree-node__content {
              background: $menuHover;
              .el-tree-node__label {
                font-weight: $sfw2;
              }
            }
          }
          .is-current {
            color: $menuHover;
            .el-tree-node__content {
              background: $sc1;
            }
          }
        }
      }
      .dimensionWrapRight {
        float: left;
        width: 210px;
        margin-left: 8px;
        height: 294px;
        .forSelectRight {
          border: 1px solid $sc16;
          width: 100%;
          height: 252px;
          .resResult {
            height: 24px;
            background: $sc11;
            padding: 5px 0 0 5px;
            font-weight: $sfw3;
          }
        }

        //   background: #f40;
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
