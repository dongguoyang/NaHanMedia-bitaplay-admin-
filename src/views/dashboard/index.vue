<template>
  <div>
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <!--          用户数量-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">用户数量</span>
              </div>
              <div v-loading="loading">
                <div class="content-item">
                  <span class="title"><span style="letter-spacing: 32px">总</span>量：</span>
                  <span class="content">{{ data.user.total }}</span>
                </div>
                <div class="content-item">
                  <span class="title">本月新增：</span>
                  <span class="content">{{ data.user.month }}</span>
                </div>
                <div>
                  <span class="title">本日新增：</span>
                  <span class="content">{{ data.user.today }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--          应用数量-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">上架应用数量</span>
              </div>
              <div v-loading="loading">
                <div class="content-item">
                  <span class="title"><span style="letter-spacing: 32px">总</span>量：</span>
                  <span class="content">{{ data.app.total }}</span>
                </div>
                <div class="content-item">
                  <span class="title">本月新增：</span>
                  <span class="content">{{ data.app.month }}</span>
                </div>
                <div>
                  <span class="title">本日新增：</span>
                  <span class="content">{{ data.app.today }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--          三方登录调用次数-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">三方登录调用次数</span>
              </div>
              <div v-loading="loading">
                <div class="content-item">
                  <span class="title"><span style="letter-spacing: 32px">总</span>量：</span>
                  <span class="content">{{ data.third_login.total }}</span>
                </div>
                <div class="content-item">
                  <span class="title">本月新增：</span>
                  <span class="content">{{ data.third_login.month }}</span>
                </div>
                <div>
                  <span class="title">本日新增：</span>
                  <span class="content">{{ data.third_login.today }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--          燃料燃烧数量-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">燃料燃烧数量</span>
              </div>
              <div v-loading="loading">
                <div class="content-item">
                  <span class="title"><span style="letter-spacing: 32px">总</span>量：</span>
                  <span class="content">{{ data.fuel.total }}</span>
                </div>
                <div class="content-item">
                  <span class="title">本月新增：</span>
                  <span class="content">{{ data.fuel.month }}</span>
                </div>
                <div>
                  <span class="title">本日新增：</span>
                  <span class="content">{{ data.fuel.today }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--          下载次数-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">下载次数</span>
              </div>
              <div v-loading="loading">
                <div class="content-item">
                  <span class="title"><span style="letter-spacing: 32px">总</span>量：</span>
                  <span class="content">{{ data.download.total }}</span>
                </div>
                <div class="content-item">
                  <span class="title">本月新增：</span>
                  <span class="content">{{ data.download.month }}</span>
                </div>
                <div>
                  <span class="title">本日新增：</span>
                  <span class="content">{{ data.download.today }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--          充值金额-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">充值金额</span>
              </div>
              <div v-loading="loading">
                <div class="content-item">
                  <span class="title"><span style="letter-spacing: 32px">总</span>量：</span>
                  <span class="content">￥{{ data.recharge.total / 100 }}</span>
                </div>
                <div class="content-item">
                  <span class="title">本月新增：</span>
                  <span class="content">￥{{ data.recharge.month / 100 }}</span>
                </div>
                <div>
                  <span class="title">本日新增：</span>
                  <span class="content">￥{{ data.recharge.today / 100 }}</span>
                </div>
              </div>
            </el-card>
          </el-col>

          <!--          快手广告统计-->
          <el-col :span="8" class="item">
            <el-card class="box-card">
              <div slot="header">
                <span class="card-title">快手渠道</span>
              </div>
              <div v-loading="loading">
                <!--                <div class="content-item">-->
                <!--                  <span class="title"><span style="letter-spacing: 32px">展示总</span>量：</span>-->
                <!--                  <span class="content">约{{ data.ks.show }}</span>-->
                <!--                </div>-->
                <div class="content-item">
                  <span class="title">激活量：</span>
                  <span class="content">{{ ks.download }}</span>
                </div>
                <div>
                  <span class="title">注册量：</span>
                  <span class="content">{{ ks.register }}</span>
                </div>
              </div>
            </el-card>
          </el-col>

        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import {getDashboardIndex, getDashboardKsAds} from "@/api/dashboard";

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      data: {
        user: {
          total: 0,
          today: 0,
          month: 0
        },
        app: {
          total: 0,
          today: 0,
          month: 0
        },
        third_login: {
          total: 0,
          today: 0,
          month: 0
        },
        fuel: {
          total: 0,
          today: 0,
          month: 0
        },
        download: {
          total: 0,
          today: 0,
          month: 0
        },
        recharge: {
          total: 0,
          today: 0,
          month: 0
        },
      },
      ks: {
        show: 0,
        download: 0,
        register: 0,
      }
    }
  },
  created() {
    this.getData()
    this.getKs()
  },
  methods: {
    getData() {
      this.loading = true
      getDashboardIndex().then(({code, data}) => {
        if (code == 0) {
          this.loading = false
          this.data = data
        }
      })
    },
    getKs() {
      getDashboardKsAds().then(({code, data}) => {
        if (code == 0) {
          this.loading = false
          this.ks = data
        }
      })
    }
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 20px;
}

.content-item {
  margin-bottom: 10px;
}

.title {
  font-size: 16px;
  color: #606266;
  font-weight: bold;
}

.content {
  font-size: 18px;
  color: #F56C6C;
  font-weight: bolder;
}

.card-title {
  font-weight: bolder;
}
</style>
