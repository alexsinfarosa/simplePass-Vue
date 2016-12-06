<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</section>

</div>
</template>

<script>
export default {
  name: 'App'
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

.border
  border: 1px solid black
</style>
