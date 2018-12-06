<template>
  <div class="hello">
    <h1>Login</h1>
    <div>
      <form @submit.prevent="login">
        <input name="username" placeholder="Username" v-model="username">
        <input name="password" type="password" placeholder="Password" v-model="password">
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),

    login () {
      const { username, password } = this
      this.authenticate({ strategy: 'local', email: username, password })
    }
  }
}
</script>
