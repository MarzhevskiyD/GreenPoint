<template>
  <div id="pageBox">
    <div id="pageOver"></div>
    <div id="pageCont">
      <MainHeader />

      <client-only>
        <div class="pageContent">
          <div class="landing_wrap">
            <router-view v-slot="{ Component, route }">
              <transition name="overlay" mode="out-in">
                <div :key="route.name">
                  <Nuxt :is="Component" />
                </div>
              </transition>
            </router-view>
          </div>
        </div>
      </client-only>

      <MainFooter />
    </div>
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
