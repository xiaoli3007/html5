<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="教材">
        <template slot-scope="scope">
         人教版三年级下册
        </template>
      </el-table-column>
      <el-table-column label="课时" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
   
     
    </el-table>
  </div>
</template>

<script>
import { getjiaocaiList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getjiaocaiList(this.listQuery).then(response => {
        this.list = response.data.chapter
        this.listLoading = false
      })
    }
  }
}
</script>
