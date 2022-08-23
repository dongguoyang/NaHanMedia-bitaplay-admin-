<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>分类列表</span>
            <el-button style="float: right;margin-left: 5px" size="mini" type="primary" @click="create">添加</el-button>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="分类名称">
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
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="分类等级">
              <template slot-scope="scope">
                <span v-if="scope.row.pid===0">一级分类</span>
                <span v-else>
                  <span v-if="scope.row.parent&&scope.row.parent.parent">三级分类</span>
                  <span v-else>二级分类</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="父分类">
              <template slot-scope="scope">
                <span v-if="scope.row.pid===0">-</span>
                <span v-else>
                  {{ scope.row.parent.parent ? scope.row.parent.parent.name + " / " : "" }}
                  {{ scope.row.parent.name }}
                </span>
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

    <!--    创建应用-->
    <el-dialog title="应用分类" :visible.sync="createDialog.show" width="50%">
      <el-form ref="create" :model="createDialog.data" :rules="createDialog.rules" label-width="80px">
        <el-form-item label="分类等级">
          <el-radio-group v-model="createDialog.select.level">
            <el-radio :label="1">一级分类</el-radio>
            <el-radio :label="2">二级分类</el-radio>
            <el-radio :label="3">三级分类</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="createDialog.select.level===2">
          <el-form-item label="一级分类">
            <el-select v-model="createDialog.data.pid" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in tree"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div v-if="createDialog.select.level===3">
          <el-form-item label="一级分类">
            <el-select v-model="createDialog.select.index" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="(item,index) in tree"
                :key="index"
                :label="item.name"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select v-model="createDialog.data.pid" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in tree[createDialog.select.index].child"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="分类名称" prop="name">
          <el-input v-model="createDialog.data.name"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="doCreate" :loading="createDialog.loading">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {addCategory, getCategoryList, getCategoryTree} from "@/api/category";

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
      createDialog: {
        loading: false,
        show: false,
        data: {
          name: '',
          pid: '',
        },
        select: {
          level: 1,
          index: 0,
        },
        rules: {
          name: [{required: true, trigger: 'blur', message: '请输入分类名称'}],
        }
      },
      tree: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getCategoryList(this.table.query).then(({code, data}) => {
        this.table.loading = false
        if (code == 0) {
          this.table.total = data.total
          this.table.data = data.list
        }
      })
    },
    getTree() {
      getCategoryTree().then(({code, data}) => {
        if (code == 0) {
          this.tree = data
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
    search() {
      this.table.query.page = 1
      this.getList()
    },

    create() {
      this.createDialog.data = {name: '', pid: ''}
      this.createDialog.loading = false
      this.createDialog.show = true
      this.getTree()
    },
    doCreate() {
      this.$refs.create.validate(valid => {
        if (valid) {
          this.createDialog.loading = true
          addCategory(this.createDialog.data).then(({code}) => {
            this.createDialog.loading = false
            if (code == 0) {
              this.createDialog.show = false
              this.$message.success('成功')
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },

  }
}
</script>

