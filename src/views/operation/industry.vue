<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>行业列表</span>
            <div style="float: right">
              <el-button size="mini" type="success" @click="refresh">刷新</el-button>
              <el-button style="margin-left: 5px" size="mini" type="primary" @click="add">添加</el-button>
            </div>
          </div>
          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="行业名称">
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
            <el-table-column prop="name" label="行业名称"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑
                </el-button>
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

    <!--   详情-->
    <el-dialog title="添加/编辑" :visible.sync="saveDialog.show" width="80%">
      <el-form label-width="80px">
        <el-form-item label="行业名称" required>
          <el-input v-model="saveDialog.data.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDialog.show = false">关 闭</el-button>
        <el-button slot="reference" type="primary" @click="save" v-loading="saveDialog.loading">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {getIndustryList, saveIndustry} from "@/api/industry";

export default {
  name: 'OperationIndustry',
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
      saveDialog: {
        show: false,
        loading: false,
        data: {
          id: 0,
          name: '',
        },
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getIndustryList(this.table.query).then(({code, data}) => {
        this.table.loading = false
        if (code == 0) {
          this.table.data = data.list
          this.table.total = data.total
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
    add() {
      this.saveDialog.loading = false
      this.saveDialog.data = {
        id: 0,
        name: '',
      }
      this.saveDialog.show = true
    },
    edit(row) {
      this.saveDialog.loading = false
      this.saveDialog.data = JSON.parse(JSON.stringify(row))
      this.saveDialog.show = true
    },
    save() {
      this.saveDialog.loading = true
      saveIndustry(this.saveDialog.data).then(({code}) => {
        this.saveDialog.loading = false
        if (code == 0) {
          this.getList()
          this.$message.success('成功')
          this.saveDialog.show = false
        }
      })
    }
  }
}
</script>
