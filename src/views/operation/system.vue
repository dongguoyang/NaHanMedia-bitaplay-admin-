<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form inline label-width="150px">
            <el-form-item label="下载最低奖励金额">
              <el-input v-model="lowestDownloadReward.value.amount">
                <span slot="prepend">￥</span>
                <el-button slot="append">次</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveLowestDownloadReward" v-loading="lowestDownloadReward.loading">保 存
              </el-button>
            </el-form-item>
          </el-form>

          <el-form inline label-width="150px">
            <el-form-item label="推荐奖励金额">
              <el-input v-model="recommendReward.value.amount">
                <span slot="prepend">￥</span>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveRecommendReward" v-loading="recommendReward.loading">保 存
              </el-button>
            </el-form-item>
          </el-form>

          <el-form inline label-width="150px">
            <el-form-item label="燃料价格">
              <el-input v-model="fuelPrice.value.price">
                <span slot="prepend">￥</span>
                <el-button slot="append">10000</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveFuelPrice" v-loading="fuelPrice.loading">保 存
              </el-button>
            </el-form-item>
          </el-form>

          <el-form inline label-width="150px">
            <el-form-item label="三方登录价格">
              <el-input v-model="thirdLoginPrice.value.price">
                <span slot="prepend">￥</span>
                <el-button slot="append">次</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveThirdLoginPrice" v-loading="thirdLoginPrice.loading">保 存
              </el-button>
            </el-form-item>
          </el-form>

          <el-form inline label-width="150px">
            <el-form-item label="用户提现手续费">
              <el-input v-model="fee.value.withdraw_fee">
                <el-button slot="append">%</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="开发者提现手续费">
              <el-input v-model="fee.value.provider_withdraw_fee">
                <el-button slot="append">%</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveFee" v-loading="thirdLoginPrice.loading">保 存
              </el-button>
            </el-form-item>
          </el-form>

          <el-form inline label-width="200px">
            <el-form-item label="广告收益直接开通人数">
              <el-input v-model="adStatus.value.count"></el-input>
            </el-form-item>
            <el-form-item label="广告收益直接开通截止时间">
              <el-input v-model="adStatus.value.ended_at"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveAdStatus" v-loading="thirdLoginPrice.loading">保 存
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import {searchSystem, saveSystem} from "@/api/system";

export default {
  name: 'OperationSystem',
  data() {
    return {
      lowestDownloadReward: {
        loading: false,
        value: {
          amount: 0
        }
      },
      recommendReward: {
        loading: false,
        value: {
          amount: 0
        }
      },
      fuelPrice: {
        loading: false,
        value: {
          price: 0
        }
      },
      thirdLoginPrice: {
        loading: false,
        value: {
          price: 0
        }
      },
      fee: {
        loading: false,
        value: {
          withdraw_fee: 0,
          provider_withdraw_fee: 0,
        }
      },
      adStatus: {
        loading: false,
        value: {
          count: 1000,
          ended_at: '',
        }
      }
    }
  },
  created() {
    this.getLowestDownloadReward()
    this.getRecommendReward()
    this.getFuelPrice()
    this.getThirdLoginPrice()
    this.getFee()
    this.getAdStatus()
  },
  methods: {
    getLowestDownloadReward() {
      searchSystem({key: 'lowest_download_reward'}).then(({code, data}) => {
        if (code == 0) {
          this.lowestDownloadReward.value.amount = data.amount / 100
        }
      })
    },
    saveLowestDownloadReward() {
      let p = {
        key: 'lowest_download_reward',
        value: {
          amount: this.lowestDownloadReward.value.amount * 100
        }
      }
      this.lowestDownloadReward.loading = true
      saveSystem(p).then(({code}) => {
        this.lowestDownloadReward.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getLowestDownloadReward()
        }
      })
    },
    getRecommendReward() {
      searchSystem({key: 'recommend_reward'}).then(({code, data}) => {
        if (code == 0) {
          this.recommendReward.value.amount = data.amount / 100
        }
      })
    },
    saveRecommendReward() {
      let p = {
        key: 'recommend_reward',
        value: {
          amount: this.recommendReward.value.amount * 100
        }
      }
      this.recommendReward.loading = true
      saveSystem(p).then(({code}) => {
        this.recommendReward.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getRecommendReward()
        }
      })
    },
    getFuelPrice() {
      searchSystem({key: 'fuel_price'}).then(({code, data}) => {
        if (code == 0) {
          this.fuelPrice.value.price = data.price / 100
        }
      })
    },
    saveFuelPrice() {
      let p = {
        key: 'fuel_price',
        value: {
          price: this.fuelPrice.value.price * 100
        }
      }
      this.fuelPrice.loading = true
      saveSystem(p).then(({code}) => {
        this.fuelPrice.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getFuelPrice()
        }
      })
    },
    getThirdLoginPrice() {
      searchSystem({key: 'third_login_price'}).then(({code, data}) => {
        if (code == 0) {
          this.thirdLoginPrice.value.price = data.price / 100
        }
      })
    },
    saveThirdLoginPrice() {
      let p = {
        key: 'third_login_price',
        value: {
          price: this.thirdLoginPrice.value.price * 100
        }
      }
      this.thirdLoginPrice.loading = true
      saveSystem(p).then(({code}) => {
        this.thirdLoginPrice.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getThirdLoginPrice()
        }
      })
    },
    getFee() {
      searchSystem({key: 'fee'}).then(({code, data}) => {
        if (code == 0) {
          this.fee.value.withdraw_fee = (data.withdraw_fee * 100).toFixed(2)
          this.fee.value.provider_withdraw_fee = (data.provider_withdraw_fee * 100).toFixed(2)
        }
      })
    },
    saveFee() {
      let p = {
        key: 'fee',
        value: {
          withdraw_fee: (this.fee.value.withdraw_fee / 100).toFixed(4),
          provider_withdraw_fee: (this.fee.value.provider_withdraw_fee / 100).toFixed(4)
        }
      }
      this.fee.loading = true
      saveSystem(p).then(({code}) => {
        this.fee.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getFee()
        }
      })
    },
    getAdStatus() {
      searchSystem({key: 'ad_status'}).then(({code, data}) => {
        if (code == 0) {
          this.adStatus.value = data
        }
      })
    },
    saveAdStatus() {
      let p = {
        key: 'ad_status',
        value: this.adStatus.value
      }
      this.adStatus.loading = true
      saveSystem(p).then(({code}) => {
        this.adStatus.loading = false
        if (code == 0) {
          this.$message.success('成功')
          this.getAdStatus()
        }
      })
    }
  }
}
</script>
