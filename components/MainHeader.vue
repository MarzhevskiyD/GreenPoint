<template>

  <div>
    <header>
      <div class="content_grid disp_row_between">
        <div class="center_col">
          <span class="gp-logo"></span>
        </div>
        <div class="center_col">
          <div class="pseudonav disp_row">
            <div class="center_col">
              <span class="nav-itm up_case ease" @click="callMenu()">/packages</span>
            </div>
            <div class="center_col">
              <span class="nav-itm up_case ease">/start a project</span>
            </div>
          </div>
        </div>
      </div>
    </header>


<!--    <div class="burger_btn ease mobi" @click="toggleClass()"><i><span></span><span></span><span></span></i><span><span>Menu</span><span>Close</span></span></div>-->
    <div class="menu ease2">
      <div class="content_grid">
        <div class="disp_row_between">
          <div class="closing_overlay" @click="closeMenu()"></div>
          <span class="gp-logo" @click="closeMenu()"></span>
          <div class="menu-frames disp_row" id="framesHolder"></div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'MainHeader',
  components: {},
  data() {
    return {
      api_url: this.$config.baseURL,
    }
  },
  mounted() {},
  methods: {
    callMenu() {
      if(!document.body.classList.contains('menu-open')) {document.body.classList.add('menu-open');}
    },

    closeMenu() {
      if(document.body.classList.contains('menu-open')) {
        document.body.classList.add('menu-closing');

        setTimeout(function() {
          document.body.classList.remove('menu-open');
          document.body.classList.remove('menu-closing');
        }, 500);
      }
    },

    sorting(a, b) {
      return (a.order < b.order)? -1 : 1;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {width: 100vw;height: 16vh;position: absolute;z-index: 10;top: 84vh;left: 0;opacity: 1;-webkit-transition: margin-top .5s ease, height .5s ease;-moz-transition: margin-top .5s ease, height .5s ease;transition: margin-top .5s ease, height .5s ease;}
  body.sticky:not(.menu-open) header {position: fixed;z-index: 1000;top: -150px;background: #000;height: 10vh;margin-top: 150px;}
  header .content_grid {display: flex;}
  .gp-logo {width: 33vh;height: 6vh;display: block;position: relative;}
  .gp-logo:before {width: 6vh;height: 100%;position: absolute;top: 0;left: 0;display: block;content: "";background: url('~/assets/images/gp-logo.svg') left center no-repeat;background-size: contain;}
  .gp-logo:after {width: calc(100% - 12vh);height: 100%;position: absolute;top: 0;left: 8vh;display: block;content: "";background: url('~/assets/images/gp-name.svg') left 70% no-repeat;background-size: contain;-webkit-transition: .3s ease;-moz-transition: .3s ease;transition: .3s ease;}
  body.sticky header .gp-logo:after {width: 0;opacity: 0;}

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

  .pseudonav {height: 4vh;}
  .pseudonav .nav-itm {cursor: pointer;margin-left: 1.5vw;font-size: 1.2vw;color: #e9cbab;}
  body:not(.mobile) .pseudonav .nav-itm:hover {color: #000;}
  body:not(.mobile).sticky .pseudonav .nav-itm:hover {color: #c14e23;}





</style>
