<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>实名来电记录</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="手机号">
              <el-input v-model="table.query.incoming_phone" style="width: 130px" clearable></el-input>
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
            <el-table-column prop="id" label="ID" min-width="250"></el-table-column>
            <el-table-column prop="user_id" label="接听用户ID" min-width="250"></el-table-column>
            <el-table-column prop="incoming_user_id" label="来电用户ID" min-width="250"></el-table-column>
            <el-table-column label="接听用户昵称">
              <template slot-scope="scope">
                {{ scope.row.get_user_info === null ? '':scope.row.get_book_user_info.nickname}}
              </template>
            </el-table-column>
            <el-table-column label="接听用户手机号">
              <template slot-scope="scope">
                {{ scope.row.get_user_info === null ? '':scope.row.get_book_user_info.tel}}
              </template>
            </el-table-column>
            <el-table-column label="来电用户昵称">
              <template slot-scope="scope">
                {{ scope.row.get_book_user_info === null ? '':scope.row.get_book_user_info.nickname}}
              </template>
            </el-table-column>
            <el-table-column prop="incoming_real_name" label="来电用户真实姓名" min-width="250"></el-table-column>
            <el-table-column prop="incoming_phone" label="来电用户号码" min-width="250"></el-table-column>
            <el-table-column prop="incoming_company" label="来电用户公司" min-width="250"></el-table-column>
            <el-table-column prop="created_at" label="来电时间" min-width="250"></el-table-column>
            <el-table-column prop="incoming_time  " label="通话时长" min-width="250"></el-table-column>
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
import {getUsersAddressLog} from "@/api/userPhoneBook";

export default {
  name: 'UserPhoneBookLog',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          provider_id: '',
          status: 0,
          phone: '',
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
      getUsersAddressLog(this.table.query).then(({code, data}) => {
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
    }
  }

}
</script>
