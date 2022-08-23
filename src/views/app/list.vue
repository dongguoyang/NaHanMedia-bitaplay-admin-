<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>应用列表</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="应用名称">
              <el-input v-model="table.query.name" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="APP ID">
              <el-input v-model="table.query.app_id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="软件商ID">
              <el-input v-model="table.query.provider_id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="上架状态">
              <el-select v-model="table.query.status" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="已上架" :value="1"></el-option>
                <el-option label="已下架" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推荐状态">
              <el-select v-model="table.query.is_recommend" style="width: 130px">
                <el-option label="全部" :value="-1"></el-option>
                <el-option label="未推荐" :value="0"></el-option>
                <el-option label="已推荐" :value="1"></el-option>
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
            <el-table-column prop="app_id" label="APP ID" width="270"></el-table-column>
            <el-table-column prop="name" label="应用名称" min-width="250"></el-table-column>
            <el-table-column prop="provider_id" label="软件商ID" width="150"></el-table-column>
            <el-table-column prop="download_count" label="虚拟下载量" width="150"></el-table-column>
            <el-table-column label="推广功能" min-width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.is_download_reward==1">
                  <el-tag type="success" size="mini">已开通</el-tag><br/>
                  单次佣金：￥{{ scope.row.download_reward / 100 }}<br/>
                  剩余佣金：￥{{ scope.row.reward_amount / 100 }}
                </span>
                <span v-else>未开通</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="上链功能" min-width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.is_to_chain==1">
                  <el-tag type="success" size="mini">已开通</el-tag><br/>
                  剩余燃料：{{ scope.row.fuel_amount }}
                </span>
                <span v-else>未开通</span>
              </template>
            </el-table-column>
            <el-table-column label="三方登录功能" min-width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.is_third_login==1">
                  <el-tag type="success" size="mini">已开通</el-tag><br/>
                  剩余次数：{{ scope.row.third_login_amount }}
                </span>
                <span v-else>未开通</span>
              </template>
            </el-table-column>

            <el-table-column label="上架状态" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini">已下架</el-tag>
                <el-tag v-if="scope.row.status==2" type="success" size="mini">已上架</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="推荐状态" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.is_recommend==0" size="mini">未推荐</el-tag>
                <el-tag v-if="scope.row.is_recommend==1" type="success" size="mini">已推荐</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="创建时间" min-width="160"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="230">
              <template slot-scope="scope">
                <el-popconfirm title="确认？" @onConfirm="editRecommend(scope.row.id)">
                  <el-button slot="reference" type="primary" size="mini">
                    {{ scope.row.is_recommend == 1 ? '取消推荐' : '推荐' }}
                  </el-button>
                </el-popconfirm>
                <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px" @click="editDownloadCount(scope.row.id)">
                  修改虚拟下载量
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

    <!--    创建应用-->
    <el-dialog title="下载数量" :visible.sync="downloadDialog.show" width="50%">
      <el-form ref="create" :model="downloadDialog.data" label-width="80px">
        <el-form-item label="下载数量">
          <el-input v-model="downloadDialog.data.count"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downloadDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="doEditDownloadCount" :loading="downloadDialog.loading">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAppList, editAppRecommend, editAppDownloadCount} from "@/api/app";

export default {
  name: 'AppList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          status: 0,
          name: '',
          provider_id: '',
          is_recommend: -1,
          app_id: '',
          page: 1
        }
      },
      downloadDialog: {
        loading: false,
        show: false,
        data: {
          count: 100,
          id: '',
        },
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getAppList(this.table.query).then(({code, data}) => {
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
    editRecommend(id) {
      editAppRecommend({id: id}).then(({code}) => {
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
        }
      })
    },
    editDownloadCount(id) {
      this.downloadDialog.data = {count: 100, id: id}
      this.downloadDialog.loading = false
      this.downloadDialog.show = true
    },

    doEditDownloadCount() {
      editAppDownloadCount(this.downloadDialog.data).then(({code}) => {
        if (code == 0) {
          this.downloadDialog.show = false
          this.$message.success('成功')
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
