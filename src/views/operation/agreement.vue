<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-tabs v-model="agreementTab" @tab-click="onAgreementTab">
            <el-tab-pane label="用户协议" name="user_agreement"></el-tab-pane>
            <el-tab-pane label="隐私政策" name="privacy_agreement"></el-tab-pane>
            <el-tab-pane label="开发协议" name="provider_agreement"></el-tab-pane>
          </el-tabs>
          <div id="agreement"></div>
          <el-button type="primary" @click="updateAgreement" style="margin-top: 5px">保存</el-button>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {getSystemAgreement, saveSystem} from "@/api/system";
import E from "wangeditor"

export default {
  name: 'OperationAgreement',
  data() {
    return {
      agreementTab: 'user_agreement',
      agreementEditor: {},
      agreement: {
        privacy_agreement: '',
        user_agreement: '',
        provider_agreement: '',
      },
    }
  },
  created() {

  },
  mounted() {
    this.getAgreement() // 各种协议
  },
  methods: {
    getAgreement() {
      getSystemAgreement().then(({data, code}) => {
        if (code == 0) {
          this.agreement = data
        }
        this.createAgreementEditor()
      })
    },
    createAgreementEditor() {
      this.agreementEditor = new E('#agreement')
      this.agreementEditor.config.height = 600
      let _this = this
      this.agreementEditor.config.onchange = function (html) {
        _this.agreement[_this.agreementTab].content = html
      };
      this.agreementEditor.config.excludeMenus = [
        'video',
        'image'
      ]

      this.agreementEditor.create()
      this.agreementEditor.txt.html(this.agreement[this.agreementTab].content)
    },
    onAgreementTab() {
      this.agreementEditor.txt.html(this.agreement[this.agreementTab].content)
    },
    updateAgreement() {
      saveSystem({key: this.agreementTab, value: this.agreement[this.agreementTab]}).then(({code}) => {
        if (code == 0) {
          this.$message.success('保存成功')
        }
      })
    },
  }
}
</script>
