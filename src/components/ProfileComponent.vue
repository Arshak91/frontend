<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1>{{ name }}</h1>
        <h2>{{ content.name }}</h2>
        <h2>{{ content.surname }}</h2>
        <button class="btn btn-danger" v-on:click="logout">Logout</button>
      </div>
      <div class="column">
        <form @submit.prevent="sendFile" enctype="multipart/form-data" class="md-form">
          <div class="file-field">
            <div class="btn btn-primary btn-sm float-left">
              <span>Choose file</span>
              <input
                type="file"
                ref="file"
                @change="selectFile"
                class="file-input"
              >
            </div>
            <div class="file-path-wrapper">
              <button class="btn btn-info">Send File</button>
              <!-- <input class="file-path validate" type="text" placeholder="Upload your file"> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileItem',
  data: function () {
    return {
      content: {},
      file: '',
      message: '',
      error: false
    }
  },
  created: function () {
    try {
      const users = JSON.parse(localStorage.user)
      this.content = users.data
    } catch (error) {
      this.$router.push('/login')
    }
  },
  props: {
    name: String
  },
  methods: {
    logout: function () {
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    async getToken () {
      const usersJson = await localStorage.getItem('user')
      const user = await JSON.parse(usersJson)
      const token = user.data.token
      return token
    },
    selectFile () {
      const file = this.$refs.file.files[0]
      this.file = file
      this.error = false
      this.message = ''
    },
    getUser () {
      const user = localStorage.getItem('user')
      const userJson = JSON.parse(user)
      const data = userJson.data
      return data
    },
    async sendFile () {
      const formData = new FormData()
      await formData.append('file', this.file)
      // const usersJson = await localStorage.getItem('user');
      const token = await this.getToken()
      console.log(token)

      try {
        await axios.post('/users/upload', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.message = 'File has been uploaded'
        this.file = ''
        this.error = false
      } catch (err) {
        this.message = err.response.data.error
        this.error = true
      }
    }
  }
}

</script>
