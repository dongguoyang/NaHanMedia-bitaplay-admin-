<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>快手平台</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-table
            :data="table.data"
            stripe
            style="width: 100%"
            v-loading="table.loading"
          >
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="account_id" label="广告账户ID"></el-table-column>
            <el-table-column prop="aid" label="广告组ID"></el-table-column>
            <el-table-column prop="cid" label="广告创意ID"></el-table-column>
            <el-table-column prop="did" label="广告计划ID"></el-table-column>
            <el-table-column prop="ip" label="IP地址"></el-table-column>
            <el-table-column prop="created_at" label="上报时间"></el-table-column>

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

import {ksAds} from "@/api/tool";

export default {
  name: 'AppCategory',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
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
      ksAds(this.table.query).then(({code, data}) => {
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
    page(page) {
      this.table.query.page = page
      this.getList()
    },
  }
}
</script>

