<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>软件商审核</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="软件商ID">
              <el-input v-model="table.query.provider_id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="软件商手机号">
              <el-input v-model="table.query.tel" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="table.query.status" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
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
            <el-table-column prop="id" label="软件商ID" min-width="100">
              <template slot-scope="scope">
                {{ scope.row.provider.id }}
              </template>
            </el-table-column>
            <el-table-column prop="tel" label="软件商手机号" min-width="150">
              <template slot-scope="scope">
                {{ scope.row.provider.tel }}
              </template>
            </el-table-column>
            <el-table-column prop="code" label="信用代码" min-width="250"></el-table-column>
            <el-table-column prop="name" label="企业名称" min-width="250"></el-table-column>
            <el-table-column label="营业执照" min-width="120">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.license"
                  :preview-src-list="[scope.row.license]"
                >
                </el-image>
              </template>
            </el-table-column>

            <el-table-column label="审核状态" min-width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini" type="info">待审核</el-tag>
                <el-tag v-if="scope.row.status==2" size="mini" type="success">通过</el-tag>
                <el-tag v-if="scope.row.status==3" size="mini" type="danger">拒绝</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="拒绝理由" min-width="250">
              <template slot-scope="scope">
                <span v-if="scope.row.status==3">{{ scope.row.refuse_reason }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              min-width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.status==1">
                  <el-popconfirm title="确认？" @onConfirm="success(scope.row.id)">
                    <el-button slot="reference" type="success" size="mini">通过</el-button>
                  </el-popconfirm>
                  <el-button slot="reference" type="warning" size="mini" style="margin-left: 5px"
                             @click="refuse(scope.row.id)">拒绝
                  </el-button>
                </div>
                <div v-else>
                  <el-button slot="reference" type="success" size="mini" disabled>通过</el-button>
                  <el-button slot="reference" type="warning" size="mini" disabled style="margin-left: 5px">拒绝
                  </el-button>
                </div>
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
import {getProviderInfoList, editProviderInfoStatus} from "@/api/provider";

export default {
  name: 'ProviderVerify',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          provider_id: '',
          status: 0,
          tel: '',
          page: 1
        }
      },
      editStatus: {
        id: 0,
        refuse_reason: '',
        status: 2
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getProviderInfoList(this.table.query).then(({code, data}) => {
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
    success(id) {
      this.editStatus.id = id
      this.editStatus.status = 2
      editProviderInfoStatus(this.editStatus).then(({code}) => {
        if (code == 0) {
          this.getList()
          this.$message.success('成功')
        }
      })
    },
    refuse(id) {
      this.editStatus.id = id
      this.editStatus.status = 3
      this.editStatus.refuse_reason = ''
      this.$prompt('请输入拒绝理由', '拒绝理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValidator:(val)=>{
          if(!val){
            return "请输入拒绝理由"
          }
        }
      }).then(({value}) => {
        this.editStatus.refuse_reason = value
        editProviderInfoStatus(this.editStatus).then(({code}) => {
          if (code == 0) {
            this.getList()
            this.$message.success('成功')
          }
        })
      }).catch(() => {
        return false
      });
    }
  },

}
</script>
