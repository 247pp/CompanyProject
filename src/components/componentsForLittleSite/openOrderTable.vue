<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">{{ $t('strategyOrder.title5') }}</div>
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
        label="工单类型"
        prop="jobType"
      />
      <el-table-column
        label="工单状态"
        prop="jobStatus"
      />
      <el-table-column
        :label="$t('strategyOrder.createdTime')"
        fixed
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
        :current-page="listQuery.page"
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
import { parseTime } from '@/utils'

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
    }
  },
  data() {
    return {

      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      radio: 0
    }
  },
  created() {
    // this.getList()
    this.$bus.$on('resetPageorderSearchOpen', data => {
      this.listQuery.page = 1
    })
  },
  methods: {
    handleClick(index, row) {
      this.$bus.$jump(4, 'openWorkOrder/orderHandle')
      sessionStorage.setItem('orderDetail', JSON.stringify(row))
      // this.$store.app.SET_ORDER(row)
      // console.log(11111)
      // this.$bus.$emit('showDetailJobOrderGoto', { index, row })
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
      this.$bus.$emit('changPage', this.listQuery)
    }
  }
}
</script>
