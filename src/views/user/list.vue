<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>用户列表</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="ID">
              <el-input v-model="table.query.id" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="table.query.tel" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="table.query.status" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="已注销" :value="1"></el-option>
                <el-option label="已禁用" :value="2"></el-option>
                <el-option label="正常" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="实名状态">
              <el-select v-model="table.query.is_cert" style="width: 130px">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="未实名" :value="1"></el-option>
                <el-option label="已实名" :value="2"></el-option>
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
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>

            <el-table-column label="头像">
              <template slot-scope="scope">
                <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="tel" label="手机号"></el-table-column>
            <el-table-column label="余额">
              <template slot-scope="scope">
                ￥{{ scope.row.wallet.balance / 100 }}
              </template>
            </el-table-column>
            <el-table-column label="冻结金额">
              <template slot-scope="scope">
                ￥{{ scope.row.wallet.frozen_balance / 100 }}
              </template>
            </el-table-column>

            <el-table-column label="实名认证">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.info!==null&&scope.row.info.name!==''" size="mini" type="success">是</el-tag>
                <el-tag v-else size="mini" type="info">否</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini" type="info">已注销</el-tag>
                <el-tag v-if="scope.row.status==2" size="mini">已禁用</el-tag>
                <el-tag v-if="scope.row.status==3" type="success" size="mini">正常</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="注册时间" min-width="130"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-popconfirm title="确认？" @onConfirm="editStatus(scope.row.id)" v-if="scope.row.status!=1">
                  <el-button slot="reference" type="success" size="mini" v-if="scope.row.status==2">启用</el-button>
                  <el-button slot="reference" type="warning" size="mini" v-if="scope.row.status==3">禁用</el-button>
                </el-popconfirm>
                <el-button slot="reference" type="success" size="mini" v-else disabled>启用</el-button>
                <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                           @click="detail(scope.row)">详情
                </el-button>
<!--                <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"-->
<!--                           @click="onDownloadRecord(scope.row.id)">下载记录-->
<!--                </el-button>-->
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
      <el-form label-width="120px">
        <el-form-item label="ID：">
          {{ detailDialog.data.id }}
        </el-form-item>
        <el-form-item label="手机号：">
          {{ detailDialog.data.tel }}
        </el-form-item>
        <el-form-item label="昵称：">
          {{ detailDialog.data.nickname }}
        </el-form-item>
        <el-form-item label="头像：">
          <img :src="detailDialog.data.avatar" width="100px" height="100px"/>
        </el-form-item>
        <el-form-item label="邮箱：">
          {{ detailDialog.data.email ? detailDialog.data.email : '-' }}
        </el-form-item>
        <el-form-item label="简介：">
          {{ detailDialog.data.desc ? detailDialog.data.desc : '-' }}
        </el-form-item>
        <div v-if="detailDialog.data.info">
          <el-form-item label="增值信息状态：">
            {{ detailDialog.data.status == 1 ? '不开启' : '开启' }}
          </el-form-item>
          <el-form-item label="收费广告状态：">
            {{ detailDialog.data.ad_status == 1 ? '不开启' : '开启' }}
          </el-form-item>
          <el-form-item label="DID：" v-if="detailDialog.data.info.hash!=''">
            {{ detailDialog.data.code }}
          </el-form-item>
          <el-form-item label="链上二维码：" v-if="detailDialog.data.info.hash!=''">
            <div id="qrcode" ref="qrcode"></div>
          </el-form-item>
          <el-form-item label="真实姓名：">
            {{ detailDialog.data.info.name ? detailDialog.data.info.name : '-' }}
          </el-form-item>
          <el-form-item label="身份证号：">
            {{ detailDialog.data.info.id_number ? detailDialog.data.info.id_number : '-' }}
          </el-form-item>
          <el-form-item label="身份证图片：">
            <span v-if="detailDialog.data.info.name!=''">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="detailDialog.data.info.id_face"
                  :preview-src-list="[detailDialog.data.info.id_face,detailDialog.data.info.id_back]">
                </el-image>
            </span>
            <span v-else>
              -
            </span>
          </el-form-item>
          <el-form-item label="行业：">
            <span v-if="detailDialog.data.info.industry">{{ detailDialog.data.info.industry.name }}</span>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="职业：">
            <span v-if="detailDialog.data.info.occupation">{{ detailDialog.data.info.occupation.name }}</span>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="地区：">
            <span v-if="detailDialog.data.info.province">{{
                detailDialog.data.info.province
              }}{{ detailDialog.data.info.city }}{{ detailDialog.data.info.county }}</span>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="教育经历：">
            <span v-if="detailDialog.data.info.educational_experience.length>0">
              <div v-for="(v,k) in detailDialog.data.info.educational_experience" :key="k">
                时间：{{ v.date }} <el-divider direction="vertical"></el-divider>学校：{{ v.school }} <el-divider
                direction="vertical"></el-divider>专业：{{ v.major }}
              </div>
            </span>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="收货地址：">
            <span v-if="detailDialog.data.info.address.length>0">
              <div v-for="(v,k) in detailDialog.data.info.address" :key="k">
                联系人：{{ v.name }} <el-divider direction="vertical"></el-divider>联系电话：{{ v.tel }} <el-divider
                direction="vertical"></el-divider>收货地址：{{ v.province }}{{ v.city }}{{ v.county }}{{ v.detail }}
              </div>
            </span>
            <span v-else>-</span>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialog.show = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--    下载记录-->
    <el-dialog
      title="下载记录"
      :visible.sync="downloadRecordDialog.show"
      width="50%"
      size="small"
    >
      <el-table
        :data="downloadRecordDialog.data"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="provider_app_id" label="应用ID"></el-table-column>
        <el-table-column label="应用名称">
          <template slot-scope="scope">
            {{ scope.row.app.name }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="下载时间"></el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadRecordDialog.show = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {getUserList, editUserStatus} from "@/api/account";
import {createQrcode} from "@/utils/qrcode";
import {appDownloadRecord} from "@/api/app";

export default {
  name: 'UserList',
  data() {
    return {
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          id: '',
          tel: '',
          status: 0,
          is_cert: 0,
          page: 1
        }
      },
      detailDialog: {
        show: false,
        data: {
          info: {
            address: [],
            educational_experience: [],
            industry: {},
            occupation: {},
          }
        }
      },
      downloadRecordDialog: {
        show: false,
        data: [],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getUserList(this.table.query).then(({code, data}) => {
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
      editUserStatus({id: id}).then(({code}) => {
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
        }
      })
    },
    detail(row) {
      this.detailDialog.data = row
      this.detailDialog.show = true
    },
    openDetail() {
      if (this.detailDialog.data.info && this.detailDialog.data.info.hash != '') {
        createQrcode('qrcode', `https://render.antfin.com/p/s/miniapp-web/?type=trans&from=antcloud&bizid=a00e36c5&hash=${this.detailDialog.data.info.hash}`, 150, 150)
      }
    },
    closeDetail() {
      this.$refs['qrcode'].innerHTML = ''
    },
    onDownloadRecord(id) {
      appDownloadRecord({user_id: id}).then(({code, data}) => {
        if (code == 0) {
          this.downloadRecordDialog.data = data
          this.downloadRecordDialog.show = true
        }
      })
    }
  },

}
</script>
