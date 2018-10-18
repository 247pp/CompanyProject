<template>

  <el-card :body-style="{ padding: '15px', }" class="box-card">
    <div class="paymentWrap">
      <div class="sucClass">
        <p class="sucTitle">缴费成功！</p>
        <p>订单流水：{{ orderId }}</p>
      </div>
      <div style="position: absolute; bottom: 0;width:100%;text-align: center">
        <el-button type="primary" @click="closeThisPage">关 闭</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import router from '@/router'
export default {
  data() {
    return {
      orderId: ''
    }
  },
  mounted() {
    this.orderId = sessionStorage.getItem('OrderId')
  },
  methods: {
    closeThisPage() {
      this.$store.dispatch('delAllVisitedViews')
      router.push('/dashboard')
      this.$bus.$emit('reloadPageListener', '')
    }
  }
}
</script>
<style lang="scss">
  .paymentWrap {
    width: 100%;
    height: 500px;
    position: relative;
    .sucClass {
      position: absolute;
      left: 0;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
      margin: auto;
      width: 300px;
      height: 100px;
      text-align: center;
      .sucTitle {
        font-size: 32px;
        line-height: 32px;
        font-weight: 700;
        margin-bottom: 24px;
      }
    }
  }
</style>
