<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card">
    <div class="card-title">{{ areaObj.title }}</div>
    <el-form ref="areaForm" :inline="true" :rules="rulesPer" :model="ruleFormPer"
             class="demo-form-inline areaSelectInfo">
      <el-form-item v-if="areaObj.showArea" :label="areaObj.titleLabel+'：'" prop="channelInfo">
        <el-select v-model="ruleFormPer.channelInfo" class="areaSelectMenu" placeholder="请选择" @change="areaFunc()">
          <el-option
            v-for="item in optionsObj"
            :key="item.regionCode"
            :label="item.regionName"
            :value="item.regionCode"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!areaObj.litleSiteMulti" :label="areaObj.titleLabel+'：'" prop="custName">
        <el-select
          v-model="ruleFormPer.custName"
          class="areaSelectMenu"
          placeholder="请选择"
          @change="areaFuncUpdate()">
          <el-option
            v-for="item in optionsObj"
            :key="item.custId"
            :label="item.custName"
            :value="item.custId"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="areaObj.buttonShow">
        <el-button class="el-button--primary-28" v-if="!changeArea" type="primary" @click="chengeLitle">查询</el-button>
      </el-form-item>
      <el-form-item v-if="areaObj.title1" :label="areaObj.title1+'：'" prop="channelTitle">
        <el-select
          v-model="ruleFormPer.channelTitle"
          class="areaSelectMenu"
          placeholder="请选择"
          @change="areaFuncLitle()">
          <el-option
            v-for="item in smalltestObj"
            :key="item.userId"
            :label="item.smallStationName"
            :value="item.userId"/>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { queryUserscribeProdByUserInfoService } from '@/api/newAccount'

export default {
  props: {
    areaObj: {
      type: Object,
      default() {
        return {
          title: '区域信息',
          title1: '区域信息',
          buttonShow: true,
          validTips: '请选择服务等级',
          litleSiteMulti: true,
          showArea: false
        }
      }
    },
    optionsObj: {
      type: Array,
      default() {
        return []
      }
    },
    changeArea: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleFormPer: {
        channelInfo: '',
        channelTitle: '',
        custName: ''
      },
      rulesPer: {
        channelInfo: [
          { required: true, message: '请选择必选项', trigger: 'change' }
        ],
        channelTitle: [
          { required: true, message: '请选择必选项', trigger: 'change' }
        ],
        custName: [
          { required: true, message: '请选择必选项', trigger: 'change' }
        ]
      },
      options: [],
      listLoading: true,
      area: 1,
      qryStationNameObj: {
        userType: 2,
        custId: 2,
        status: 1
      },
      smalltestObj: [],
      userId: ''
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$on('area', (val) => {
      this.childAction(val)
    })

    this.$bus.$on('areaCodeChanged', data => {

    })
  },
  methods: {
    areaFunc() {
      // alert(9)
      this.$emit('showArea', {
        'areaValue': this.ruleFormPer.channelInfo
      })
    },
    areaFuncUpdate() {
      this.chengeLitle()
    },
    childAction() {
      this.$refs['areaForm'].validate((valid) => {
        if (valid) {
          this.areaFunc()
        } else {
          return false
        }
      })
    },
    chengeLitle() {
      console.log(3331110000000)
      // this.qryStationNameObj.custId = this.ruleFormPer.channelInfo
      console.log(this.qryStationNameObj)
      this.listLoading = true
      queryUserscribeProdByUserInfoService(this.qryStationNameObj).then(response => {
        this.smalltestObj = response.data.data
        console.log(response.data.data)
        console.log(this.smalltestObj)
        console.log('lllllllllllllllllllll')
        this.listLoading = false
      })
    },
    areaFuncLitle() {
      this.$emit('smallStation', {
        'areaValue': this.ruleFormPer.channelTitle
      })
    }
  }
}
</script>
<style lang="scss">
</style>
