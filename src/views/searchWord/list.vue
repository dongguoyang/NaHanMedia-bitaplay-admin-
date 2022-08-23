<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>搜索词</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="搜索词">
              <el-input v-model="table.query.name" style="width: 130px" clearable></el-input>
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
            <el-table-column prop="word" label="搜索词"></el-table-column>
            <el-table-column prop="count" label="搜索次数"></el-table-column>
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
import {getSearchWordList} from "@/api/searchWord";

export default {
  name: 'SearchWordList',
  data() {
    return {
      table: {
        data: [],
        total: 0,
        loading: false,
        query: {
          name: '',
          page: 1
        }
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getSearchWordList(this.table.query).then(({code, data}) => {
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
