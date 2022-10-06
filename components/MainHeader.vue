<template>

  <div>
    <nav class="seonav hide_all">
      <a :href="`${ site_url }/stay`" title="Stay">Stay</a>
      <a :href="`${ site_url }/nosara`" title="Nosara">Nosara</a>
      <a :href="`${ site_url }/work`" title="Work">Work</a>
    </nav>

    <header class="waBtns ease2">
      <HeaderContent />
    </header>
    <div class="sticky-header ease2">
      <HeaderContent />

      <span v-if="currentRoute != 'reserve'" class="mobileBooking mobi"><span class="distributor"><span class="nav_itm center_col up_case ease button"><span>book</span></span></span></span>
    </div>

    <div class="c-menu js-menu mobi">
      <div class="c-menu__inner js-menu-inner">
        <div class="c-menu-primary">
          <div class="c-menu-primary__inner">
            <div class="c-menu-primary__scroll-wrapper">
              <div class="c-menu-primary__scroll">
                <div class="c-menu-primary__nav">

                  <span class="menu-item">
                    <NuxtLink to="/stay">
                      <span class="nav_itm ease" >
                        <span><!--{{ (index+1) }}.--></span>
                        <span class="up_case">stay</span>
                      </span>
                    </NuxtLink>
                  </span>
                  <span class="menu-item">
                    <NuxtLink to="/nosara">
                      <span class="nav_itm ease" >
                        <span><!--{{ (index+1) }}.--></span>
                        <span class="up_case">nosara</span>
                      </span>
                    </NuxtLink>
                  </span>
                  <span class="menu-item">
                    <NuxtLink to="/work">
                      <span class="nav_itm ease" >
                        <span><!--{{ (index+1) }}.--></span>
                        <span class="up_case">work</span>
                      </span>
                    </NuxtLink>
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div class="burger_btn ease mobi" @click="toggleClass()"><i><span></span><span></span><span></span></i><span><span>Menu</span><span>Close</span></span></div>

  </div>

</template>

<script>

export default {
  name: 'MainHeader',
  components: {},
  data() {
    return {
      api_url: this.$config.baseURL,
      site_url: 'https://senderonosara.com',
      currentRoute: this.$route.name.toLowerCase()
    }
  },
  mounted() {},
  methods: {
    toggleClass() {
      if(!document.body.classList.contains('menu-open')) {document.body.classList.add('menu-open');}
      else if(document.body.classList.contains('menu-open')) {document.body.classList.remove('menu-open');}
    },
    sorting(a, b) {
      return (a.order < b.order)? -1 : 1;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {width: 100vw;position: fixed;z-index: 1001;top: 0;left: 0;opacity: 1;}
  .sticky-header {width: 100vw;position: fixed;z-index: 1001;top: 0;left: 0;opacity: 1;background: #fff;-webkit-transform: translateY(-180%);-moz-transform: translateY(-180%);transform: translateY(-180%);}


  .burger_btn {position: fixed;top: 30px;left: 0;z-index: 1005;padding: 10px;cursor: pointer;}
  .burger_btn i {width: 24px;height: 20px;position: relative;top: calc(50% - 10px);display: inline-block;}
  .burger_btn i span {height: 2px;position: absolute;right: 0;top: calc(50% + 1px);background: #fff;-webkit-border-radius: 2px;-moz-border-radius: 2px;border-radius: 2px;transition: .3s ease;}
  .burger_btn i span:nth-child(1) {width: 52%;margin-top: -5px;}
  .burger_btn i span:nth-child(2) {width: 70%;}
  .burger_btn i span:nth-child(3) {width: 38%;margin-top: 5px;}
  .burger_btn > span {width: 50px;height: 24px;overflow: hidden;position: relative;margin-left: 10px;top: calc(50% - 12px);font-size: 12px;color: #fff;line-height: 24px;display: inline-block;text-transform: uppercase;}
  .burger_btn > span span {font-size: inherit;line-height: inherit;color: inherit;display: block;transition: transform .3s ease, color .2s ease;}
  .burger_btn > span span:nth-child(2) {position: absolute;top: 0;left: 0;transform: translateY(100%);transition: transform .3s ease, color .2s ease;}
  body.menu-open .burger_btn > span span:nth-child(1) {transform: translateY(-100%);}
  body.menu-open .burger_btn > span span:nth-child(2) {transform: translateY(0);}
  body.menu-open .burger_btn i span:nth-child(2) {width: 0;left: 50%;}
  body.menu-open .burger_btn i span:nth-child(1) {width: 100%;margin-top: 0;transform: rotate(-45deg);}
  body.menu-open .burger_btn i span:nth-child(3) {width: 100%;margin-top: 0;transform: rotate(45deg);}

  .mobileBooking.mobi .nav_itm.button {position: absolute;top: calc(50% - 18px);right: 4vw;color: #242c1d;border-color: #242c1d;padding: 0 15px;height: 36px;font-size: 12px;}
  body:not(.mobile) .mobileBooking.mobi .nav_itm.button:hover {color: #fff;}

  .c-menu {position: fixed;top: 0;left: 0;width: 100vw;height: 0;z-index: 600;overflow: hidden;transition: height .6s cubic-bezier(0.150, 0.405, 0.395, 0.825);}
  .c-menu__inner {display: flex;height: 100vh;padding-top: 75px;background-color: #fff;}
  .c-menu-primary {flex: 1;}
  .c-menu-primary__inner {padding: 0 4vw;height: 100%;}
  .c-menu-primary__scroll-wrapper {position: relative;overflow: hidden;height: 100%;}
  .c-menu-primary__scroll {display: flex;flex-direction: column;overflow-y: scroll;width: calc(100% + 30px);padding: 0 30px 0 0;height: 100%;}
  .c-menu-primary__nav {padding: 50px 0 0 0;min-height: 55vh;}
  .c-menu-primary__nav .nav_itm {display: inline-flex;align-items: flex-end;color: #242c1d;margin: 0 0 30px;}
  .c-menu-primary__nav .nav_itm span:nth-child(1) {font: 16px rector;margin: 0 20px 5px 0;color: inherit;}
  .c-menu-primary__nav .nav_itm span:nth-child(2) {font: 22px/.8em rector;text-transform: uppercase;color: inherit;}
  .menu-item {display: block;}
  .menu-item a {text-decoration: none;}
  .c-menu-primary-footer {padding: 30px 0;}
  .c-menu-primary-footer h6 {margin: 0 0 1.5em 0;font-size: 12px;line-height: 1.1em;color: #B9B2A1;text-transform: uppercase;}
  .c-menu-primary-footer strong {margin: 0 0 1em 0;font-size: 14px;color: #242c1d;font-weight: 700;}
  .c-menu-primary-footer address {font-size: 14px;line-height: 1.5em;color: #242c1d;font-style: normal;}


  body.menu-open header,
  body.sticky--visible header {transform: translateY(-180%);}
  body.menu-open .sticky-header,
  body.sticky--visible .sticky-header {transform: translateY(0);}
  body.menu-open .burger_btn,
  body.sticky--visible .burger_btn {top: 11px;}
  body.menu-open .burger_btn i span,
  body.sticky--visible .burger_btn i span {background: #242c1d;}
  body.menu-open .burger_btn > span,
  body.sticky--visible .burger_btn > span {color: #242c1d;}
  body.menu-open .c-menu {height: 100vh;}


</style>
