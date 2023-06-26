<template>
  <div>
    <Login/>
  </div>
</template>

<script>

import Login from '@/components/HomeComponent.vue'

export default {
  name: 'loginItem',
  components: {
    Login
  },
  created: function () {
    const len = localStorage.length
    if (len !== 1) {
      const users = JSON.parse(localStorage.user).status
      if (users === 200) {
        this.$router.push('/account')
      } else {
        this.$router.push('/login')
      }
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
