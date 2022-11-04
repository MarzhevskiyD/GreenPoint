<template>

  <div>
    <header>
      <div class="content_grid disp_row_between">
        <div class="center_col">
          <span class="gp-logo showMain" @click="toTop()"></span>
          <nuxt-link to="/" class="gp-logo hideMain"></nuxt-link>
        </div>
        <div class="center_col">
          <div class="pseudonav disp_row">
            <div class="center_col hide-start">
              <span class="nav-itm up_case ease" @click="callMenu()">/packages</span>
            </div>
            <div class="center_col hide-start">
              <nuxt-link to="/start" class="nav-itm up_case ease">/start a project</nuxt-link>
            </div>
            <div class="center_col show-mobile">
              <span class="go_back ease" @click="closeQuestionnaire()">go back</span>
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
      api_url: this.$config.baseURL
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
    },

    closeQuestionnaire() {
      document.body.classList.add('fadeOut_questions');

      setTimeout(function() {
        document.getElementById('questionnaire_box').querySelectorAll('iframe').forEach(
          function(elem) {
            elem.parentNode.removeChild(elem);
          });
        document.body.classList.remove('questions');
        document.body.classList.remove('fadeOut_questions');
      }, 550);
    },

    toTop() {
      let scrollToTop = window.setInterval(function() {
        const pos = window.pageYOffset;

        if(pos > 0) {
          window.scrollTo(0, pos - 35);
        }
        else {
          window.clearInterval(scrollToTop);
        }
      }, 1);
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {width: 100vw;height: 16vh;position: absolute;z-index: 10;top: 84vh;left: 0;opacity: 1;-webkit-transition: margin-top .5s ease, height .5s ease;-moz-transition: margin-top .5s ease, height .5s ease;transition: margin-top .5s ease, height .5s ease;}
  body.sticky:not(.menu-open) header {position: fixed;z-index: 1000;top: -150px;background: #000;height: 10vh;margin-top: 150px;}
  header .content_grid {display: flex;}

  body.index .hideMain {display: none;}
  body.index .showMain {display: block;}
  body:not(.index) .showMain {display: none;}

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

  .start-page .hide-start {display: none !important;}


  .go_back {z-index: 5;position: relative;cursor: pointer;font-size: 1.5vw;color: #e9cbab;padding-left: 40px;display: inline-block;}
  .go_back:before {width: 20px;height: 100%;position: absolute;top: 0;left: 0;content: "";background: url('~/assets/images/right_arrow-light.svg') right center no-repeat;background-size: contain;-webkit-transform: rotate(-180deg);-moz-transform: rotate(-180deg);transform: rotate(-180deg);}
  body:not(.mobile) .go_back:hover {opacity: .8;}
  body:not(.questions) .show-mobile {display: none;}



  @media screen and (min-width: 320px) and (max-width: 1280px) {
    .pseudonav {margin-top: 5px;}
    .pseudonav .nav-itm {font-size: 3vw;margin-left: 4vw;}
    .go_back {font-size: 4vw;}
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    body:not(.sticky) header .gp-logo {display: none;}
    .pseudonav .nav-itm {font-size: 4vw;margin-left: 7vw;}
    header {height: 11vh;}
  }

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    .pseudonav .nav-itm {font-size: 1.6vh;}
    .go_back {font-size: 2.5vw;}
  }




</style>
