<template>
  <div class="home">
    <div id="nav">
      <router-link to="/register">Registration</router-link>
    </div>
      <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-6">
                <div class="login-box col-md-12">
                    <form id="login-form" class="form" action="/" method="post">
                        <h3 class="text-center text-info">Login</h3>
                        <div class="form-group">
                            <label for="email" class="text-info">Email:</label><br>
                            <input type="text" name="email" id="email" class="form-control" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">Password:</label><br>
                            <input type="text" name="password" id="password" class="form-control" v-model="password">
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit" @click="handleSubmit">
                        </div>
                       <p>{{ email }}</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  // components: {
  //   Login: 'Login'
  // },
  data: () => ({
    email: '',
    password: ''
  }),
  // created: function() {
  //   let users = JSON.parse(localStorage.user)
  //   console.log(users);
  //   // if (users) {
  //   // } else {
  //   // }
  // },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      // console.log(this.email)
      const reqBody = {
        email: this.email,
        password: this.password
      }
      axios.post('/users/login', {
        body: reqBody,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // console.log(response)
        return response
      })
        .then((data) => {
          if (data.data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(data))
            this.$router.push('/account')
          } else {
            alert(data.error)
            this.$router.push('/login')
          }
        })
        .catch((err) => console.log(err))
    }
  }
}

</script>
