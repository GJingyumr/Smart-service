<template>
  <div class="Header_layout">
    <div class="Header-left">
      <i class="el-icon-s-fold iconss"></i>
    </div>
    <div class="Header-right">
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <i class="el-icon-rank icons" @click="toggleFullscreen"></i>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="关闭全部标签"
        placement="bottom"
      >
        <i class="el-icon-circle-close icons"></i>
      </el-tooltip>
       <el-avatar class="avatarScss"  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <el-dropdown @command="handledropdown">
        <span class="el-dropdown-link">
          <span class="Header_title">duck</span
          ><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="A">个人设置</el-dropdown-item>
          <el-dropdown-item command="B">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import UserApi from '../../api/user'
import { removeItem } from '../../utils/storage'
import screenfulls from 'screenfull'
export default {
  data() {
    return {
      token: ''
    }
  },
  created() {},
  methods: {
    // 全屏功能
    toggleFullscreen () {
      if (!screenfulls.isEnabled) {
        return false
      }
      screenfulls.request()
    },
    handledropdown(command) {
      if (command === 'B') {
        // this.handleRemove()
        this.handleInfo()
      }
    },
    async handleRemove() {
      const res = await UserApi.logout()
      console.log(res)
      this.$router.push('/login')
    },
    handleInfo() {
      this.$confirm('是否确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.handleRemove()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          removeItem("token")
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  components: {}
}
</script>

<style lang="scss">
.Header_layout {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background: #18bc9c;
  align-items: center;
  color: white;
}
.Header_title {
  font-weight: bold;
  color: white;
  font-size: 17px;
}
.icons {
  margin-left: 20px;
  font-size: 25px;
}
.iconss{
  font-size: 30px;
}
.Header-right{
  display: flex;
  height: 60px;
  align-items: center;
}
.avatarScss{
  width: 30px;
  height: 30px;
  margin: 0 20px 0 20px;
}
.el-icon-rank {
  transform: rotate(20deg)
}
</style>
