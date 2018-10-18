<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card">
    <div class="card-title">渠道信息</div>
    <el-form ref="areaForm" :inline="true" :rules="rulesPer" :model="ruleFormPer" class="demo-form-inline">
      <el-form-item label="发展人：" prop="channelInfo" >
        <el-input v-model="ruleFormPer.channelInfo" placeholder="" @change="channelFunc()" />
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      ruleFormPer: {
        channelInfo: ''
      },
      rulesPer: {
        channelInfo: [
          { required: true, message: '请输入发展人', trigger: '' }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.$on('channel', (val) => {
      this.childAction(val)
    })
  },
  methods: {
    channelFunc() {
      this.$emit('showChannel', {
        'channelValue': this.ruleFormPer.channelInfo
      })
    },
    childAction() {
      this.$refs['areaForm'].validate((valid) => {
        if (valid) {
          this.channelFunc()
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
