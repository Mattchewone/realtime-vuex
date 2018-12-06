<template>
  <div class="hello">
    <h1>Signup</h1>
    <div>
      <form @submit.prevent="createUser">
        <input name="username" placeholder="Username" v-model="username">
        <input name="password" type="password" placeholder="Password" v-model="password">
        <button type="submit">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'signup',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),

    createUser () {
      const { User } = this.$FeathersVuex
      const user = new User({ email: this.username, password: this.password })
      // save the user
      user.save()
        .then(() => {
          // Login
          this.authenticate({ strategy: 'local', email: this.username, password: this.password })
        })
    }
  }
}
</script>
