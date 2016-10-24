<template>
<div id="app">
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">

        <!-- Header -->
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <h1 class="title simple-pass">
                <strong>Simple</strong>
                <span class="pass">Pass</span>
            </h1>
            <hr/>
            <br/>
          </div>
        </div>

        <div class="columns" v-if="!loggedIn">
          <div class="column is-8 is-offset-2">
            <button v-on:click="getLoggedIn" class="button is-success is-large" type="button">LOG IN</button>
          </div>
        </div>

        <div v-else v-cloak>

          <div class="columns">
            <div class="column is-8 is-offset-2">
              <button v-on:click="getLoggedOut" class="button is-primary" type="button">LOG OUT</button>
            </div>
          </div>

          <div class="columns">
            <div class="column is-8 is-offset-2">
              <table class="table is-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username/Email</th>
                    <th>Notes</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tfoot>
                  <th v-show="accounts.length">Tot. {{accounts.length}}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tfoot>
                <tbody>

                  <tr
                    v-for="account in filteredAccounts" :key="account['.key']"
                  >
                    <td>{{account.name}}</td>
                    <td>{{account.usernameEmail}}</td>
                    <td>{{account.notes}}</td>
                    <td>****{{account.password.slice(-1)}}</td>
                    <td class="is-icon">
                      <a
                        @click.prevent="editAccount(account)"
                        v-show="!account.editing"
                        href="#"
                      >
                        <i class="fa fa-edit"></i>
                      </a>
                    </td>
                    <td class="is-icon">
                      <a
                        @click.prevent="removeAccount(account)"
                        v-show="!account.editing"
                        href="#"
                      >
                        <i class="fa fa-remove"></i>
                      </a>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div class="columns">
            <div class="column is-8 is-offset-2">
              <form v-on:submit.prevent="newAccount.editing ? updateAccount() : addAccount()">
                <div class="control is-horizontal">
                  <input
                    autofocus autocomplete="off"
                    class="input"
                    :class="{selected: newAccount.editing}"
                    type="text"
                    required
                    placeholder="Name"
                    v-model="newAccount.name"
                  />

                  <input
                    autocomplete="off"
                    class="input"
                    :class="{selected: newAccount.editing}"
                    type="text"
                    required
                    placeholder="Username/Email"
                    v-model="newAccount.usernameEmail"
                  />

                  <input
                    class="input"
                    :class="{selected: newAccount.editing}"
                    type="text"
                    placeholder="Notes"
                    v-model="newAccount.notes"
                  />

                  <input
                    autocomplete="off"
                    class="input"
                    :class="{selected: newAccount.editing}"
                    type="text"
                    required
                    placeholder="Password"
                    v-model="newAccount.password"
                  />

                  <p className="control">
                    <button type="submit" class="button is-outlined is-success">
                      {{newAccount.editing ? 'UPDATE' : 'CREATE'}}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import { db } from './fireconfig'

const filters = {
  all (accounts) {
    return accounts
  },
  edit (accounts) {
    return accounts.filter(account => account.editing === true)
  }
}

export default {
  name: 'app',
  data () {
    return {
      newAccount: {
        name: '',
        usernameEmail: '',
        password: '',
        notes: '',
        editing: false
      },
      visibility: 'all',
      loggedIn: false
    }
  },

  firebase: {
    accounts: db.ref('accounts')
  },

  computed: {
    filteredAccounts () {
      return filters[this.visibility](this.accounts)
    }
  },

  methods: {
    getLoggedIn () {
      this.loggedIn = true
    },

    getLoggedOut () {
      this.loggedIn = false
    },

    addAccount () {
      const name = this.newAccount.name && this.newAccount.name.trim()
      const usernameEmail = this.newAccount.usernameEmail && this.newAccount.usernameEmail.trim()
      const password = this.newAccount.password && this.newAccount.password.trim()
      const notes = this.newAccount.notes && this.newAccount.notes.trim()
      if (!(name && usernameEmail && password)) {
        return
      }
      this.$firebaseRefs.accounts.push({
        name: name,
        usernameEmail: usernameEmail,
        password: password,
        notes: notes,
        editing: false
      })
      this.newAccount = {}
    },

    removeAccount (account) {
      this.$firebaseRefs.accounts.child(account['.key']).remove()
    },

    editAccount (account) {
      this.newAccount = account
      this.newAccount.editing = true
      this.visibility = 'edit'
    },

    updateAccount (account) {
      const name = this.newAccount.name && this.newAccount.name.trim()
      const usernameEmail = this.newAccount.usernameEmail && this.newAccount.usernameEmail.trim()
      const password = this.newAccount.password && this.newAccount.password.trim()
      const notes = this.newAccount.notes && this.newAccount.notes.trim()
      if (!(name && usernameEmail && password)) {
        return
      }
      this.$firebaseRefs.accounts.child(this.newAccount['.key']).set({
        editing: false,
        name: name,
        usernameEmail: usernameEmail,
        password: password,
        notes: notes
      })
      this.visibility = 'all'
      this.newAccount = {}
    }
  }
}

</script>

<style lang="stylus">
[v-cloak] {
  display: none;
}

.simple-pass
  font-size 50px

.pass
  color #ff3860

.editing
  background-color rgba(yellow,.1)

.selected
  background-color rgba(#FCDCB1,.5)
</style>
