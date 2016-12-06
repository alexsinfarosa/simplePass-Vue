<template lang="html">
  <div>

    <logo></logo>
    <accountTable></accountTable>
    <hForm></hForm>

  </div>
</template>

<script>
// COMPONENTS
import Logo from '../components/Logo'
import AccountTable from '../components/AccountTable'
import HForm from '../components/HForm'

export default {
  name: 'User',

  components: {
    AccountTable,
    Logo,
    HForm
  }
}
</script>

<style lang="css">
</style>
