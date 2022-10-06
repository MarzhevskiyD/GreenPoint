<template>
  <div>
    <div v-if="pageContent.jungleBlock && pageContent.jungleBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.jungleBlock.block_internalID">
      <div class="back_art-new hide_mobi"></div>
      <div class="content_grid">
        <div class="columns_grid disp_row_between">
          <div class="center_col stretch">
            <h2 v-sanitize="$text.handleNewLine(pageContent.jungleBlock.title)" class="titlebox up_case underlined"></h2>
            <div class="topicbox hide_mobi">
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.jungleBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
          </div>
          <div class="center_col stretch">
            <div class="mobi space_box"></div>
            <div class="img_holder"><img :src="`${api_url + pageContent.jungleBlock.image.url}`" alt="" title=""></div>
          </div>
          <div class="mobi">
            <div class="topicbox">
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.jungleBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageContent.stayBlock && pageContent.stayBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.stayBlock.block_internalID">
      <div class="back_art leftSide"><svg viewBox="0 0 367 538"><use xlink:href="~/assets/images/jungle_art_left.svg#herb"></use></svg></div>
      <div class="content_grid">
        <h3 v-sanitize="$text.handleNewLine(pageContent.stayBlock.title)" class="titlebox up_case underlined"></h3>

        <div class="columns_grid disp_row_between">
          <div class="center_col ">
            <div class="img_holder mobi"><img :src="`${api_url + pageContent.stayBlock['rightImage_1'].url}`" alt="" title=""></div>
            <div class="topicbox">
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.stayBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
            <div class="btns_holder disp_row_center">
              <NuxtLink v-if="pageContent.stayBlock['ExploreRooms_button']" to="/stay"><span class="button btn spaced center_col ease up_case"><span>Explore rooms</span></span></NuxtLink>
            </div>
    <!--        <div class="img_holder mobi"><img :src="`${api_url + pageContent.stayBlock['rightImage_2'].url}`" alt="" title="" lazy></div>-->
            <div class="img_holder "><img :src="`${api_url + pageContent.stayBlock['leftImage_1'].url}`" alt="" title="" lazy></div>
            <div class="img_holder"><img :src="`${api_url + pageContent.stayBlock['leftImage_2'].url}`" alt="" title="" lazy></div>
    <!--        <div class="img_holder mobi"><img :src="`${api_url + pageContent.stayBlock['leftImage_1'].url}`" alt="" title="" lazy></div>-->
          </div>
          <div class="center_col ">
            <div class="img_holder hide_mobi mainImg"><img :src="`${api_url + pageContent.stayBlock['rightImage_1'].url}`" alt="" title=""></div>
            <div class="img_holder "><img :src="`${api_url + pageContent.stayBlock['rightImage_2'].url}`" alt="" title=""></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageContent.wavesBlock && pageContent.wavesBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.wavesBlock.block_internalID">
      <div class="back_poster"><img :src="`${api_url + pageContent.wavesBlock.background.url}`" alt="" title=""></div>
      <div class="content_grid">
        <div class="columns_grid disp_row_between">
          <div class="center_col stretch hide_mobi"></div>
          <div class="center_col stretch">
            <h2 v-sanitize="$text.handleNewLine(pageContent.wavesBlock.title)" class="titlebox up_case"></h2>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageContent.surfBlock && pageContent.surfBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.surfBlock.block_internalID">
      <div class="back_art"><svg viewBox="0 0 367 538"><use xlink:href="~/assets/images/jungle_art_left.svg#herb"></use></svg></div>
      <div class="content_grid">
        <div class="columns_grid disp_row_between">
          <div class="center_col stretch">
            <div class="img_holder hide_mobi"><img :src="`${api_url + pageContent.surfBlock['leftImage_1'].url}`" alt="" title=""></div>
            <div class="img_holder"><img :src="`${api_url + pageContent.surfBlock['leftImage_2'].url}`" alt="" title=""></div>
          </div>
          <div class="center_col stretch">
            <div class="topicbox">
              <h2 v-sanitize="$text.handleNewLine(pageContent.surfBlock.title)" class="titlebox up_case underlined"></h2>
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.surfBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
            <div class="img_holder mobi"><img :src="`${api_url + pageContent.surfBlock['leftImage_1'].url}`" alt="" title=""></div>
            <div class="img_holder"><img :src="`${api_url + pageContent.surfBlock['rightImage_1'].url}`" alt="" title=""></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageContent.outpostBlock && pageContent.outpostBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.outpostBlock.block_internalID">
      <div class="back_poster"><img :src="`${api_url + pageContent.outpostBlock.background.url}`" alt="" title=""></div>
      <div class="content_grid">
        <div class="columns_grid disp_row_center">
          <div class="center_col stretch">
            <h2 v-sanitize="$text.handleNewLine(pageContent.outpostBlock.title)" class="titlebox up_case underlined"></h2>
            <div class="topicbox">
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.outpostBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
            <div v-if="pageContent.outpostBlock.learnMoreLink" class="btns_holder disp_row_center">
              <NuxtLink to="/work"><span class="button btn spaced center_col ease up_case inverted"><span>learn more</span></span></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageContent.eatAndDrinkBlock && pageContent.eatAndDrinkBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.eatAndDrinkBlock.block_internalID">
      <div class="back_art"><svg viewBox="0 0 367 538"><use xlink:href="~/assets/images/jungle_art_left.svg#herb"></use></svg></div>
      <div class="content_grid">
        <div class="columns_grid disp_row_between">
          <div class="center_col ">
            <div class="topicbox center_col">
              <h2 v-sanitize="$text.handleNewLine(pageContent.eatAndDrinkBlock.title)" class="titlebox up_case underlined"></h2>
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.eatAndDrinkBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
            <div class="img_holder"><img :src="`${api_url + pageContent.eatAndDrinkBlock['leftImage_1'].url}`" alt="" title=""></div>
          </div>
          <div class="center_col stretch">
            <div class="img_holder"><img :src="`${api_url + pageContent.eatAndDrinkBlock['rightImage_1'].url}`" alt="" title=""></div>
            <div class="img_holder"><img :src="`${api_url + pageContent.eatAndDrinkBlock['rightImage_2'].url}`" alt="" title=""></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageContent.sustainabilityBlock && pageContent.sustainabilityBlock.visible" class="blockContent detectVisibility" :data-view="pageContent.sustainabilityBlock.block_internalID">
      <div class="back_poster"><img :src="`${api_url + pageContent.sustainabilityBlock.background.url}`" alt="" title=""></div>
      <div class="content_grid">
        <div class="columns_grid disp_row_center">
          <div class="center_col stretch">
            <h2 v-sanitize="$text.handleNewLine(pageContent.sustainabilityBlock.title)" class="titlebox up_case underlined"></h2>
            <div class="topicbox">
              <p v-for="(p, index) in $text.handleParagraphs(pageContent.sustainabilityBlock.text)" :key="index" v-sanitize="p"></p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "LazyIndex",

  data() {
    return {
      api_url: this.$config.baseURL,
      pageContent: []
    }
  },

  computed: mapGetters(['getHomeBlocks']),

  async mounted() {
    await this.$store.dispatch('fetchHomeContent');

    this.pageContent = this.getHomeBlocks.data
  }
}
</script>

