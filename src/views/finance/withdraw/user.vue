<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>用户提现</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="用户ID">
              <el-input v-model="table.query.id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input v-model="table.query.number" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="table.query.status" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="提现中" :value="1"></el-option>
                <el-option label="成功" :value="3"></el-option>
                <el-option label="失败" :value="4"></el-option>
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
            <el-table-column label="订单号" prop="number" min-width="200"></el-table-column>
            <el-table-column prop="user_id" label="用户ID" min-width="150"></el-table-column>
            <el-table-column label="用户手机号" min-width="150">
              <template slot-scope="scope">
                {{ scope.row.user.tel }}
              </template>
            </el-table-column>
            <el-table-column label="提现金额" min-width="150">
              <template slot-scope="scope">
                ￥{{ scope.row.amount / 100 }}
              </template>
            </el-table-column>
            <el-table-column label="手续费" min-width="150">
              <template slot-scope="scope">
                ￥{{ scope.row.fee / 100 }}
              </template>
            </el-table-column>
            <el-table-column label="提现账号" min-width="400">
              <template slot-scope="scope">
                提现方式：
                <el-tag type="primary" size="mini">{{ scope.row.payment_method == 1 ? '支付宝' : '银行卡' }}</el-tag>
                <div v-if="scope.row.payment_method == 1">
                  账户名：
                  <el-tag type="primary" size="mini">{{ scope.row.name }}</el-tag>
                  <br/>
                  账号：
                  <el-tag type="primary" size="mini">{{ scope.row.alipay_number }}</el-tag>
                  <br/>
                </div>
                <div v-else>
                  账户名：
                  <el-tag type="primary" size="mini">{{ scope.row.name }}</el-tag>
                  <br/>
                  银行名称：
                  <el-tag type="primary" size="mini">{{ scope.row.bank_name }}</el-tag>
                  <br/>
                  银行卡号：
                  <el-tag type="primary" size="mini">{{ scope.row.bank_number }}</el-tag>
                  <br/>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="状态" min-width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini" type="primary">提现中</el-tag>
                <el-tag v-if="scope.row.status==3" size="mini">成功</el-tag>
                <el-tag v-if="scope.row.status==4" type="warning" size="mini">失败</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="失败原因" :show-overflow-tooltip="true" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.status==4">{{ scope.row.refuse_reason }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>

<!--            <el-table-column label="支付凭证" width="100">-->
<!--              <template slot-scope="scope">-->
<!--                <span v-if="scope.row.status!=3">-</span>-->
<!--                <span v-else>-->
<!--                  <el-image-->
<!--                    style="width: 100px; height: 100px"-->
<!--                    :src="scope.row.evidence"-->
<!--                    :preview-src-list="[scope.row.evidence]">-->
<!--                  </el-image>-->
<!--                </span>-->
<!--              </template>-->
<!--            </el-table-column>-->


            <el-table-column prop="created_at" label="申请时间" min-width="200"></el-table-column>

<!--            <el-table-column-->
<!--              fixed="right"-->
<!--              label="操作"-->
<!--              width="100">-->
<!--              <template slot-scope="scope">-->
<!--                <div v-if="scope.row.status==1">-->
<!--                  <el-button slot="reference" type="success" size="mini" @click="edit(scope.row.id)">审核</el-button>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <el-button slot="reference" type="success" size="mini" disabled>审核</el-button>-->
<!--                </div>-->

<!--              </template>-->
<!--            </el-table-column>-->
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

    <el-dialog title="审核" :visible.sync="editDialog.show" width="50%">
      <el-form label-width="110px">
        <el-form-item label="审核状态：" required>
          <el-radio-group v-model="editDialog.data.status">
            <el-radio :label="3">通过</el-radio>
            <el-radio :label="4">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="拒绝理由：" v-if="editDialog.data.status==4" required>
          <el-input v-model="editDialog.data.refuse_reason"></el-input>
        </el-form-item>

        <el-form-item label="支付凭证：" v-if="editDialog.data.status==3" required>
          <el-upload
            :action="uploadUrl"
            :on-success="handleEvidenceSuccess"
            :show-file-list="false"
          >
            <el-button type="primary" size="small" v-if="editDialog.data.evidence==''">点击上传</el-button>
            <el-image :src="editDialog.data.evidence" style="width: 100px;height: 100px" v-else></el-image>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog.show = false">关 闭</el-button>
        <el-button slot="reference" type="primary" @click="doWithdraw" v-loading="editDialog.loading">保 存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {uploadImageUrl} from "@/utils";
import {getUserFinanceWithdraw, doUserFinanceWithdraw} from "@/api/userFinance";

export default {
  name: 'FinanceWithdrawUser',
  data() {
    return {
      uploadUrl: '',
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          id: '',
          number: '',
          status: 0,
          page: 1
        }
      },
      editDialog: {
        loading: false,
        show: false,
        data: {
          id: 0,
          status: 3,
          evidence: '',
          refuse_reason: '',
        }
      }
    }
  },
  created() {
    this.uploadUrl = uploadImageUrl()
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getUserFinanceWithdraw(this.table.query).then(({code, data}) => {
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
    edit(id) {
      this.editDialog = {
        loading: false,
        show: true,
        data: {
          id: id,
          status: 0,
          evidence: '',
          refuse_reason: '',
        }
      }
    },
    doWithdraw() {
      this.editDialog.loading = true
      doUserFinanceWithdraw(this.editDialog.data).then(({code}) => {
        this.editDialog.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
          this.editDialog.show = false
        }
      })
    },
    handleEvidenceSuccess(res) {
      if (res.code == 0) {
        this.editDialog.data.evidence = res.data
      } else {
        this.$message.error(res.msg)
      }
    }
  },

}
</script>
