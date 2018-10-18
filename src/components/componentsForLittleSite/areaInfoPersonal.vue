<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card">
    <div class="card-title">{{ areaObj.title }}</div>
    <el-form
      ref="areaForm"
      :inline="true"
      :rules="rulesPer"
      :model="ruleFormPer"
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
      <el-form-item v-if="!areaObj.litleSiteMulti" :label="areaObj.titleLabel+'：'" prop="custId">
        <el-select
          v-model="ruleFormPer.custId"
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
        <el-button class="el-button--primary-28" type="primary" @click="chengeLitle">查询</el-button>
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
import { productServiceQry, queryUserscribeProdByUserInfoService } from '@/api/newAccount'

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
      userId: '',
      productInfo: {
        listInfo: null,
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },
      productMultiInfo: {
        listInfo: null,
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },
      productCon: [],
      productA: [],
      basicProdArr: []
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$on('area', (val) => {
      this.childAction(val)
    })
  },
  methods: {
    areaFunc() {
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
      const data = {}
      // data.userType = JSON.parse(sessionStorage.getItem('cusObj')).custType
      data.userType = 2
      // data.custId = JSON.parse(sessionStorage.getItem('cusObj')).custId
      data.custId = this.ruleFormPer.custId
      // data.status = 0;
      this.listLoading = true
      queryUserscribeProdByUserInfoService({ ...data }).then(response => {
        this.smalltestObj = response.data.data
        this.ruleFormPer.channelTitle = ''
        this.$bus.$emit('showProductList', response.data.data)
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      productServiceQry(this.productListQuery).then(response => {
        const pro = response.data.data.propackage
        console.log(response)
        console.log(99999999999999999999)
        this.productInfo.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '00'
        })
        this.productMultiInfo.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '02'
        })
        this.onlyProduct = response.data.data
        console.log(response.data.data)
        console.log(this.onlyProduct)
      })
    },
    areaFuncLitle() {
      // 需要传的小站区域的productRegion信息 coverageRange
      const arr = this.smalltestObj
      let productRegion = ''
      for (const key in arr) {
        if (this.ruleFormPer.channelTitle === arr[key].userId) {
          // 假设值
          productRegion = arr[key].coverageRange
          productRegion = '0060'
        }
      }
      this.$emit('smallStation', {
        'areaValue': this.ruleFormPer.channelTitle,
        'productRegion': productRegion
      })
    }
  }
}
</script>
<style lang="scss">
</style>
