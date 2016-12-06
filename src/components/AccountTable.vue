<template lang="html">
  <div class="columns">
    <div class="column is-8 is-offset-2">

      <transition
        appear
        appear-class="ciccio2"
        appear-active-class="animated fadeIn"
      >
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
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tfoot>
          <tbody>

            <tr v-for="account in accounts" :key="account['.key']">
              <td>{{account.name}}</td>
              <td>{{account.usernameEmail}}</td>
              <td>{{account.note}}</td>
              <td>****{{account.password}}</td>
              <td class="is-icon">
                <a
                  :class="{'is-disabled': disabled, 'is-dimmed': dimmed}"
                  @click.prevent="editAccount(account) && disabled == true"
                  href="#"
                >
                  <i class="fa fa-edit"></i>
                </a>
              </td>
              <td class="is-icon">
                <a
                  :class="{'is-disabled': disabled, 'is-dimmed': dimmed}"
                  @click.prevent="removeAccount(account)"
                  href="#"
                >
                  <i class="fa fa-remove"></i>
                </a>
              </td>
            </tr>

          </tbody>
        </table>
      </transition>

    </div>
  </div>
</template>

<script>
import {accountsRef} from '../fireconfig'
import {accountBus} from '../main'

export default {
  name: 'AccountTable',

  firebase: {
    accounts: accountsRef
  },

  created () {
    accountBus.$on('editedAccount', (account) => {
      this.disabled = account.disabled
      this.dimmed = account.dimmed
    })
  },

  data () {
    return {
      visibility: 'all',
      disabled: false,
      dimmed: false
    }
  },

  methods: {
    removeAccount (account) {
      this.$firebaseRefs.accounts.child(account['.key']).remove()
    },

    editAccount (account) {
      this.visibility = 'edit'
      this.disabled = true
      this.dimmed = true
      const editAccount = account
      editAccount.editing = true
      accountBus.$emit('editAccount', editAccount)
    }
  }
}
</script>

<style lang="css">
.is-dimmed {
  opacity: 0.3;
}
</style>
