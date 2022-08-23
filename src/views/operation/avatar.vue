<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>默认头像</span>
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

            <el-table-column label="头像">
              <template slot-scope="scope">
                <el-avatar shape="square" :size="80" :src="scope.row.url"></el-avatar>
              </template>
            </el-table-column>

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
            :page-size="10"
            layout="total, prev, pager, next"
            :total="table.total">
          </el-pagination>

        </el-card>
      </el-main>
    </el-container>

    <!--    创建应用-->
    <el-dialog title="头像" :visible.sync="createDialog.show" width="50%">

      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="12"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="doCreate" :loading="createDialog.loading">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {delAvatar, getAvatarList, saveAvatar} from "@/api/avatar";
import {uploadImageUrl} from "@/utils";

export default {
  name: 'OperationAvatar',
  data() {
    return {
      uploadUrl: '',
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          page: 1
        }
      },
      createDialog: {
        loading: false,
        show: false,
        data: {list: []},
      },
    }
  },
  created() {
    this.getList()
    this.uploadUrl = uploadImageUrl()
  },
  methods: {
    getList() {
      this.table.loading = true
      getAvatarList(this.table.query).then(({code, data}) => {
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
      delAvatar({id: id}).then(({code}) => {
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
        }
      })
    },
    create() {
      this.createDialog.data = {list: []}
      this.createDialog.loading = false
      this.createDialog.show = true
    },
    doCreate() {
      this.createDialog.loading = true
      saveAvatar(this.createDialog.data).then(({code}) => {
        this.createDialog.loading = false
        if (code == 0) {
          this.createDialog.show = false
          this.$message.success('成功')
          this.getList()
        }
      })
    },

    handleRemove(file) {
      for (let i = 0; i < this.createDialog.data.list.length; i++) {
        if (file.url == this.createDialog.data.list[i]) {
          this.createDialog.data.list.splice(i, 1)
        }
      }
    },

    handleSuccess(res, file, fileList) {
      if (res.code == 0) {
        file.url = res.data
        this.createDialog.data.list.push(res.data)
      } else {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].url == file.url) {
            fileList.splice(i, 1)
            return
          }
        }
      }
    }

  }
}
</script>

