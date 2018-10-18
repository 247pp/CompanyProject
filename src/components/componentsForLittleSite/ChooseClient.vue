<template>
  <div class="ChoiceClientWrap">
    <el-dialog
      :visible.sync="cusChoice"
      :before-close="handleClose"
      title="客户选择">
      <div/>
      <div class="content">
        <div class="twoChoice">
          <div class="personClient">
            <img :src="imageRightSing" alt="">
            <a href="javascript:;" @click="returnCus('个人客户选择')">个人客户</a>
          </div>
          <div class="enterClient">
            <img :src="imageRightSing" alt="">
            <a href="javascript:;" @click="returnCus('企业客户选择')">企业客户</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imageRightSing from '@/assets/site/rightSign.png'

export default {
  props: {
    cusChoice: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      imageRightSing
    }
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = true
    },
    handleNodeClick(data) {
      console.log(data)
    },
    returnCus(val) {
      this.$emit('cusShow', {
        cusChoice: false,
        result: val
      })
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
      display: none;
      .el-icon-close {
        color: $menuHover;
      }
    }
  }
  .content {
    min-height: 355px;
    width: 100%;
    position: relative;
    .twoChoice {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      width: 340px;
      height: 102px;
      .personClient,
      .enterClient {
        width: 80px;
        height: 104px;
        text-align: center;
        a {
          font-size: 20px;
          text-decoration: underline;
          font-weight: 400;
          display: block;
          margin-top: 40px;
        }
      }
      & > .personClient {
        float: left;
      }
      & > .enterClient {
        float: right;
      }
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
