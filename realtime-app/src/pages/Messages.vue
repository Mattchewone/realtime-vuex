<template>
  <div>
    <h1>Messages</h1>
    <div>
      <form @submit.prevent="createMessage">
        <input name="to" placeholder="To" v-model="to">
        <input name="msg" placeholder="Message.." v-model="msg">
        <button type="submit">Create</button>
      </form>
    </div>
    <div class="wrapper" v-if="users.length && messages.length">
      <section v-for="message in messages" :key="message._id">
        <div>
          TO: {{ usersById[message.to] && usersById[message.to].email }}
        </div>
        <div>
          MSG: {{ message.name }}
        </div>
        <div>
          FROM: {{ usersById[message.from] && usersById[message.from].email }}
        </div>
        <div>
          <input type="text" v-model="message.name">
          <button type="button" @click.prevent="updateMessage(message)">Save</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Message',
  data () {
    return {
      msg: '',
      to: ''
    }
  },
  computed: {
    ...mapGetters('messages', {
      findMessagesInStore: 'find'
    }),
    ...mapGetters('users', {
      findUsersInStore: 'find'
    }),

    // Load the reactive data from the store
    // We could use a query here to get the data back that we need
    messages () {
      const user = this.$store.state.auth.user
      return this.findMessagesInStore({ query: { $or: [{ to: user._id }, { from: user._id }] } }).data
    },

    users () {
      return this.findUsersInStore({}).data
    },

    usersByEmail () {
      const { users } = this
      // Map to object keyec by name for easy lookup
      return users.reduce((users, user) => {
        users[user.email] = user
        return users
      }, {})
    },

    usersById () {
      const { users } = this
      // Map to object keyec by name for easy lookup
      return users.reduce((users, user) => {
        users[user._id] = user
        return users
      }, {})
    }
  },
  methods: {
    ...mapActions('messages', {
      findMessages: 'find'
    }),
    ...mapActions('users', {
      findUsers: 'find'
    }),

    createMessage () {
      // Use the Message MODEL from FeathersVuex to 'Create' a new
      // Message and update the store..
      const { Message } = this.$FeathersVuex
      const toUser = this.usersByEmail[this.to]

      if (toUser) {
        const msg = new Message({ name: this.msg, to: toUser._id })
        // save the msg
        msg.save()
          .then(() => {
            // Reset data
            this.msg = ''
            this.to = ''
          })
      } else {
        console.log('No user...')
      }
    },

    updateMessage (msg) {
      msg.save()
    }
  },
  created () {
    const user = this.$store.state.auth.user
    // Initially load messages
    this.findMessages({ query: { $or: [{ to: user._id }, { from: user._id }] } })
    this.findUsers({ query: {} })
  }
}
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
  }

  .wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    section {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 50px;
      padding-right: 50px;
      div {
        width: 100%;
        text-align: left;
      }
    }
  }
</style>
