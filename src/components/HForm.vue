<template lang="html">
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <form v-on:submit.prevent="editMode ? updateAccount(account) : addAccount()">
        <div class="control is-horizontal">
          <input
            autofocus
            autocomplete="off"
            class="input"
            type="text"
            required
            placeholder="Name"
            v-model.trim="account.name"
          />

          <input
            autocomplete="off"
            class="input"
            type="text"
            required
            placeholder="Username/Email"
            v-model.trim="account.usernameEmail"
          />

          <input
            class="input"
            type="text"
            placeholder="Notes"
            v-model.trim="account.note"
          />

          <input
            autocomplete="off"
            class="input"
            type="text"
            required
            placeholder="Password"
            v-model.trim="account.password"
          />

          <p className="control">
            <button
              type="submit"
              class="button is-outlined is-success">
                {{ editMode ? 'UPDATE' : 'CREATE'}}
            </button>
          </p>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import {accountsRef} from '../fireconfig'
import {accountBus} from '../main'

export default {
  name: 'hForm',

  data () {
    return {
      editMode: false,
      account: {}
    }
  },

  firebase: {
    accounts: accountsRef
  },

  created () {
    accountBus.$on('editAccount', (account) => {
      this.account = account
      this.editMode = true
    })
  },

  methods: {

    addAccount () {
      this.$firebaseRefs.accounts.push({
        name: this.account.name,
        usernameEmail: this.account.usernameEmail,
        password: this.account.password,
        notes: this.account.notes || null,
        editing: false
      })
      this.account = {}
    },

    updateAccount (account) {
      this.$firebaseRefs.accounts.child(this.account['.key']).set({
        name: this.account.name,
        usernameEmail: this.account.usernameEmail,
        password: this.account.password,
        notes: this.account.notes || null,
        editing: false
      })
      this.editMode = false
      accountBus.$emit('editedAccount', {
        disabled: false,
        dimmed: false
      })
      this.account = {}
    }
  }
}
</script>

<style lang="css">
</style>
