<template>
  <div id="pageCont">
    <MainHeader />

    <client-only>
      <div class="pageContent">
        <div class="landing_wrap">
          <Nuxt />
        </div>
      </div>
    </client-only>

    <MainFooter />
  </div>
</template>

<script>
export default {
  name: "default",
  methods: {
    beforeEnter() {

    }
  },

}
</script>

<style scoped>

</style>
