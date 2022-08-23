<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>热搜列表</span>
            <el-button style="float: right;margin-left: 5px" size="mini" type="primary" @click="create">添加</el-button>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-table
            :data="table.data"
            stripe
            style="width: 100%"
            v-loading="table.loading"
          >
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="热门搜索"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
             >
              <template slot-scope="scope">
                <el-popconfirm title="确认？" @onConfirm="del(scope.row.id)">
                  <el-button slot="reference" type="danger" size="mini">删除</el-button>
                </el-popconfirm>
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
    <el-dialog title="热门搜索" :visible.sync="createDialog.show" width="50%">
      <el-form ref="create" :model="createDialog.data" :rules="createDialog.rules" label-width="80px">
        <el-form-item label="热门搜索" prop="name">
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

import {getHotWordList,saveHotWord,delHotWord} from "@/api/hotWord";

export default {
  name: 'HotWordList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          status: 0,
          name: '',
          page: 1
        }
      },
      createDialog: {
        loading: false,
        show: false,
        data: {
          name: '',
        },
        rules: {
          name: [{required: true, trigger: 'blur', message: '请输入热门搜索'}],
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
      getHotWordList(this.table.query).then(({code, data}) => {
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
    del(id) {
      delHotWord({id: id}).then(({code}) => {
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
        }
      })
    },
    create() {
      this.createDialog.data = {name: ''}
      this.createDialog.loading = false
      this.createDialog.show = true
    },
    doCreate() {
      this.$refs.create.validate(valid => {
        if (valid) {
          this.createDialog.loading = true
          saveHotWord(this.createDialog.data).then(({code}) => {
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

