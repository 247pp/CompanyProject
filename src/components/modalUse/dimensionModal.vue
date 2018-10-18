<template>
  <div class="dimensionWrap">
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="维度">
      <div class="dimensionContent">
        <div class="dimensionWrapLeft ">
          <h4>备选项</h4>
          <div class="forSelect">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"/>
          </div>
        </div>
        <div class="dimensionWrapRight">
          <h4>已选项</h4>
          <div class="forSelectRight">
            <div class="resResult">郑州市库</div>
            <div class="resResult">洛阳市库</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      data: [{
        label: '一级 2',
        children: [{
          id: 1,
          label: '二级 2-1'
        }, {
          id: 2,
          label: '二级 2-2'
        }]
      }, {
        label: '一级 3',
        children: [{
          id: 3,
          label: '二级 3-1'
        }, {
          id: 4,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
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

  .dimensionWrap  {
    .el-dialog {
      width: $sw2-1;
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
        .el-tree>.el-tree-node {
            margin-bottom: 2px;
        }
        .el-tree-node {
          .el-tree-node__content{
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
              background:$sc11;
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
