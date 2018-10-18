<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card">
    <el-checkbox v-model="checked" class="agreementCheck" @change="agreementFunc" >同意</el-checkbox>
    <a class="agreement" href="javascript:;">《亚太星通小站开户协议》</a>
    <div v-show="agreementChecked" class="agreementError">
      请勾选小站开户协议
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    agreementChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: false
    }
  },
  computed: {

  },
  created() {},
  methods: {
    agreementFunc() {
      console.log(1234)
      this.$emit('showAgreement', {
        'agreementChecked': !this.checked,
        'checked': this.checked
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
