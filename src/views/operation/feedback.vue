<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>意见反馈</span>
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
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column label="用户手机号">
              <template slot-scope="scope">
                {{ scope.row.user.tel }}
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <el-image
                  v-if="scope.row.image.length>0"
                  style="width: 100px; height: 100px"
                  :src="scope.row.image[0]"
                  :preview-src-list="scope.row.image">
                </el-image>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.status==2">{{ scope.row.remark }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini">待处理</el-tag>
                <el-tag v-if="scope.row.status==2" type="success" size="mini">已处理</el-tag>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button slot="reference" type="success" size="mini" v-if="scope.row.status==2" disabled>处理
                </el-button>
                <el-button slot="reference" type="primary" size="mini" v-else @click="handelAction(scope.row.id)">处理</el-button>
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
import {getFeedbackList, handelFeedback} from "@/api/feedback";

export default {
  name: 'OperationFeedback',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          status: 0,
          page: 1
        }
      },
      handel: {
        id: 0,
        remark: '',
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getFeedbackList(this.table.query).then(({code, data}) => {
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
    handelAction(id) {
      this.handel.id = id
      this.$prompt('请输入备注', '备注', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
      }).then(({value}) => {
        this.handel.remark = value
        handelFeedback(this.handel).then(({code}) => {
          if (code == 0) {
            this.$message.success('成功')
            this.getList()
          }
        })
      }).catch(() => {

      });
    }
  },

}
</script>
