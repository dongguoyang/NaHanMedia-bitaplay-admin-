<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>软件商列表</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="ID">
              <el-input v-model="table.query.id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="table.query.tel" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="使用状态">
              <el-select v-model="table.query.status" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="禁用" :value="1"></el-option>
                <el-option label="正常" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="table.query.info_status" style="width: 130px">
                <el-option label="全部" :value="-1"></el-option>
                <el-option label="未提审" :value="0"></el-option>
                <el-option label="待审核" :value="1"></el-option>
                <el-option label="通过" :value="2"></el-option>
                <el-option label="拒绝" :value="3"></el-option>
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
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="tel" label="手机号" min-width="150"></el-table-column>
            <el-table-column label="信用代码" min-width="250">
              <template slot-scope="scope">
                <span v-if="scope.row.info">{{ scope.row.info.code }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="企业名称" min-width="250">
              <template slot-scope="scope">
                <span v-if="scope.row.info">{{ scope.row.info.name }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>

            <el-table-column label="营业执照" min-width="120">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.info.license"
                  :preview-src-list="[scope.row.info.license]"
                  v-if="scope.row.info"
                >
                </el-image>
                <span v-else>-</span>
              </template>
            </el-table-column>

            <el-table-column label="余额" min-width="100">
              <template slot-scope="scope">
                ￥{{ scope.row.wallet.balance/100 }}
              </template>
            </el-table-column>

            <el-table-column label="冻结金额" min-width="100">
              <template slot-scope="scope">
                ￥{{ scope.row.wallet.frozen_balance/100 }}
              </template>
            </el-table-column>

            <el-table-column label="已上架数量" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.app_count }}
              </template>
            </el-table-column>


            <el-table-column label="使用状态" min-width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini">禁用</el-tag>
                <el-tag v-if="scope.row.status==2" type="success" size="mini">正常</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="审核状态" min-width="100">
              <template slot-scope="scope">
                <el-tag v-if="!scope.row.info" size="mini">未提审</el-tag>
                <span v-else>
                  <el-tag v-if="scope.row.info.status==1" size="mini" type="info">待审核</el-tag>
                   <el-tag v-if="scope.row.info.status==2" size="mini" type="success">通过</el-tag>
                   <el-tag v-if="scope.row.info.status==3" size="mini" type="danger">拒绝</el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" label="注册时间" min-width="180"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-popconfirm title="确认？" @onConfirm="editStatus(scope.row.id)">
                  <el-button slot="reference" type="success" size="mini" v-if="scope.row.status==1">启用</el-button>
                  <el-button slot="reference" type="warning" size="mini" v-if="scope.row.status==2">禁用</el-button>
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
  </div>
</template>

<script>
import {getProviderList, editProviderStatus} from "@/api/provider";

export default {
  name: 'ProviderList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          id: '',
          status: 0,
          info_status: -1,
          tel: '',
          page: 1
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getProviderList(this.table.query).then(({code, data}) => {
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
    editStatus(id) {
      editProviderStatus({id: id}).then(({code}) => {
        if (code == 0) {
          this.getList()
          this.$message.success('修改成功')
        }
      })
    }
  },

}
</script>
