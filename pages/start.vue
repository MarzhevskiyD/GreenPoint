<template>
  <div class="start-page">

    <div class="blockContent detectVisibility" data-view="0" id="firstTouch">
      <span class="gp-logo mobile"></span>
      <div class="background_layer" :style="{ backgroundImage: `url(${topImage})` }"></div>
      <div class="content_grid">
        <section class="center_col">
          <div class="pageTitle_block">
            <span v-sanitize="pageContent.blockName" class="blockName"></span>
            <h1 v-sanitize="$text.handleNewLineWrapped(pageContent.blockTitle)" class="up_case hideLiner massive blockTitle"></h1>
          </div>
        </section>
      </div>
    </div>

    <div v-if="pageContent.Services" class="blockContent detectVisibility" data-view="2">
      <div class="content_grid">
        <div class="services_list">
          <div class="columns short_container">
            <div class="column menu_fade">
              <ol class="plus_list">
                <li v-for="(service, index) in pageContent.Services" :key="index">
                  <span class="service-itm ease2" @click="runQuestionnaire(service.formLink)">
                    <span v-sanitize="service.title" class="serv-title"></span>
                    <span class="more hide_mobi"></span>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>


    <MainHeader />

    <div id="questionnaire_box" class="ease2"></div>

  </div>
</template>


<script>
import qs from 'qs'


export default {
  name: 'StartView',
  components: {},
  data() {
    return {
      api_url: this.$config.baseURL,
      topImage: '',
      firstImpact: '',
      pageContent: '',
      seoData: [],
      seoTitle: '',
      backgroundImage: 'background-image'
    }
  },
  head() {
    return {
 //     title: this.seoTitle,
 //     meta: this.seoData
    }
  },
  computed: {},
  async mounted() {
    const extendedQuery = qs.stringify({
      populate: [
        'background',
        'Services'
      ]
    },{
      encodeValuesOnly: true
    });


    const getPageInfo = await fetch(`${this.$config.apiURL}/start?` + extendedQuery)
    const content = await getPageInfo.json()

    this.pageContent = content.data
    this.topImage = this.api_url + this.pageContent.background.url


    // build seo
    const _this = this
    const seoInf = _this.firstImpact.seo;
    // if(seoInf) {
    //   if(seoInf.metaTitle) {
    //     this.seoTitle = seoInf.metaTitle
    //     const metaSiteName = {hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: seoInf.metaTitle}
    //     const metaMobileTitle = {hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: seoInf.metaTitle}
    //     const metaItem = {hid: 'title', name: 'title', property: 'title', content: seoInf.metaTitle}
    //     const ogMetaItem = {hid: 'og:title', name: 'og:title', property: 'og:title', content: seoInf.metaTitle}
    //     this.seoData.push(metaItem)
    //     this.seoData.push(metaSiteName)
    //     this.seoData.push(metaMobileTitle)
    //     this.seoData.push(ogMetaItem)
    //   }
    //   else {
    //     this.seoTitle = 'GreenPoint agency'
    //   }
    //
    //   if(seoInf.metaDescription) {
    //     const metaItem = {hid: 'description', name: 'description', property: 'description', content: seoInf.metaDescription}
    //     const ogMetaItem = {hid: 'og:description', name: 'og:description', property: 'og:description', content: seoInf.metaDescription}
    //     this.seoData.push(metaItem)
    //     this.seoData.push(ogMetaItem)
    //   }
    //
    //   if(seoInf.keywords) {
    //     const metaItem = {hid: 'keywords', name: 'keywords', property: 'keywords', content: seoInf.keywords}
    //     const ogMetaItem = {hid: 'og:keywords', name: 'og:keywords', property: 'og:keywords', content: seoInf.keywords}
    //     this.seoData.push(metaItem)
    //     this.seoData.push(ogMetaItem)
    //   }
    //
    //   if(seoInf.metaImage) {
    //     const ogMetaItem = {hid: 'og:image', name: 'og:image', property: 'og:image', content: this.api_url + seoInf.metaImage.url}
    //     this.seoData.push(ogMetaItem)
    //   }
    // }
  },
  methods: {
    runView() {
      document.getElementById('topImage').classList.add('ready');
    },

    runQuestionnaire(target) {
      if(target) {
        const ifrm = document.createElement('iframe');

        ifrm.setAttribute('src', target);

        document.getElementById('questionnaire_box').appendChild(ifrm);
        document.body.classList.add('questions');
      }
    }

  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blockContent[data-view="0"] {height: 100vh;min-height: 550px;}
  .blockContent[data-view="2"] {background: #000;}
  .background_layer {width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 1;background-size: cover;background-position: center bottom;background-repeat: no-repeat;}
  h1 {font: 6vw/1 casual;color: #e9cbaa;}
  body.start .content_grid section {position: relative;}
  .pageTitle_block {position: absolute;bottom: 0;left: 0;}
  .blockName {display: block;font-size: 3.5vw;font-weight: 300;color: #c14e23;}
  .blockTitle {display: block;font: 14vw/1 casual;color: #e9cbab;}

  .short_container {display: flex;max-width: 90vw;padding: 0 5vw;margin: 0 auto;}
  .column {display: block;flex-basis: 0;flex-grow: 1;flex-shrink: 1;}
  ol.plus_list {line-height: 1.2;list-style-type: none;counter-reset: compteListe;padding-right: 10vw;}
  ol.plus_list li {position: relative;border-bottom: 1px solid #473d34;}
  ol.plus_list li:before {counter-increment: compteListe 1;opacity: .5;content: "0" counter(compteListe);position: absolute;font-size: 1vw;top: 2vw;right: 105%;color: #e9cbab;}
  .service-itm {cursor: pointer;color: #fff;padding: 2% 0;display: block;opacity: 1;}
  .service-itm .serv-title {margin-top: 0;font-size: 2.4vw;color: #e9cbab;padding-bottom: 1.5vw;display: block;}
  .service-itm .more {width: 30px;height: 30px;position: absolute;right: 0;top: 1.3vw;}
  .service-itm .more:before {width: 100%;height: 2px;position: absolute;top: calc(50% - 1px);left: 0;content: "";background: #473d34;}
  .service-itm .more:after {width: 100%;height: 2px;position: absolute;top: calc(50% - 1px);left: 0;content: "";background: #473d34;-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);transform: rotate(-90deg);}

  .gp-logo.mobile {display: none;}


  @media screen and (min-width: 320px) and (max-width: 1280px) {
    .blockContent {padding: 8vw 0;}
    .blockName {font-size: 6vw;}
    .blockTitle {font-size: 7.5vh;}
    .background_layer {background-position:  60% bottom;}
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    .blockTitle {line-height: 0.8;position: relative;z-index: 2;}
    .blockName {padding-bottom: 10px;}
    .short_container {padding: 0;}
    ol.plus_list {padding: 0 0 80px 0px;}
    .service-itm {padding: 20px 0;}
    .service-itm .serv-title {font-size: 24px;}
  }

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    .blockName {font-size: 3vh;}
    .blockTitle {font-size: 12vw;}
    .service-itm .more {width: 20px;height: 20px;display: block !important;}

  }

  @media screen and (min-width: 1281px) {
    .blockContent {padding: 2vw 0;}
  }



</style>
