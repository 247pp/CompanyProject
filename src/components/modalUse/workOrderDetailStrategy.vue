<template>
  <div class="dimensionWrap">
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="$t('strategyOrder.title3')">
      <div class="dimensionContent">
        <el-card class="box-card detail1" style="padding: 32px 60px 0">
          <el-row>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.custType') }}:</span>
            </el-col>
            <el-col :span="7" class="text item">{{ detail.row.custType }}</el-col>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.name') }}:</span>
            </el-col>
            <el-col :span="7" class="text item">{{ detail.row.custName }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.id') }}:</span></el-col>
            <el-col :span="7" class="text item">{{ detail.row.jobId }}</el-col>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.eventType') }}:</span>
            </el-col>
            <el-col :span="7" class="text item">{{ detail.row.eventType }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.identiNumber') }}:</span>
            </el-col>
            <el-col :span="7" class="text item">{{ detail.row.identiNumber }}</el-col>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.createdTime') }}:</span>
            </el-col>
            <el-col :span="7" class="text item">{{ detail.row.createTime }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="text item right"><span class="title">{{ $t('strategyOrder.orderDesc') }}:</span>
            </el-col>
            <el-col :span="19" class="text item">
              <p class="orderDesc">
                {{ detail.row.jobContent }}
              </p>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
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
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.$bus.$on('hideDetail', () => {
      this.dialogVisible = false
    })

    this.$bus.$on('showOrderDetailStrategy', (data) => {
      this.dialogVisible = true
      this.detail = data
    })
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss">
  @import "src/styles/variables.scss";

  .dimensionWrap {
    .el-dialog {
      width: $sw2-2;
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
