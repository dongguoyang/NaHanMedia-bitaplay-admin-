<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header">
            <span>适用人群</span>
            <div style="float: right" >
              <el-button size="mini" type="success" @click="refresh">刷新</el-button>
              <el-button style="margin-left: 5px" size="mini" type="primary" @click="add">添加</el-button>
            </div>
          </div>

          <el-table
            :data="table.data"
            stripe
            style="width: 100%"
            v-loading="table.loading"
          >
            <el-table-column prop="name" label="标题" width="200"></el-table-column>

            <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>


            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-card>
      </el-main>
    </el-container>

    <!--   详情-->
    <el-dialog title="添加/编辑" :visible.sync="saveDialog.show" width="80%">
      <el-form label-width="80px">
        <el-form-item label="标题" required v-if="saveDialog.data.id==0">
          <el-input v-model="saveDialog.data.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input v-model="saveDialog.data.content" :rows="10" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDialog.show = false">关 闭</el-button>
        <el-button slot="reference" type="primary" @click="save" v-loading="saveDialog.loading">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {getGradeList, saveGrade} from "@/api/grade";

export default {
  name: 'OperationGrade',
  data() {
    return {
      table: {
        loading: false,
        data: [],
      },
      saveDialog: {
        show: false,
        loading: false,
        data: {
          id: 0,
          name: '',
          content: ''
        },
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.table.loading = true
      getGradeList(this.table.query).then(({code, data}) => {
        this.table.loading = false
        if (code == 0) {
          this.table.data = data
        }
      })
    },
    refresh() {
      this.getList()
    },
    add() {
      this.saveDialog.loading = false
      this.saveDialog.data = {
        id: 0,
        name: '',
        content: ''
      }
      this.saveDialog.show = true
    },
    edit(row) {
      this.saveDialog.loading = false
      this.saveDialog.data = JSON.parse(JSON.stringify(row))
      this.saveDialog.show = true
    },
    save() {
      this.saveDialog.loading = true
      saveGrade(this.saveDialog.data).then(({code})=>{
        this.saveDialog.loading = false
        if(code==0){
          this.getList()
          this.$message.success('成功')
          this.saveDialog.show = false
        }
      })
    }
  }
}
</script>
