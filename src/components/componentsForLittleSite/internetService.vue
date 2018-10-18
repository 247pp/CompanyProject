<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card">
    <div class="card-title">上网服务</div>
    <template>
      <el-radio-group v-model="radioRes" class="checkGroupInternet" @change="computeModem()">
        <el-radio :label="1">单modem独享带宽</el-radio>
        <el-radio :label="2">多modem共享带宽</el-radio>
        <el-radio :label="3">多modem共享带宽， 其中一个或多个独享部分带宽</el-radio>
        <el-radio :label="4">多modem，一个或多个小站里面的部分服务独享一定带宽</el-radio>
      </el-radio-group>
    </template>
    <div class="demo-input-suffix modemInput">
      <el-form ref="" :inline="true" :rules="rulesPer" :model="ruleFormPer" class="demo-form-inline areaSelectInfo">
        <el-form-item :label="'modem数量'" prop="modemNum">
          <el-input
            v-model="ruleFormPer.modemNum"
            :disabled="modemInput"
            placeholder=""/>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      ruleFormPer: {
        modemNum: ''
      },
      rulesPer: {
        modemNum: [
          { require: true, message: '请输入正整数', trigger: 'blur' }]
      },
      radioRes: '',
      modemInput: false
    }
  },
  computed: {
    modemNum() {
      return this.ruleFormPer.modemNum
    }
  },
  watch: {
    radioRes: function(new1, old) {
      this.emitObj()
    },
    modemNum: function(new1, old) {
      this.emitObj()
    }
  },
  created() {},
  methods: {
    emitObj() {
      this.$emit('serviceValue', {
        radioRes: this.radioRes,
        modemCount: this.ruleFormPer.modemNum,
        modemId: this.ruleFormPer.modemNum
      })
    },
    computeModem() {
      if (this.radioRes === 1) {
        this.modemInput = true
        this.ruleFormPer.modemNum = 1
      } else {
        this.modemInput = false
      }
    }
  }
}
</script>
<style lang="scss">
</style>
