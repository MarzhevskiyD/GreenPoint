<template>
  <div>
    <div class="blockContent detectVisibility header--white" data-view="0">
      <div class="back_poster"><img id="topImage" :src="`${topImage}`" alt="" title="" preload @load="runView"></div>
      <div class="content_grid">
        <topScreenMobileContent />
        <topScreenOpeningBlock v-if="firstImpact.showOpening" />
      </div>
    </div>

    <LazyHydrate ssr-only>
      <LazyIndex/>
    </LazyHydrate>
  </div>
</template>

<script>
import qs from 'qs'
import LazyHydrate from 'vue-lazy-hydration';


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
      firstImpact: '',
      seoData: [],
      seoTitle: '',
    }
  },
  head() {
    return {
      title: this.seoTitle,
      meta: this.seoData,
    }
  },
  async mounted() {
    const extendedQuery = qs.stringify({
      populate: [
        'topImage',
        'seo',
        'seo.metaImage',
        'data.showOpening',
      ]
    },{
      encodeValuesOnly: true
    });

    const getTopImage = await this.$axios.get(`${this.$config.apiURL}/home-page?` + extendedQuery)

    this.firstImpact = getTopImage.data.data
    this.topImage = this.api_url + this.firstImpact.topImage.url


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
        this.seoTitle = 'SenderoNosara - Home page'
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
@media screen and (min-width: 320px) and (max-width: 1280px) {
  .blockContent[data-view="0"] {margin-bottom: 4vw;}
}


</style>
