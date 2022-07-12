<template>
  <div class="login-container">
    <div class="login-center">
      <div>
        <p class="login-title">智慧服务平台</p>
      </div>
      <div>
        <div>
          <p class="login_title_one">欢迎登录</p>
        </div>
        <div>
          <el-form
            ref="form"
            :model="loginForm"
            :rules="rules"
            label-width="25px"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                clearable
                placeholder="请输入账号"
                suffix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model.trim="loginForm.password"
                placeholder="请输入密码"
                clearable
                show-password
                suffix-icon="el-icon-s-goods"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="login_input">
                <el-input
                  clearable
                  v-model.trim="loginForm.code"
                  placeholder="请输入验证码"
                ></el-input>
                <img @click.stop="handleCode" :src="codeImageUsl" alt="" />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                :loading="loadingStatus"
                @click="handleLogin"
              >
                {{ loadingStatus ? '登录中...' : '立即登录' }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from '../../api/user'
// import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      codeImageUsl: '',
      loadingStatus: false,
      loginForm: {
        username: 'duck',
        password: 'admin888',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.handleGetCode()
  },
  methods: {
    // 调用接口获取验证码
    async handleGetCode() {
      const { captchaImg, token } = await UserApi.getCaptcha()
      this.codeImageUsl = captchaImg
      this.loginForm.token = token
    },
    // 验证码刷新
    handleCode() {
      this.loginForm.code = ''
      this.handleGetCode()
    },
    handleLogin() {
      this.loadingStatus = true
      try {
        this.$refs.form.validate(async (valid) => {
          if (!valid) return
          const response = await this.$store.dispatch(
            'user/login',
            this.loginForm
          )
          console.log(response)
          this.loadingStatus = false
          this.$router.push('/')
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url('../../assets/images/bg.jpg');
}
.login-center {
  width: 400px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.login-title {
  font-size: 45px;
  color: white;
  text-align: center;
  margin-top: 40px;
}
.el-form {
  width: 350px;
}
.login_title_one {
  font-size: 40px;
  color: white;
  margin-left: 25px;
  margin-top: 200px;
}
.demo-ruleForm {
  margin-top: 40px;
}
.el-button {
  width: 325px;
}
.login_input {
  display: flex;
  img {
    width: 100px;
    height: 40px;
    margin-left: 10px;
  }
}
</style>
