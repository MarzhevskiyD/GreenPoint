<template>
  <div>
    <div class="slidebarHolder">
      <div class="slidebarContent" id="cnt">
        <div class="blockContent detectVisibility" data-view="0" id="firstTouch">
          <span class="gp-logo mobile"></span>
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

        <div class="deepBlock" id="brandingPack">
          <div class="swiper mySwiper" id="brPack">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="disp_row">
                  <div class="grid-cont">
                    <div v-for="(itm, index) in brandingPack.logos" :key="index" class="grid-cell">
                      <div class="img_holder"><img :src="`${api_url + itm.url}`" alt="" title=""></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="deepBlock" id="campaignsPack">
          <div class="swiper mySwiper" id="campPack">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="disp_row">
                  <div v-for="(itm, index) in campPack.images" :key="index" class="camp-item">
                    <div class="img_holder"><img :src="`${api_url + itm.url}`" alt="" title=""></div>
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
      brandingPack: [],
      campPack: [],
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
        'BrandingPack',
        'BrandingPack.logos',
        'CampaignsPack',
        'CampaignsPack.images',
      ]
    },{
      encodeValuesOnly: true
    });

    const getPacksInfo = await fetch(`${this.$config.apiURL}/packages-info?` + extdQuery)
    const content = await getPacksInfo.json()

    this.growthPack = content.data.GrowthPack
    this.webPack = content.data.WebPack
    this.brandingPack = content.data.BrandingPack
    this.campPack = content.data.CampaignsPack
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
 #deep[data-target="webPack"] #webPack,
 #deep[data-target="brandingPack"] #brandingPack,
 #deep[data-target="campaignsPack"] #campaignsPack {display: block;}
 .pack-title {display: block;font: 4vw/1 casual;color: #e9cbab;width: 38vw;padding-top: 5vh;padding-bottom: 10vh;}
 .grid-cont {display: grid;grid-auto-flow: column;grid-template-columns: 1fr 1fr;grid-template-rows: 16vw 16vw;/*grid-template-columns: repeat(2, 1fr);grid-template-rows: repeat(2, 1fr);*/position: relative;}
 .grid-cont:before {width: 1px;height: 100%;display: block;position: absolute;top: 0;left: 48%;background: #322b24;}
 .pack-title + .grid-cont {margin-left: 9vw;}
 .grid-cell {width: 23vw;padding: 5vh 20px;display: grid;position: relative;border-left: 1px solid #322b24;}
 .grid-cell:before {width: 88%;height: 1px;position: absolute;top: 0;left: 6%;display: block;content: "";background: #322b24;}
 .grid-cell:nth-of-type(1),
 .grid-cell:nth-of-type(2) {border-left: none;}
 .grid-cell:nth-of-type(odd):before {display: none;}
 .grid-cell .img_holder {width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: center;}
 .grid-cell .img_holder img {width: 100%;height: auto;}
 .deep-title {display: block;font-size: 1.6vw;font-weight: 600;color: #e9cbab;}
 .deep-text {display: block;font-size: 1.6vw;color: #fff;margin: 20px 0 0;padding: 0;}
 .deepBlock .swiper {width: 100%;height: 100%;position: relative;z-index: 5;}
 .deepBlock .swiper .swiper-slide {width: auto;height: 100%;padding: 10vw 6vw;}
 #webPack .swiper .swiper-slide .disp_row {display: block;}
 #webPack .swiper .swiper-slide .disp_row > div {float: left;max-height: 100%;}
 .swiper-slide {width: auto;}
 .swiper-pagination {width: 290px;height: 2px;top: auto;bottom: 82px;left: calc(6vw + 80px);z-index: 10;background: #1b1814;position: absolute;}
 .swiper-pagination span {display: block;height: 100%;position: absolute;top: 0;left: 0;background: #e9cbab;}

 .close_deep-dive {width: 46px;height: 46px;position: absolute;bottom: 62px;left: 6vw;cursor: pointer;z-index: 10;background: #e9cbab;-webkit-border-radius: 100%;-moz-border-radius: 100%;border-radius: 100%;}
 .close_deep-dive:before {width: 26px;height: 2px;position: absolute;top: calc(50% - 1px);left: calc(50% - 13px);display: block;content: "";background: #000;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);transform: rotate(-45deg);}
 .close_deep-dive:after {width: 26px;height: 2px;position: absolute;top: calc(50% - 1px);left: calc(50% - 13px);display: block;content: "";background: #000;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);transform: rotate(45deg);}

 #webPack .pack-title {width: auto;}
 #webPack .img_holder {margin: 0 10vw;}
 #webPack .img_holder,
 #webPack .img_holder img {width: auto;height: 100%;max-height: 70vh;}

 .gp-logo.mobile {display: none;}

 .camp-item {height: 90%;}
 .camp-item:last-child {margin-right: 0;}
 .camp-item .img_holder {height: 100%;display: flex;flex-direction: column;}
 .camp-item .img_holder img {max-width: 24vw;max-height: 70vh;height: auto;margin-right: 4vw;object-fit: contain;}
 .camp-item:nth-child(2) .img_holder,
 .camp-item:nth-child(8) .img_holder,
 .camp-item:nth-child(11) .img_holder,
 .camp-item:nth-child(17) .img_holder {flex-direction: column-reverse;}
 .camp-item:nth-child(2) .img_holder img,
 .camp-item:nth-child(11) .img_holder img {margin-bottom: 3vw;}
 .camp-item:nth-child(6) .img_holder img,
 .camp-item:nth-child(15) .img_holder img {margin-top: 3vw;}


 @media screen and (min-width: 320px) and (max-width: 1280px) {
   h1 {font-size: 6vh;}
   .close_deep-dive {width: 36px;height: 36px;bottom: 18vh;left: 4.2vw;}
   .close_deep-dive:before,
   .close_deep-dive:after {width: 20px;left: calc(50% - 10px);}
   .swiper-pagination {width: 240px;bottom: 20vh;left: calc(4.2vw + 60px);}
   .deepBlock .swiper .swiper-slide > div {height: 80vh;padding: 20vh 0;}
   .deepBlock .swiper .swiper-slide .disp_row {justify-content: flex-start;}
   .grid-cont {grid-template-rows: 14vh 14vh;}
   .grid-cell {width: 54vw;padding: 0 20px;}
   #growthPack .grid-cell {padding: 5vw 20px;}
   #growthPack .grid-cont {grid-template-rows: 18vh 14vh;}
   #webPack .img_holder,
   #webPack .img_holder img {max-height: 50vh;}
   .deep-title {font-size: 1.8vh;}
   .deep-text {font-size: 1.6vh;}
   .camp-item .img_holder img {max-width: 45vw;margin-right: 7vw;}

 }

 @media screen and (min-width: 320px) and (max-width: 767px) {
   h1 {line-height: 0.8;}
   .pack-title {width: 50vw;font-size: 5.5vw;}
   .deep-title {font-size: 2.4vh;}
   .deep-text {font-size: 1.8vh;}
   .gp-logo.mobile {display: block;width: 50vw;height: 6vh;position: absolute;top: 7vw;left: 4.2vw;z-index: 4;}
   .gp-logo:before {width: 5vh;}
   .gp-logo:after {width: calc(100% - 8vh);left: 7vh;background-position: left 60%;}
 }

 @media screen and (min-width: 768px) and (max-width: 1280px) {
   h1 {font-size: 8vh;}
   .camp-item .img_holder img {max-width: 28vw;margin-right: 5vw;}
 }


</style>
