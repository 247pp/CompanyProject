<template>
  <div class="dimensionWrap">
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="titleA"
      class="orderS">
      <div class="dimensionContent">
        <el-card class="box-card detail1" style="padding: 32px 60px 0">
          <!--<div>客户信息</div>-->
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">客户名称:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.custs.custName }}</el-col>
          </el-row>
          <!--<div>-->
          <!--业务信息-->
          <!--</div>-->
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">受理类型:</span>
            </el-col>
            <el-col :span="4" class="text item">小站开户</el-col>
            <el-col :span="3" class="text item right"><span class="title">小站名称:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.users.smallStationName }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">上网账号:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ internetServiceAccount }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">上网密码:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ internetServicePassword }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">订单流水:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.orderId }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">区域信息:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.coverageRange }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">产品信息:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ productInfo }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">增值产品:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ productInfoExtra }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">上网服务:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.internetModel }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">服务等级:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.users.slaMess }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">发展人:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.users.devPerson }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">安装地址:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.installAddr }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">联系人:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.installContact }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">联系电话:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.users.phone }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">备注:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.note }}</el-col>
          </el-row>
          <!--<div>费用信息</div>-->
          <el-row>
            <el-col :span="3" class="text item right"><span class="title">产品费用:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ productFee }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">增值费用:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ productFeeExtra }}</el-col>
            <el-col :span="3" class="text item right"><span class="title">营业费用:</span>
            </el-col>
            <el-col :span="4" class="text item">{{ newAccount.operaExpenses[0].feeAmount }}</el-col>
          </el-row>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">打  印</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      detail: {
        row: [
          {
            'id': '',
            'name': '',
            'clientType': '',
            'orderType': '',
            'orderStatus': '',
            'createdDate': ''
          }
        ]
      },
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      titleA: '免填单预览'
    }
  },
  computed: {
    productFee() {
      const arr = this.newAccount.products[0].propackages.filter((item) => {
        return item.prodPackageType === '00'
      })
      return arr.orderDiscnt
    },
    productFeeExtra() {
      let str = ''
      this.newAccount.products[0].propackages.filter((item) => {
        if (item.prodPackageType === '02') {
          str += Number(item.orderDiscnt)
        }
      })
      return str
    },
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
    },
    internetServiceAccount() {
      const arr = []

      this.newAccount.rescources.filter((item, index) => {
        if (item.accountName) {
          arr.push(index + '.' + item.accountName + '  ')
        }
      })
      return arr.join(' ')
    },
    internetServicePassword() {
      const arr = []
      this.newAccount.rescources.filter((item, index) => {
        if (item.accountPassword) {
          arr.push(index + '.' + item.accountPassword + '  ')
        }
      })
      return arr.join(' ')
    }
  },
  mounted() {
    this.$bus.$on('hideDetail', () => {
      this.dialogVisible = false
    })

    this.$bus.$on('passOrderData', (data) => {
      this.dialogVisible = true
      if (data) {
        this.newAccount = data
      }
      console.log(data)
    })
    console.log(this.newAccount)
    console.log(11111111111111111111111111111111111)
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    },
    handleNodeClick(data) {
      console.log(data)
    },
    close() {
      this.$emit('orderClose', {
        orderClose: false
      })
    }
  }
}
</script>
<style lang="scss">
  @import "src/styles/variables.scss";

  .dimensionWrap .orderS {
    .el-dialog {
      width: 900px;
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
      overflow: hidden;
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
