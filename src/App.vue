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
                    <th v-show="!editing">Edit</th>
                    <th v-show="!editing">Delete</th>
                  </tr>
                </thead>
                <tfoot>
                  <th v-show="accounts.length">Tot. {{accounts.length}}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th v-show="!editing"></th>
                  <th v-show="!editing"></th>
                </tfoot>
                <tbody>

                  <tr
                    v-for="account in accounts" :key="account['.key']"
                  >
                    <td>{{account.name}}</td>
                    <td>{{account.usernameEmail}}</td>
                    <td>{{account.notes}}</td>
                    <td>****{{account.password.slice(-1)}}</td>
                    <td class="is-icon">
                      <a
                        @click.prevent="editAccount(account)"
                        v-show="!account.editingMode"
                        href="#"
                      >
                        <i class="fa fa-edit"></i>
                      </a>
                    </td>
                    <td class="is-icon">
                      <a
                        @click.prevent="removeAccount(account)" href="#"
                        v-show="!account.editingMode"
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
              <form v-on:submit.prevent="editing ? updateAccount() : addAccount()">
                <div class="control is-horizontal">
                  <input
                    autofocus autocomplete="off"
                    class="input"
                    type="text"
                    required
                    placeholder="Name"
                    v-model="newAccount.name"
                  />

                  <input
                    autocomplete="off"
                    class="input"
                    type="text"
                    required
                    placeholder="Username/Email"
                    v-model="newAccount.usernameEmail"
                  />

                  <input
                    class="input"
                    type="text"
                    placeholder="Notes"
                    v-model="newAccount.notes"
                  />

                  <input
                    autocomplete="off"
                    class="input"
                    type="text"
                    required
                    placeholder="Password"
                    v-model="newAccount.password"
                  />

                  <p className="control">
                    <button type="submit" class="button is-outlined is-success">
                      {{editing ? 'UPDATE' : 'CREATE'}}
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
    return accounts.filter(account => account.editingMode)
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
        editingMode: false
      },
      editing: false,
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
        editingMode: false
      })
      this.newAccount = {}
    },

    removeAccount (account) {
      this.accounts.splice(this.accounts.indexOf(account), 1)
    },

    editAccount (account, index) {
      this.editing = true
      this.newAccount = account
      const id = index
      const name = this.newAccount.name && this.newAccount.name.trim()
      const usernameEmail = this.newAccount.usernameEmail && this.newAccount.usernameEmail.trim()
      const password = this.newAccount.password && this.newAccount.password.trim()
      const notes = this.newAccount.notes && this.newAccount.notes.trim()
      if (!(name && usernameEmail && password)) {
        return
      }
      this.newAccount = {
        id: id,
        editingMode: true,
        name: name,
        usernameEmail: usernameEmail,
        password: password,
        notes: notes
      }
    },

    updateAccount () {
      this.newAccount.editingMode = false
      this.accounts[this.newAccount.id] = this.newAccount
      this.editing = false
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
  background-color rgba(yellow,.1);
</style>
