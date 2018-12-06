<template>
  <div id="app">
    <ul class="navigation">
      <!-- Not logged in -->
      <li v-if="!user"><router-link :to="{ name: 'login'}">Login</router-link></li>
      <li v-if="!user"><router-link :to="{ name: 'signup'}">Signup</router-link></li>

      <!-- logged in -->
      <li v-if="user"><a @click.prevent>User: {{ user.email }}</a></li>
      <li v-if="user"><router-link :to="{ name: 'messages'}">Messages</router-link></li>
      <li v-if="user"><a @click.prevent="logout">Logout</a></li>
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

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navigation {
  list-style: none;
  margin: 0;

  background: deepskyblue;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: flex-end;
}

.navigation a {
  text-decoration: none;
  display: block;
  padding: 1em;
  color: white;
}

.navigation a:hover {
  background: darken(deepskyblue, 2%);
}

@media all and (max-width: 800px) {
  .navigation {
    justify-content: space-around;
  }
}

@media all and (max-width: 600px) {
  .navigation {
    -webkit-flex-flow: column wrap;
    flex-flow: column wrap;
    padding: 0;
  }

  .navigation a {
    text-align: center;
    padding: 10px;
    border-top: 1px solid rgba(255,255,255,0.3);
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }


  .navigation li:last-of-type a {
    border-bottom: none;
  }
}
</style>
