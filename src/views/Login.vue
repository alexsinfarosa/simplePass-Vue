<template lang="html">
  <div>
    <transition
      appear
      appear-class="ciccio2"
      appear-active-class="animated fadeInLeft"
    >
      <logo></logo>
    </transition>

    <router-link
      to="/user/:id"
      class="button is-success is-outlined is-large"
      v-on:click.native=""
    >
      LOG IN
    </router-link>
</div>
</template>

<script>
// COMPONENTS
import Logo from '../components/Logo'

export default {
  name: 'Login',

  components: {
    Logo
  }

}
</script>

<style lang="css">
</style>
