<template>
  <div id="pageCont">


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
</template>

<script>
export default {
  name: "default",
  mounted() {
    document.addEventListener('ready', this.touchStart);
  },
  methods: {
    beforeEnter() {

    },

    touchStart() {
      console.log('ready')
      const routeName = $nuxt.$route.name

      if(routeName == 'start') {
        document.body.classList.add('start-page')
      }
    }
  },

}
</script>

<style scoped>

</style>
