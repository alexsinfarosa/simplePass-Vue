<template>
  <div class="columns animated">
    <div class="column is-6 is-offset-3">

      <transition
        appear
        appear-class="ciccio"
        appear-active-class="animated fadeInLeft"
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
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style>
.simple-pass {
  font-size: 50px;
}
.pass {
  color: #ff3860;
}

</style>