<style scoped>
.blockContent[data-view="1"] {background-color: #fff;}
.blockContent[data-view="4"] {display: block;overflow: visible;}
.blockContent[data-view="6"] {display: block;}
.blockContent[data-view="2"] .titlebox {color: #fff;}

.blockContent[data-view="3"] .columns_grid > .center_col:first-child .img_holder:nth-child(1) {width: 100%;}
.blockContent[data-view="3"] .columns_grid > .center_col:first-child .img_holder:nth-child(2) {text-align: right;}
.blockContent[data-view="3"] .columns_grid > .center_col:first-child .img_holder:nth-child(2) img {width: 55%;}
.blockContent[data-view="3"] .columns_grid > .center_col:last-child .topicbox:nth-child(1) {padding-top: 0;padding-bottom: 80px;margin-top: -50px;}
.blockContent[data-view="3"] .columns_grid > .center_col:last-child .topicbox:last-child {padding-top: 80px;}

.blockContent[data-view="4"] .columns_grid {margin: 100px 0 0;}
.blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(4) {text-align: right;}
.blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(4) img {width: 50%;}
.blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(5) img {width: 90%;}
.blockContent[data-view="4"] .columns_grid > .center_col:last-child .topicbox:first-child {padding-top: 80px;}
.blockContent[data-view="4"] .columns_grid > .center_col:first-child .topicbox:first-child {padding-top: 60px;}
.blockContent[data-view="4"] .btns_holder {margin-bottom: 50px;}

.blockContent[data-view="5"] .columns_grid > .center_col {width: 80%;}
.blockContent[data-view="5"] .titlebox {color: #fff;}
.blockContent[data-view="5"] .titlebox.underlined:before {background-color: #fff;}
.blockContent[data-view="5"] .topicbox p {color: #fff;padding-top: 0;}
.blockContent[data-view="5"] .btn {width: 500px;}
body:not(.mobile) .blockContent[data-view="5"] .btn.button.inverted:hover {border-color: #fff;color: #fff;}

.blockContent[data-view="6"] .columns_grid > .center_col:first-child .topicbox:first-child {height: 494px;}

.blockContent[data-view="7"] .columns_grid > .center_col {width: 70%;padding-top: 7%;}
.blockContent[data-view="7"] .titlebox {color: #fff;}
.blockContent[data-view="7"] .titlebox.underlined:before {background-color: #fff;}
.blockContent[data-view="7"] .topicbox p {color: #fff;}

.blockContent[data-view="1"] .back_art-new {width: 11.5vw;height: 42vw;top: 0;left: 0;background: url('~/assets/images/home-leaf-color.png') left center no-repeat;background-size: contain;}

.blockContent[data-view="3"] .back_art {width: 70vw;top: -15vw;right: 0;}
.blockContent[data-view="3"] .back_art svg {width: 100%;height: auto;left: 0;position: relative;-webkit-transform: rotate(65deg);-moz-transform: rotate(65deg);transform: rotate(65deg);}
.blockContent[data-view="3"] .back_art svg * {fill: #e2e3dc;}

.blockContent[data-view="4"] .back_art.leftSide {width: 100vw;height: 80vw;top: -10vw;right: 0;}
.blockContent[data-view="4"] .back_art.leftSide svg {width: auto;height: 100%;left: auto;right: 0;position: relative;-webkit-transform: rotate(60deg);-moz-transform: rotate(60deg);transform: rotate(60deg);}
.blockContent[data-view="4"] .back_art.leftSide svg * {fill: #e2e3dc;}

.blockContent[data-view="6"] .back_art {width: 100vw;height: 100vw;top: 0;left: 0;overflow: hidden;display: flex;flex-direction: column;justify-content: flex-end;}
.blockContent[data-view="6"] .back_art svg {width: 120%;height: auto;left: -16vw;top: 0;position: relative;-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);transform: rotate(90deg);}
.blockContent[data-view="6"] .back_art svg * {fill: #e2e3dc;}

.btns_holder a {text-decoration: none;}


@media screen and (min-width: 320px) and (max-width: 1280px) {
  .columns_grid {display: block;}
  .columns_grid > div {width: 100%;}

  .blockContent[data-view="4"] .columns_grid {margin: 40px 0 0;}
  .blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(4) {text-align: left;}
  .blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(4) img {width: 75%;}
  .blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(5) {text-align: right;}
  .blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(5) img {width: 75vw;}
  .blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(7) {text-align: left;}
  .blockContent[data-view="4"] .columns_grid > .center_col:first-child .img_holder:nth-child(7) img {width: 75vw;}
  .blockContent[data-view="4"] .columns_grid > .center_col:nth-child(2) .img_holder:nth-child(2) img {width: 100%;}
  .btns_holder {display: block;}

  .blockContent[data-view="2"] {height: 60vw;margin: 6vh 0 3vh;}
  .blockContent[data-view="2"] .back_poster {width: 100%;height: 100%;min-height: 100px;text-align: center;}
  .blockContent[data-view="2"] .back_poster img {height: 100%;width: auto;}
  .blockContent[data-view="2"] .center_col.stretch {height: 100%;}

  .blockContent[data-view="3"] .columns_grid {display: flex;flex-direction: column-reverse;}
  .blockContent[data-view="3"] .columns_grid > .center_col:nth-child(2) .img_holder:nth-child(3) {text-align: right;}
  .blockContent[data-view="3"] .columns_grid > .center_col:nth-child(2) .img_holder:nth-child(3) img {width: 75vw;}
  .blockContent[data-view="3"] .columns_grid > .center_col:nth-child(1) .img_holder:nth-child(2) {text-align: left;}
  .blockContent[data-view="3"] .columns_grid > .center_col:nth-child(1) .img_holder:nth-child(2) img {width: 62vw;}

  .blockContent[data-view="5"] .back_poster,
  .blockContent[data-view="7"] .back_poster {width: 100%;height: 100%;position: absolute;top: 0;left: 0;}
  .blockContent[data-view="5"] .back_poster img,
  .blockContent[data-view="7"] .back_poster img {width: auto;height: 100%;}
  .blockContent[data-view="5"] .back_poster ~ .content_grid,
  .blockContent[data-view="7"] .back_poster ~ .content_grid {position: relative;}
  .blockContent[data-view="5"] .columns_grid > .center_col,
  .blockContent[data-view="7"] .columns_grid > .center_col {width: 100%;padding-top: 15vw;}
  .blockContent[data-view="7"] .topicbox {padding-bottom: 60px !important;}
  .blockContent[data-view="5"] .btn {width: 100%;left: 0;}

  .blockContent[data-view="6"] .columns_grid > .center_col:nth-child(1) .img_holder:nth-child(2) img {width: 60vw;}
  .blockContent[data-view="6"] .columns_grid > .center_col:nth-child(2) .img_holder:nth-child(1) {text-align: right;margin-top: 6vw;}
  .blockContent[data-view="6"] .columns_grid > .center_col:nth-child(2) .img_holder:nth-child(1) img {width: 60vw;}
  .blockContent[data-view="6"] .columns_grid > .center_col:nth-child(2) .img_holder:nth-child(2) img {width: 75vw;}

  .blockContent[data-view="1"] {z-index: 4;background: transparent;}
  .blockContent[data-view="4"] {z-index: 3;}
  .blockContent[data-view="4"] .back_art.leftSide {width: 60vw;right: 60vw;top: -60vw;}

  .blockContent[data-view="3"] .columns_grid > .center_col:last-child .topicbox:nth-child(1) {margin-top: 0;}
  .blockContent[data-view="3"] .back_art {width: 50vw;left: auto;right: 60vw;top: 15vw;}
  .blockContent[data-view="3"] .back_art:before {display: none;}
  .blockContent[data-view="3"] .back_art svg {top: 0;}
  .blockContent[data-view="3"] .back_art svg * {fill: #e2e3dc;}
  .blockContent[data-view="6"] .columns_grid > .center_col:first-child .topicbox:first-child {height: auto;}
  .blockContent[data-view="6"] .back_art {width: 100vw;justify-content: flex-start;}

}

@media screen and (min-width: 501px) and (max-width: 1280px) {
  .blockContent[data-view="5"] .btn {width: 460px;left: calc(50% - 230px);}

}

@media screen and (min-width: 901px) and (max-width: 1679px) {
  .blockContent[data-view="4"] .columns_grid {margin-top: 7vw;}

}

</style>
