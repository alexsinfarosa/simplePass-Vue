<template>
<div id="app">
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">

        <!-- Header -->
        <div class="columns animated">
          <div class="column is-6 is-offset-3">

            <transition
              appear
              name="ciccio"
            >
              <h1 class="title simple-pass">
                  <strong>Simple</strong>
                  <span class="pass">Pass</span>
              </h1>
            </transition>
            <hr/>
            <br/>
          </div>
        </div>

        <div class="columns" v-if="!loggedIn">
          <div class="column is-8 is-offset-2">
            <button v-on:click="oAuthLogIn" class="button is-success is-large" type="button">LOG IN</button>
          </div>
        </div>

        <div v-else v-cloak>

          <div class="columns">
            <div class="column is-8 is-offset-2">
              <button
                v-on:click="if(Object.keys(newAccount).length === 0) return logOut()"
                class="button is-primary"
                type="button">
                  LOG OUT
              </button>
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
                    autofocus
                    autocomplete="off"
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
                    :class="{selected: true ? newAccount.editing : ''}"
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
                    <button
                      type="submit"
                      class="button is-outlined is-success">
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
import Firebase from 'firebase'
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
      newAccount: {},
      visibility: 'all',
      loggedIn: false,
      focused: false
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
    oAuthLogIn () {
      const that = this
      var provider = new Firebase.auth.GithubAuthProvider()
      Firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken
        console.log(`token:${token}`)
        // The signed-in user info.
        var user = result.user
        console.log(`user:${user.displayName}`)
        that.loggedIn = true
      }).catch(function (error) {
        console.log('You are signed in')
        // Handle Errors here.
        var errorCode = error.code
        console.log(errorCode)
        var errorMessage = error.message
        console.log(errorMessage)
        // The email of the user's account used.
        var email = error.email
        console.log(email)
        // The Firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log(credential)
        that.loggedIn = false
      })
    },

    logOut () {
      const that = this
      that.loggedIn = false
      Firebase.auth().signOut().then(function () {
        console.log('Signed Out')
      }, function (error) {
        that.loggedIn = true
        console.error('Sign Out Error', error)
      })
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
        notes: notes || null,
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
        notes: notes || null
      })
      this.newAccount.editing = false
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
