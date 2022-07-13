<template>
  <div class="Header_layout">
    <div class="Header-left">
      <i class="el-icon-s-fold iconss"></i>
      <div class="tagsview">
        <ul>
          <li>控制台</li>
          <li>用户管理</li>
          <li>角色管理</li>
          <li>菜单管理</li>
        </ul>
      </div>
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
      <el-avatar class="avatarScss" :src="username.avatar"></el-avatar>
      <el-dropdown @command="handledropdown">
        <span class="el-dropdown-link">
          <span class="Header_title">{{ username.username }}</span
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
      token: '',
      username: ''
    }
  },
  created() {
    this.username = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(JSON.parse(localStorage.getItem('userInfo')))
  },
  methods: {
    // 全屏功能
    toggleFullscreen() {
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
          removeItem('token')
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
.Header-left {
  display: flex;
  height: 60px;
  align-items: center;
  ul {
    list-style: none;
    display: flex;
    li {
      width: 90px;
      height: 30px;
      text-align: center;
      border: 1px orange solid;
      margin-left: 10px;
      line-height: 30px;
      color: orange;
      background-color: white;
      border-radius: 5px;
    }
  }
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
.iconss {
  font-size: 30px;
}
.Header-right {
  display: flex;
  height: 60px;
  align-items: center;
}
.avatarScss {
  width: 40px;
  height: 40px;
  margin: 0 20px 0 20px;
}
.el-icon-rank {
  transform: rotate(20deg);
}
</style>
