<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>app版本列表</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="版本号">
              <el-input v-model="table.query.version" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="search">查询</el-button>
            </el-form-item>
          </el-form>

          <el-table
            :data="table.data"
            stripe
            style="width: 100%"
            v-loading="table.loading"
          >
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="version" label="版本号" min-width="150"></el-table-column>
            <el-table-column prop="url" label="包地址" min-width="150"></el-table-column>
            <el-table-column prop="remark" label="更新内容" min-width="200"></el-table-column>
            <el-table-column prop="created_at" label="添加时间" min-width="130"></el-table-column>
            <el-table-column prop="updated_at" label="更新时间" min-width="130"></el-table-column>
          </el-table>

          <el-pagination
            @current-change="page"
            :page-size="20"
            layout="total, prev, pager, next"
            :total="table.total">
          </el-pagination>

        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {getAppVserion} from "@/api/appVersionUpdate";

export default {
  name: 'AppVersionUpdateList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          id: '',
          status: 0,
          page: 1
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getAppVserion(this.table.query).then(({code, data}) => {
        this.table.loading = false
        if (code == 0) {
          this.table.total = data.total
          this.table.data = data.list
        }
      })
    },
    refresh() {
      this.getList()
    },
    search() {
      this.table.query.page = 1
      this.getList()
    },
    page(page) {
      this.table.query.page = page
      this.getList()
    },
  },

}
</script>
