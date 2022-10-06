<template>
  <div>
    <div class="slidebarHolder">
      <div class="slidebarContent" id="cnt">
        <div class="blockContent detectVisibility" data-view="0" id="firstTouch">
          <div class="back_poster"><img id="topImage" :src="`${topImage}`" alt="" title="" preload @load="runView"></div>
          <div class="content_grid">
            <section class="center_col">
              <h1 v-sanitize="$text.handleNewLineWrapped(mainTitle)" class="up_case hideLiner huge"></h1>
            </section>
          </div>
        </div>

        <LazyHydrate ssr-only>
          <LazyIndex/>
        </LazyHydrate>
      </div>

      <div class="deep-dive" id="deep" data-target="">
        <div class="deepBlock" id="growthPack">
          <div class="swiper mySwiper" id="grPack">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="disp_row">
                  <p v-sanitize="$text.handleNewLineWrapped(growthPack.title)" class="pack-title hideLiner ease up_case"></p>
                  <div class="grid-cont">
                    <div v-for="(itm, index) in growthPack.infoBlocks" :key="index" class="grid-cell">
                      <span class="deep-title">{{ itm.title }}</span>
                      <p class="deep-text">{{ itm.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="deepBlock" id="webPack">
          <div class="swiper mySwiper" id="auPack">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="disp_row">
                  <div class="center_col">
                    <p v-sanitize="$text.handleNewLineWrapped(webPack.title)" class="pack-title hideLiner ease up_case"></p>

                    <div v-if="webPack.askTitle || webPack.askText">
                      <span class="deep-title">{{ webPack.askTitle }}</span>
                      <p v-sanitize="$text.handleNewLine(webPack.askText)" class="deep-text"></p>
                    </div>
                  </div>
                  <div v-if="webFirstImg">
                    <div class="img_holder"><img :src="`${api_url + webFirstImg}`" alt="" title=""></div>
                  </div>
                  <div v-if="webPack.considerationTitle || webPack.considerationText" class="center_col">
                    <span class="deep-title">{{ webPack.considerationTitle }}</span>
                    <p v-sanitize="$text.handleNewLine(webPack.considerationText)" class="deep-text"></p>
                  </div>
                  <div v-if="webSecondImg">
                    <div class="img_holder"><img :src="`${api_url + webSecondImg}`" alt="" title=""></div>
                  </div>
                  <div v-if="webPack.approachTitle || webPack.approachText" class="center_col">
                    <span class="deep-title">{{ webPack.approachTitle }}</span>
                    <p v-sanitize="$text.handleNewLine(webPack.approachText)" class="deep-text"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="close_deep-dive ease" @click="$actions.hideSidebar()"></div>
        <div class="swiper-pagination"><span id="deepProgress"></span></div>
      </div>
    </div>
  </div>
</template>


<script>
import qs from 'qs'
import LazyHydrate from 'vue-lazy-hydration'


export default {
  name: 'HomeView',
  components: {
    LazyHydrate,
    LazyIndex: () => import('~/components/lazy/LazyIndex')
  },
  data() {
    return {
      api_url: this.$config.baseURL,
      topImage: '',
      mainTitle: '',
      firstImpact: '',
      seoData: [],
      seoTitle: '',
      growthPack: [],
      webPack: [],
      webFirstImg: '',
      webSecondImg: '',
    }
  },
  head() {
    return {
      title: this.seoTitle,
      meta: this.seoData,
      script: [
        {
          hid: 'swiper',
          src: 'https://unpkg.com/swiper@8/swiper-bundle.min.js',
          mode: 'client',
          callback: () => {
            this.externalLoaded = true;
            this.$sliders.init()
          },
        },
        {
          skip: !this.externalLoaded,
        }
      ]
    }
  },
  computed: {},
  async mounted() {
    const extendedQuery = qs.stringify({
      populate: [
        'topScreen.background'
      ]
    },{
      encodeValuesOnly: true
    });

    const getTopImage = await this.$axios.get(`${this.$config.apiURL}/home?` + extendedQuery)

    this.firstImpact = getTopImage.data.data
    this.mainTitle = this.firstImpact.topScreen.title
    this.topImage = this.api_url + this.firstImpact.topScreen.background.url


    // get packs info
    const extdQuery = qs.stringify({
      populate: [
        'GrowthPack',
        'GrowthPack.infoBlocks',
        'WebPack',
        'WebPack.firstImage',
        'WebPack.secondImage',
      ]
    },{
      encodeValuesOnly: true
    });

    const getPacksInfo = await fetch(`${this.$config.apiURL}/packages-info?` + extdQuery)
    const content = await getPacksInfo.json()

    this.growthPack = content.data.GrowthPack
    this.webPack = content.data.WebPack
    this.webFirstImg = this.webPack.firstImage.url
    this.webSecondImg = this.webPack.secondImage.url



    // build seo
    const _this = this
    const seoInf = _this.firstImpact.seo;
    if(seoInf) {
      if(seoInf.metaTitle) {
        this.seoTitle = seoInf.metaTitle
        const metaSiteName = {hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: seoInf.metaTitle}
        const metaMobileTitle = {hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: seoInf.metaTitle}
        const metaItem = {hid: 'title', name: 'title', property: 'title', content: seoInf.metaTitle}
        const ogMetaItem = {hid: 'og:title', name: 'og:title', property: 'og:title', content: seoInf.metaTitle}
        this.seoData.push(metaItem)
        this.seoData.push(metaSiteName)
        this.seoData.push(metaMobileTitle)
        this.seoData.push(ogMetaItem)
      }
      else {
        this.seoTitle = 'GreenPoint agency'
      }

      if(seoInf.metaDescription) {
        const metaItem = {hid: 'description', name: 'description', property: 'description', content: seoInf.metaDescription}
        const ogMetaItem = {hid: 'og:description', name: 'og:description', property: 'og:description', content: seoInf.metaDescription}
        this.seoData.push(metaItem)
        this.seoData.push(ogMetaItem)
      }

      if(seoInf.keywords) {
        const metaItem = {hid: 'keywords', name: 'keywords', property: 'keywords', content: seoInf.keywords}
        const ogMetaItem = {hid: 'og:keywords', name: 'og:keywords', property: 'og:keywords', content: seoInf.keywords}
        this.seoData.push(metaItem)
        this.seoData.push(ogMetaItem)
      }

      if(seoInf.metaImage) {
        const ogMetaItem = {hid: 'og:image', name: 'og:image', property: 'og:image', content: this.api_url + seoInf.metaImage.url}
        this.seoData.push(ogMetaItem)
      }
    }
  },
  methods: {
    runView() {
      document.getElementById('topImage').classList.add('ready');
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .blockContent[data-view="0"] {height: 100vh;min-height: 550px;}
 h1 {font: 6vw/1 casual;color: #e9cbaa;}

 .deep-dive {width: 100vw;height: 100vh;background: #000;position: fixed;top: 0;left: 0;z-index: 10;-webkit-transform: translateX(100%);-moz-transform: translateX(100%);transform: translateX(100%);-webkit-transition: 1s ease, opacity .5s ease;-moz-transition: 1s ease, opacity .5s ease;transition: 1s ease, opacity .5s ease;}
 body.sidebarActivated .deep-dive {-webkit-transform: translateX(0);-moz-transform: translateX(0);transform: translateX(0);}
 body.fast-hide .deep-dive {-webkit-transition: .2s ease !important;-moz-transition: .2s ease !important;transition: .2s ease !important;}

 .deepBlock {width: 100%;height: 100%;display: none;}
 .deepBlock .disp_row {height: 100%;}
 .deepBlock .center_col {height: auto;}
 #deep[data-target="growthPack"] #growthPack,
 #deep[data-target="webPack"] #webPack {display: block;}
 .pack-title {display: block;font: 4vw/1 casual;color: #e9cbab;width: 38vw;padding-top: 5vh;padding-bottom: 10vh;}
 .grid-cont {margin-left: 9vw;display: grid;grid-template-columns: repeat(2, 1fr);grid-template-rows: repeat(2, 1fr);position: relative;}
 .grid-cont:before {width: 1px;height: 100%;display: block;position: absolute;top: 0;left: 48%;background: #322b24;}
 .grid-cell {width: 23vw;padding: 5vh 20px;display: grid;position: relative;border-left: 1px solid #322b24;}
 .grid-cell:before {width: 88%;height: 1px;position: absolute;top: 0;left: 6%;display: block;content: "";background: #322b24;}
 .grid-cell:nth-of-type(1),
 .grid-cell:nth-of-type(3) {border-left: none;}
 .grid-cell:nth-of-type(1):before,
 .grid-cell:nth-of-type(2):before {display: none;}
 .deep-title {display: block;font-size: 1.6vw;font-weight: 600;color: #e9cbab;}
 .deep-text {display: block;font-size: 1.6vw;color: #fff;margin: 20px 0 0;padding: 0;}
 .deepBlock .swiper {width: 100%;height: 100%;position: relative;z-index: 5;}
 .deepBlock .swiper .swiper-slide {width: auto;height: 100%;padding: 10vw 6vw;}
 .swiper-slide {width: auto;}
 .swiper-pagination {width: 290px;height: 2px;top: auto;bottom: 82px;left: calc(6vw + 80px);z-index: 10;background: #1b1814;position: absolute;}
 .swiper-pagination span {display: block;height: 100%;position: absolute;top: 0;left: 0;background: #e9cbab;}

 .close_deep-dive {width: 46px;height: 46px;position: absolute;bottom: 62px;left: 6vw;cursor: pointer;z-index: 10;background: #e9cbab;-webkit-border-radius: 100%;-moz-border-radius: 100%;border-radius: 100%;}
 .close_deep-dive:before {width: 26px;height: 2px;position: absolute;top: calc(50% - 1px);left: calc(50% - 13px);display: block;content: "";background: #000;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);transform: rotate(-45deg);}
 .close_deep-dive:after {width: 26px;height: 2px;position: absolute;top: calc(50% - 1px);left: calc(50% - 13px);display: block;content: "";background: #000;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);transform: rotate(45deg);}

 #webPack .pack-title {width: auto;}
 #webPack .img_holder,
 #webPack .img_holder img {width: auto;height: 100%;margin: 0 5vw;}

</style>
