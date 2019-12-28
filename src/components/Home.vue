<template>
  <div>
    <el-button @click="logout" round type="info">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
    methods: {
      //退出功能
      logout() {
        //清空sessionStorage中缓存的token
        window.sessionStorage.clear();
        //路由导航到登录页面
        this.$router.push("/login")

      }
    }
  }
</script>

<style scoped>

</style>
