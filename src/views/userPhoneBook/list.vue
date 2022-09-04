<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>实名来电联系人列表</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="ID">
              <el-input v-model="table.query.id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="table.query.phone" style="width: 130px" clearable></el-input>
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
            <el-table-column prop="phone" label="手机号" min-width="150"></el-table-column>
            <el-table-column prop="real_name" label="真实姓名" min-width="150"></el-table-column>
            <el-table-column prop="company" label="公司" min-width="150"></el-table-column>
            <el-table-column prop="created_at" label="添加时间" min-width="130"></el-table-column>
            <el-table-column prop="updated_at" label="更新时间" min-width="130"></el-table-column>
            <el-table-column label="联系人是否注册" min-width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.get_user_book_info==null" size="mini">否</el-tag>
                <el-tag v-if="scope.row.get_user_book_info!=null" type="success" size="mini">是</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="user_book_id" label="联系人用户" min-width="130"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                           @click="detail(scope.row)">查看变更记录
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
    <!--    详情-->
    <el-dialog
      title="详情"
      :visible.sync="detailDialog.show"
      width="50%"
      size="small"
      @opened="openDetail"
      @close="closeDetail"
    >
      <el-table
        :data="detailDialog.data.get_book_phone_log_list"
        stripe
        style="width: 100%"
        v-loading="table.loading"
      >
        <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="150"></el-table-column>
        <el-table-column label="变更类型" min-width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type==1" size="mini">系统变更</el-tag>
            <el-tag v-if="scope.row.type==2" type="success" size="mini">用户变更</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="变更时间" min-width="130"></el-table-column>
        <el-table-column label="是否真实姓名" min-width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==1" size="mini">否</el-tag>
            <el-tag v-if="scope.row.status==2" type="success" size="mini">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="user_book_id" label="联系人用户" min-width="130"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                       @click="detail(scope.row)">查看变更记录
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialog.show = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUsersAddressBook} from "@/api/userPhoneBook";

export default {
  name: 'UserPhoneBookList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          id: '',
          status: 0,
          user_id:'',
          phone: '',
          page: 1
        }
      },
      detailDialog: {
        show: false,
        data: {
          get_book_phone_log_list: {
          }
        }
      },
    }
  },
  created() {
    this.queryId= this.$route.query.phone
    console.log(this.queryId)
    this.listQuery.phone = this.queryId
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getUsersAddressBook(this.table.query).then(({code, data}) => {
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
    detail(row) {
      this.detailDialog.data = row
      this.detailDialog.show = true
    },
    page(page) {
      this.table.query.page = page
      this.getList()
    },
  },

}
</script>
