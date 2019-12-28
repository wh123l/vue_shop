<template>
  <div class="login_container">
    <div class="login_box">
      <!--        头像区域-->
      <div class="avatar_box">
        <img alt="头像" src="../assets/logo.jpg" title="登录头像">
      </div>
      <!--        登录表单-->
      <el-form :model="loginForm" :rules="loginFormRules" class="login_from" label-width="0px" ref="loginFormRef">
        <!--          用户名区域-->
        <el-form-item prop="username">
          <el-input
            placeholder="用户"
            prefix-icon="iconfont iconicon"
            v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <!--          密码区域-->
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="iconfont icondengluyemianmima"
            type="password" v-model="loginForm.password">
          </el-input>
        </el-form-item>
        <!--          按钮区域-->
        <el-form-item class="btns">
          <el-button :loading="logining" @click="login" round type="primary">登录</el-button>
          <el-button @click="resetLoginForm" round type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {requseLogin} from "../axios/api";

  export default {
    name: "Login",
    data() {
      return {
        //表单的数据绑定对象
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        //表单的验证规则对象
        loginFormRules: {
          //用户名的验证规则
          username: [
            {required: true, message: '请输入登录名称', trigger: 'blur'},
            {min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur'}
          ],
          //  密码的验证规则
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ]
        },
        logining: false
      }
    },
    methods: {
      //重置
      resetLoginForm() {
        //调用element-ui中表单组件的resetFields方法
        this.$refs.loginFormRef.resetFields()
      },
      //登录
      login() {
        //调用element-ui中表单组件的validate方法
        this.$refs.loginFormRef.validate(valid => {

          // if (this.loginForm.username === 'admin' || this.loginForm.password === '123456') {
          //   // 通过编程式导航跳转到后台页面  路由地址 '/home'
          //   this.$router.push("/home");
          //   return this.$message.success('登录成功')
          // } else {
          //   return this.$message.error('登录失败')
          // }

          if (valid) {
            this.logining = true;
            let loginParams = {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
            // 调用axios登录接口
            requseLogin(loginParams).then(res => {
              // debugger;
              this.logining = false;
              // 根据返回的code判断是否成功
              let {code, msg, user} = res.data;
              if (code === 200) {
                // elementui中提示组件
                this.$message({
                  type: 'success',
                  message: msg
                });
                // 登陆成功，用户信息就保存在sessionStorage中
                sessionStorage.setItem('user', JSON.stringify(user));
                // 跳转到后台主页面
                console.log('this', this)
                this.$router.push({path: '/home'})

              } else {
                this.$message({
                  type: 'error',
                  message: msg,
                });
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!');
            return false;
          }
        })
      },
      reset() {
        this.$refs.loginFormRef.resetFields()
      },

    }
  }
</script>


<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      width: 130px;
      height: 130px;
      padding: 10px;
      border: 1px #eeeeee solid;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .login_from {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: center;
  }
</style>
