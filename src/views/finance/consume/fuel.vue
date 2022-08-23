<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>燃料充值</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="软件商ID">
              <el-input v-model="table.query.id" style="width: 200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input v-model="table.query.number" style="width: 200px" clearable></el-input>
            </el-form-item>
            <el-form-item label="APP ID">
              <el-input v-model="table.query.app_id" style="width: 400px" clearable></el-input>
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
            <el-table-column label="订单号" prop="number"></el-table-column>
            <el-table-column prop="provider_id" label="软件商ID"></el-table-column>
            <el-table-column label="软件商手机号">
              <template slot-scope="scope">
              {{scope.row.provider.tel}}
              </template>
            </el-table-column>
            <el-table-column label="APP ID">
              <template slot-scope="scope">
                {{scope.row.app.app_id}}
              </template>
            </el-table-column>
            <el-table-column label="APP名称">
              <template slot-scope="scope">
                {{scope.row.app.name}}
              </template>
            </el-table-column>
            <el-table-column label="充值金额">
              <template slot-scope="scope">
                ￥{{ scope.row.amount / 100 }}
              </template>
            </el-table-column>
            <el-table-column label="单价">
              <template slot-scope="scope">
                ￥{{ scope.row.price / 100 }}/10000
              </template>
            </el-table-column>
            <el-table-column label="充值数量">
              <template slot-scope="scope">
                {{ scope.row.fuel_amount  }}
              </template>
            </el-table-column>


            <el-table-column prop="created_at" label="充值时间" min-width="130"></el-table-column>
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
import {getProviderFinanceRechargeFuel} from "@/api/providerFinance";

export default {
  name: 'FinanceConsumeFuel',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          id: '',
          number: '',
          app_id:'',
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
      getProviderFinanceRechargeFuel(this.table.query).then(({code, data}) => {
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
  },

}
</script>
