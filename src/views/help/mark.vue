<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>营销协助</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="状态">
              <el-select v-model="table.query.status" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="待处理" :value="1"></el-option>
                <el-option label="已处理" :value="2"></el-option>
              </el-select>
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
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="tel" label="联系电话"></el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini" type="warning">待处理</el-tag>
                <el-tag v-if="scope.row.status==2" size="mini">已处理</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="提交时间" min-width="130"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-popconfirm title="确认？" @onConfirm="handle(scope.row.id)" v-if="scope.row.status==1">
                  <el-button slot="reference" type="success" size="mini">处理</el-button>
                </el-popconfirm>
                <el-button slot="reference" type="success" size="mini" v-else disabled>处理</el-button>
              </template>
            </el-table-column>

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
import {helpList, helpHandle} from "@/api/help";

export default {
  name: 'HelpMarkList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          status: 0,
          type: 2,
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
      helpList(this.table.query).then(({code, data}) => {
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
    handle(id) {
      helpHandle({id: id}).then(({code}) => {
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
        }
      })
    },
  },

}
</script>
