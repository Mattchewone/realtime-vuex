<template>
  <div id="app">
    <ul>
      <li v-if="!user"><router-link :to="{ name: 'login'}">Login</router-link></li>
      <li v-if="!user"><router-link :to="{ name: 'signup'}">Signup</router-link></li>
      <li v-if="user"><router-link :to="{ name: 'messages'}">Messages</router-link></li>
      <li v-if="user"><button @click.prevent="logout">Logout</button></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    ...mapActions('auth', ['logout'])
  },
  watch: {
    user: {
      handler (user) {
        if (user) {
          this.$router.push({ name: 'messages' })
        } else {
          this.$router.push({ name: 'login' })
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style: none;
}
</style>
