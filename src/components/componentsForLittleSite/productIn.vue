<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">{{ productTitle }}</div>

    <el-table
      v-if="buttonType=='radio'"
      :data="productInfo.listInfo"
      :height="listHeight"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="select">
      <el-table-column
        fixed
        prop=""
        label="产品名称">
        <template slot-scope="scope">
          <span v-if="productInfo.listInfo_name">{{ productInfo.listInfo_name }}</span>
          <span v-else>{{ scope.row.prodPackageName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="pkgElement.pkgElementName"
        label="产品包"/>
      <el-table-column
        prop="prodPackageDesc"
        label="包资费"/>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-radio

            :label="scope.row.prodPackageId"
            v-model="templateRadio"
            @change.native="getTemplateRow(scope.$index, scope.row)">
            选择
          </el-radio>

        </template>
      </el-table-column>
    </el-table>

    <el-table
      v-if="buttonType=='checkbox'"
      :data="productInfo.listInfo"
      :height="listHeight"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="select">
      <el-table-column
        fixed
        prop=""
        label="产品名称">
        <template slot-scope="scope">
          <span v-if="productInfo.listInfo_name">{{ productInfo.listInfo_name }}</span>
          <span v-else>{{ scope.row.prodPackageName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="pkgElement.pkgElementName"
        label="产品资费"/>
      <el-table-column
        prop="prodPackageDesc"
        label="产品描述"/>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selected"
            label="scope.row.selected"
            @change.native="handleChoose(scope.$index,scope.row)">
            选择
          </el-checkbox>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="productInfo.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="productInfo.limit"
        :total="productInfo.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </el-card>

</template>
<script>

export default {
  props: {
    listHeight: {
      default: '124',
      type: String
    },
    buttonType: {
      default: 'radio',
      type: String
    },
    productInfo: {
      type: Object,
      default() {
        return {
          listInfo: null,
          total: 0,
          page: 1,
          limit: 10,
          listInfo_name: ''
        }
      }
    },
    productTitle: {
      type: String,
      default: '产品信息'
    }

  },
  data() {
    return {
      listLoading: true,
      radio: 0,
      checkboxCheck: 0,
      templateSelection: '',
      templateRadio: '',
      multiProducts: []
    }
  },
  computed: {},
  created() {
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('listLimitChange', {
        'limit': val
      })
    },
    handleCurrentChange(val) {
      this.$emit('listPageChange', {
        'page': val
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    select(selection, row) {
      console.log(selection)
      console.log(row)
    },
    getTemplateRow(index, row) { // 获取选中数据
      this.templateSelection = row
      this.pushObj(row)
    },
    handleChoose(index, row) {
      // console.log(this)
      // this.$emit('listProductsInfoMulti', row)
    },
    pushObj(obj) {
      this.$emit('listProductsInfo', obj)
    }
  }
}
</script>
<style lang="scss">
</style>
