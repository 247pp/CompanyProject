<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">{{ $t('strategyOrder.title2') }}</div>
    <el-table
      :data="listInfo"
      :height="listHeight"
      style="width: 100%">
      <el-table-column
        :label="$t('strategyOrder.id')"
        fixed
        prop="jobId"/>
      <el-table-column
        :label="$t('strategyOrder.name')"
        prop="custName"
      />
      <el-table-column
        :label="$t('strategyOrder.custType')"
        prop="custType"
      />
      <el-table-column
        :label="$t('strategyOrder.eventType')"
        prop="eventType"
      />
      <el-table-column
        :label="$t('strategyOrder.identiNumber')"
        prop="identiNumber"
      />
      <el-table-column
        :label="$t('strategyOrder.createdTime')"
        prop="createTime"
      />
      <el-table-column :label="$t('table.actions')" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleClick(scope.$index, scope.row)">{{ $t('table.detail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </el-card>
</template>
<script>
import { fetchList } from '@/api/newAccount'

export default {
  props: {
    listHeight: {
      default: '124',
      type: String
    },
    listInfo: {
      default: function() {
        return []
      },
      type: Array
    },
    total: {
      default: 0,
      type: Number
    },
    pageNo: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: this.pageNo || 1,
        limit: 10
      },
      radio: 0
    }
  },
  created() {
    // this.getList()
    this.$bus.$on('resetPageworkOrderTable', data => {
      this.listQuery.page = 1
    })
  },
  methods: {
    handleClick(index, row) {
      this.$bus.$emit('showOrderDetailStrategy', { index, row })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery.page).then(response => {
        this.listInfo = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.$bus.$emit('changPage', this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.$bus.$emit('changPageOrderSearchStrategy', this.listQuery)
    }
  }
}
</script>
