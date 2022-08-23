<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>下载记录</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="应用名称">
              <el-input v-model="table.query.name" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="下载用户ID">
              <el-input v-model="table.query.user_id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="分类选择">
              <el-cascader
                v-model="table.query.category"
                :props="{ checkStrictly: true }"
                :options="categoryTree"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="下载时间">
              <el-date-picker
                style="width: 260px"
                v-model="table.query.time"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
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
            <el-table-column prop="provider_app_id" label="应用ID"></el-table-column>
            <el-table-column label="应用名称">
              <template slot-scope="scope">
                {{ scope.row.app.name }}
              </template>
            </el-table-column>
            <el-table-column prop="user_id" label="下载用户ID"></el-table-column>
            <el-table-column label="应用分类">
              <template slot-scope="scope">
                <el-tag type="primary" size="mini">
                  {{ scope.row.app.l1[0].name }} / {{ scope.row.app.l2[0].name }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" label="下载时间"></el-table-column>


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
import {appDownloadRecord} from "@/api/app";
import {getCategoryCascaderTree} from "@/api/category";

export default {
  name: 'AppDownloadRecord',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          name: '',
          category: [0],
          time: [],
          user_id: '',
          page: 1
        }
      },
      categoryTree: [],
    }
  },
  created() {
    this.getList()
    this.getCategoryTree()
  },
  methods: {
    getList() {
      this.table.loading = true
      appDownloadRecord(this.table.query).then(({code, data}) => {
        this.table.loading = false
        if (code == 0) {
          this.table.total = data.total
          this.table.data = data.list
        }
      })
    },
    getCategoryTree() {
      getCategoryCascaderTree().then(({code, data}) => {
        if (code == 0) {
          this.categoryTree = data
          this.categoryTree.unshift({label:'全部',value:0})
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

  }
}
</script>

<style scoped>

</style>
