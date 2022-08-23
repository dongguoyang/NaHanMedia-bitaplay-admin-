<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>应用审核</span>
            <el-button style="float: right" size="mini" type="success" @click="refresh">刷新</el-button>
          </div>

          <el-form :inline="true" :model="table.query" size="small">
            <el-form-item label="应用名称">
              <el-input v-model="table.query.name" style="width: 130px" clearable></el-input>
            </el-form-item>
            <el-form-item label="APP ID">
              <el-input v-model="table.query.app_id" style="width: 130px" clearable></el-input>
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
            <el-table-column label="APP ID" width="270">
              <template slot-scope="scope">
                {{ scope.row.app.app_id }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="应用名称" min-width="250">
              <template slot-scope="scope">
                {{ scope.row.app.name }}
              </template>
            </el-table-column>
            <el-table-column prop="provider_id" label="软件商ID" width="150"></el-table-column>
            <el-table-column prop="version" label="版本号" width="90"></el-table-column>

            <el-table-column label="审核状态" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1" size="mini">待审核</el-tag>
                <el-tag v-if="scope.row.status==2" type="success" size="mini">通过</el-tag>
                <el-tag v-if="scope.row.status==3" type="danger" size="mini">拒绝</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="拒绝理由" min-width="250">
              <template slot-scope="scope">
                <span v-if="scope.row.status==3">{{ scope.row.refuse_reason }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="创建时间" min-width="160"></el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="detail(scope.row)" v-if="scope.row.status==1">审核
                </el-button>
                <el-button type="primary" size="mini" v-else disabled>审核</el-button>
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

    <!--   详情-->
    <el-dialog title="审核" :visible.sync="detailDialog.show" width="80%">
      <el-form label-width="110px">
        <el-form-item label="APP ID：">
          {{ detailDialog.data.app.app_id }}
        </el-form-item>
        <el-form-item label="应用名称：">
          {{ detailDialog.data.app.name }}
        </el-form-item>
        <el-form-item label="首页图标：">
          <el-image style="width: 120px; height: 120px" :src="detailDialog.data.icon"></el-image>
        </el-form-item>
        <el-form-item label="背景图：">
          <el-image style="width: 375px; height: 352px" :src="detailDialog.data.banner"></el-image>
        </el-form-item>
        <el-form-item label="支持设备：">
          <el-tag v-if="detailDialog.data.is_ios==1" size="mini" type="success">IOS</el-tag>
          <el-tag v-if="detailDialog.data.is_web==1" type="success" size="mini" style="margin-left: 5px">WEB
          </el-tag>
          <el-tag v-if="detailDialog.data.is_android==1" type="success" size="mini" style="margin-left: 5px">
            Android
          </el-tag>
        </el-form-item>
        <el-form-item label="IOS App ID：" v-if="detailDialog.data.is_ios">
          {{ detailDialog.data.ios }}
        </el-form-item>
        <el-form-item label="IOS Bound Identifier：" v-if="detailDialog.data.is_ios">
          {{ detailDialog.data.ios_package_name }}
        </el-form-item>
        <el-form-item label="WEB链接：" v-if="detailDialog.data.is_web">
          {{ detailDialog.data.web }}
        </el-form-item>
        <el-form-item label="Android商店：" v-if="detailDialog.data.is_android">
          <el-tag v-for="(v,k) in detailDialog.data.shop" :key="k" type="success" size="mini"
                  style="margin-left: 5px">
            {{ v.shop_name }}
          </el-tag>
        </el-form-item>
        <el-form-item label="Android包名：" v-if="detailDialog.data.is_android">
          {{ detailDialog.data.package_name }}
        </el-form-item>

        <el-form-item label="分类：">
          <el-tag v-for="(v,k) in detailDialog.data.l3" :key="k" type="success" size="mini"
                  style="margin-left: 5px">
            {{ v.name }}
          </el-tag>
        </el-form-item>
        <el-form-item label="适用人群：">
          <el-tag v-for="(v,k) in detailDialog.data.grade" :key="k" type="success" size="mini"
                  style="margin-left: 5px">
            {{ v.name }}
          </el-tag>
        </el-form-item>
        <el-form-item label="简介：">
          <el-input type="textarea" :rows="10" disabled v-model="detailDialog.data.desc"></el-input>
        </el-form-item>

        <el-form-item label="截图：">
          <el-image
            v-for="(val,key) in detailDialog.data.image"
            :key="key"
            style="width: 375px; height: 812px;margin-right: 5px"
            :src="val"
            :preview-src-list="[val]">
          </el-image>
        </el-form-item>

        <el-form-item label="审核状态：">
          <el-radio-group v-model="editParams.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="3">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="拒绝理由：" v-if="editParams.status==3">
          <el-input v-model="editParams.refuse_reason"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailDialog.show = false">关 闭</el-button>
        <el-popconfirm title="确认提交？提交后将不可更改" @onConfirm="editStatus" style="margin-left: 5px">
          <el-button slot="reference" type="primary">提 交</el-button>
        </el-popconfirm>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {getAppVersion, editAppVersionStatus} from "@/api/app";

export default {
  name: 'AppVersion',
  data() {
    return {
      providerAppId: 0,
      table: {
        loading: false,
        data: [],
        total: 0,
        query: {
          name: '',
          app_id: '',
          status: 0,
          page: 1
        }
      },
      detailDialog: {
        show: false,
        data: {
          image: [],
          android: [],
          app:{}
        },
      },
      editParams: {
        id: '',
        status: '',
        refuse_reason: '',
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getAppVersion(this.table.query).then(({code, data}) => {
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
    detail(data) {
      this.detailDialog.data = data
      this.detailDialog.show = true
      this.editParams = {id: data.id, status: 0, refuse_reason: ''}
    },
    editStatus() {
      if (this.editParams.status != 2 && this.editParams.status != 3) {
        return this.$message.error('请选择审核状态')
      }
      if (this.editParams.status == 3 && this.editParams.refuse_reason == '') {
        return this.$message.error('请输入拒绝理由')
      }
      editAppVersionStatus(this.editParams).then(({code}) => {
        if (code == 0) {
          this.$message.success('成功')
          this.getList()
          this.detailDialog.show = false
        }
      })
    }
  }
}
</script>
