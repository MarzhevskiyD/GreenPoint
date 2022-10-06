<template>
  <div>
    <div v-if="pageContent.brandPackages" class="blockContent detectVisibility navFrame" data-view="2" id="brandPack">
      <div class="content_grid">
        <div v-if="pageContent.brandPackages.introTitle || pageContent.brandPackages.introDescription" class="content-row packagesInfo">
          <section class="packagesIntro">
            <span v-if="pageContent.brandPackages.introTitle" v-sanitize="$text.handleNewLineWrapped(pageContent.brandPackages.introTitle)" class="up_case hideLiner ease"></span>
            <p v-if="pageContent.brandPackages.introDescription" v-sanitize="$text.handleNewLine(pageContent.brandPackages.introDescription)" class="ease"></p>
          </section>
        </div>

        <div class="packagesBlock">
          <span v-sanitize="pageContent.brandPackages.blockName" class="blockName"></span>
          <h2 v-sanitize="$text.handleNewLineWrapped(pageContent.brandPackages.blockTitle)" class="up_case hideLiner massive blockTitle"></h2>

          <div class="packages_list disp_row_between">
            <div v-for="(pack, index) in visibleBrandPacks" :key="index" class="pack_item ease">
              <div class="img_holder"><img :src="`${api_url + pack.image.url}`" alt="" title=""></div>
              <h3 class="pac_name ease">{{ pack.title }}</h3>
              <div class="pac_descr ease">
                <p v-for="(p, pIndex) in $text.handleParagraphs(pack.description)" :key="pIndex" v-sanitize="p"></p>
              </div>
              <div v-if="pack.teamTitle && pack.team" class="teambox ease">
                <span>{{ pack.teamTitle }}</span>
                <div>
                  <p v-for="(p, pIndex) in $text.handleParagraphs(pack.team)" :key="pIndex" v-sanitize="p"></p>
                </div>
              </div>
              <div class="terms_and_cost ease">
                <span v-if="pack.terms" class="pack_terms">{{ pack.terms }}</span>
                <span class="pack_cost">{{ pack.price }}</span>
                <span v-if="pack.priceHint" class="pack_cost_hint">{{ pack.priceHint }}</span>
              </div>
              <div v-if="pack.sidebarInfo && pack.detailsTitle" class="action_holder ease">
                <span v-sanitize="$text.handleNewLine(pack.detailsTitle)" class="action" @click="$actions.showSidebar(''+ pack.sidebarInfo +'')"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="pageContent.AudiencePackages" class="blockContent detectVisibility inverted navFrame" data-view="2" id="audiencePack">
      <div class="content_grid">
        <div v-if="pageContent.AudiencePackages.introTitle || pageContent.AudiencePackages.introDescription" class="content-row packagesInfo">
          <section class="packagesIntro">
            <span v-if="pageContent.AudiencePackages.introTitle" v-sanitize="$text.handleNewLineWrapped(pageContent.AudiencePackages.introTitle)" class="up_case hideLiner ease"></span>
            <p v-if="pageContent.AudiencePackages.introDescription" v-sanitize="$text.handleNewLine(pageContent.AudiencePackages.introDescription)" class="ease"></p>
          </section>
        </div>

        <div class="packagesBlock">
          <span v-sanitize="pageContent.AudiencePackages.blockName" class="blockName"></span>
          <h2 v-sanitize="$text.handleNewLineWrapped(pageContent.AudiencePackages.blockTitle)" class="up_case hideLiner massive blockTitle"></h2>

          <div class="packages_list disp_row_between">
            <div v-for="(pack, index) in visibleAudiencePacks" :key="index" class="pack_item ease">
              <div class="img_holder"><img :src="`${api_url + pack.image.url}`" alt="" title=""></div>
              <h3 class="pac_name ease">{{ pack.title }}</h3>
              <div class="pac_descr ease">
                <p v-for="(p, pIndex) in $text.handleParagraphs(pack.description)" :key="pIndex" v-sanitize="p"></p>
              </div>
              <div v-if="pack.teamTitle && pack.team" class="teambox ease">
                <span>{{ pack.teamTitle }}</span>
                <div>
                  <p v-for="(p, pIndex) in $text.handleParagraphs(pack.team)" :key="pIndex" v-sanitize="p"></p>
                </div>
              </div>
              <div class="terms_and_cost ease">
                <span v-if="pack.terms" class="pack_terms">{{ pack.terms }}</span>
                <span class="pack_cost">{{ pack.price }}</span>
                <span v-if="pack.priceHint" class="pack_cost_hint">{{ pack.priceHint }}</span>
              </div>
              <div v-if="pack.detailsButton && pack.detailsTitle" class="action_holder ease">
                <span v-sanitize="$text.handleNewLine(pack.detailsTitle)" class="action"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <footer>
      <div class="content_grid">
        <span class="blockName light">{{ footerContent.blockTitle }}</span>
        <span class="blockName">{{ footerContent.blockName }}</span>
        <form @submit="getInTouch">
          <div class="disp_row_between">
            <fieldset>
              <input type="text" id="user-name" class="ease" :class="nameStatus" placeholder="Name" @click="clearName">
              <span class="invalid-message">{{ nameErrorMessage }}</span>
            </fieldset>
            <fieldset>
              <input type="email" id="user-email" class="ease" :class="emailStatus" placeholder="Email" @click="clearEmail">
              <span class="invalid-message">{{ emailErrorMessage }}</span>
            </fieldset>
          </div>
          <fieldset>
            <textarea id="user-message" class="ease" :class="messageStatus" placeholder="Message" @click="clearMessage"></textarea>
            <span class="invalid-message">{{ messageErrorMessage }}</span>
          </fieldset>
          <div class="form_btn_holder">
            <button type="submit" class="form_btn up_case ease">submit</button>
          </div>
        </form>
        <div class="footer-info disp_row_between">
          <span class="f_location up_case">{{ footerContent.location }}</span>
          <span class="f_copyright">{{ footerContent.copyright }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import emailRegexSafe from 'email-regex-safe'

export default {
  name: "LazyIndex",

  data() {
    return {
      api_url: this.$config.baseURL,
      messangerTimer: 0,
      pageContent: [],
      footerContent: [],
      visibleBrandPacks: [],
      visibleAudiencePacks: [],
      nameErrorMessage: '',
      nameStatus: '',
      emailErrorMessage: '',
      emailStatus: '',
      messageErrorMessage: '',
      messageStatus: ''
    }
  },

  computed: mapGetters(['getHomeBlocks']),

  async mounted() {
    await this.$store.dispatch('fetchHomeContent');

    this.pageContent = this.getHomeBlocks.data
    this.footerContent = this.getHomeBlocks.data.footer

    // filter ONLY visible brand packs
    let onlyVisibleBrand = this.pageContent.brandPackages.packages
    onlyVisibleBrand = onlyVisibleBrand.filter((item) => {
      return item.active
    })
    this.visibleBrandPacks = onlyVisibleBrand


    // filter ONLY visible audience packs
    let onlyVisibleAudience = this.pageContent.AudiencePackages.packages
    onlyVisibleAudience = onlyVisibleAudience.filter((item) => {
      return item.active
    })
    this.visibleAudiencePacks = onlyVisibleAudience
  },

  methods: {
    getInTouch(e) {
      e.preventDefault()

      const uName = document.getElementById('user-name')
      const uEmail = document.getElementById('user-email')
      const uMessage = document.getElementById('user-message')
      let validation = true
      const _this = this;

      if(!uName.value) {
        validation = false;
        _this.nameErrorMessage = 'This field is required'
        _this.nameStatus = 'error'
      }

      if(!emailRegexSafe({ exact: true }).test(uEmail.value)) {
        validation = false;
        _this.emailErrorMessage = 'Incorrect email format'
        _this.emailStatus = 'error'
      }
      if(!uEmail.value) {
        validation = false;
        _this.emailErrorMessage = 'This field is required'
        _this.emailStatus = 'error'
      }

      if(!uMessage.value) {
        validation = false;
        _this.messageErrorMessage = 'This field is required'
        _this.messageStatus = 'error'
      }


      if(validation) {
        _this.clearName()
        _this.clearEmail()
        _this.clearMessage()

        _this.$axios({
          method: "post",
          url: `${this.$config.apiURL}/get-in-touches`,
          data: {
            data: {
              "name": uName.value,
              "email": uEmail.value,
              "message": uMessage.value
            }
          },
        }).then(function (resp) {
          _this.showMessage('Thank you for your request.<br> We will contact you as soon as possible.')
          uName.value = ''
          uEmail.value = ''
          uMessage.value = ''
        }).catch(function (resp) {

        });
      }
    },

    clearName() {
      this.nameErrorMessage = ''
      this.nameStatus = ''
    },

    clearEmail() {
      this.emailErrorMessage = ''
      this.emailStatus = ''
    },

    clearMessage() {
      this.messageErrorMessage = ''
      this.messageStatus = ''
    },

    showMessage(message) {
      const _this = this

      _this.messangerTimer = setTimeout(function () {
        clearTimeout(_this.messangerTimer);
        const newMessanger = document.createElement('div');
        newMessanger.innerHTML = message;
        newMessanger.classList.add('messanger', 'ease2');
        document.body.appendChild(newMessanger);

        setTimeout(function () {
          const messages = document.querySelectorAll('.messanger');
          for(const message of messages) {
            message.classList.add('show');
          }

          setTimeout(function () {
            for(const message of messages) {
              message.classList.add('hide');
            }
            setTimeout(function () {
              for(const message of messages) {
                message.remove();
              }
            }, 500);
          }, 4000);
        }, 100);
      }, 500);
    }
  }
}
</script>

<style scoped>
  .content-row {width: 100%;position: relative;}
  .content-row.packagesInfo {margin-bottom: 3vw;}
  .packagesIntro {width: 36vw;margin-left: 37vw;}
  .packagesIntro > span {font: 4vw/1 casual;color: #e9cbab;margin-bottom: 4vw;display: block;}
  .packagesIntro p {font-size: 2vw;font-weight: 300;color: #e9cbab;margin-bottom: 4vw;}

  .packagesBlock {width: 100%;}
  .blockName {display: block;font-size: 3.5vw;font-weight: 300;color: #c14e23;}
  .blockName.light {color: #e1d1c0;}
  .blockTitle {display: block;font: 14vw/1 casual;color: #e9cbab;}
  .packages_list {width: 100%;margin-top: 4vw;}
  .pack_item {width: calc(33.33% - 3vw);}
  .pack_item .img_holder {width: 100%;height: 0;padding-top: 128%;position: relative;overflow: hidden;}
  .pack_item .img_holder img {position: absolute;top: 0;left: 0;width: 100%;height: auto;object-fit: cover;}
  .pac_name {display: block;font-size: 2.5vw;font-weight: 600;color: #e9cbab;margin: 3.5vw 0 0;}
  .pac_descr {font-size: 1.3vw;color: #fff;margin: 15px 0 0;}
  .pac_descr p {padding: 5px 0;font-size: inherit;color: inherit;margin: 0;}
  .pac_descr p:nth-child(1) {padding-top: 0;}
  .pac_descr p:nth-last-child {padding-bottom: 0;}
  .teambox {width: 100%;min-height: 12vw;}
  .teambox span {font-size: 1.2vw;font-weight: 600;color: #e9cbab;display: block;margin-bottom: 10px;}
  .teambox p {font-size: 1.2vw;color: #fff;line-height: 1.5;}
  .pack_terms {display: block;margin-top: 1.6vw;font-size: 1.2vw;font-weight: 300;color: #e9cbab;}
  .pack_cost {display: block;margin-top: 2vw;font-size: 1.8vw;font-weight: 600;color: #e9cbab;}
  .pack_cost_hint {display: block;padding: 5px 0 0;font-size: 0.8vw;color: #fff;}
  .action_holder {margin: 3vw 0 0;}
  .action_holder .action {height: 3.2vw;display: inline-block;padding-right: 5vw;position: relative;font-size: 1.2vw;color: #c14e23;cursor: pointer;-webkit-transition: .4s ease;-moz-transition: .4s ease;transition: .4s ease;}
  .action_holder .action:before {width: 3.1vw;height: 3.1vw;display: block;position: absolute;top: 0;right: 0;content: "";border: 2px solid #c14e23;background: url('~/assets/images/right_arrow-orange.svg') center no-repeat;background-size: 1.5vw;-webkit-border-radius: 100%;-moz-border-radius: 100%;border-radius: 100%;-webkit-transition: .2s ease;-moz-transition: .2s ease;transition: .2s ease;}
  body:not(.mobile) .action_holder .action:hover:before {background: url('~/assets/images/right_arrow.svg') #c14e23 center no-repeat;background-size: 1.5vw;}

  .blockContent {background: #000;}
  .blockContent.inverted {background: #e1d1c0;}
  .inverted .packagesIntro > span,
  .inverted .packagesIntro p,
  .inverted .packagesBlock .blockTitle,
  .inverted .pac_name,
  .inverted .teambox span,
  .inverted .pack_cost {color: #000;}
  .inverted .pac_descr,
  .inverted .teambox p,
  .inverted .pack_cost_hint {color: #858585;}
  .inverted .action_holder .action:before {background: url('~/assets/images/right_arrow-light.svg') #c14e23 center no-repeat;background-size: 1.5vw;}
  body:not(.mobile) .inverted .action_holder .action:hover:before {background: url('~/assets/images/right_arrow-orange.svg') center no-repeat;background-size: 1.5vw;}

  footer {width: 100%;background: #000;padding: 7vw 0;}
  .footer-info {width: 100%;margin: 10vw 0 0;}
  .footer-info .f_location {position: relative;padding-left: 2.5vw;font-size: 1.1vw;color: #e1d1c0;}
  .footer-info .f_location:before {height: 2vw;width: 46px;position: absolute;top: calc(50% - 1.1vw);left: 0;display: block;content: "";background: url('~/assets/images/location-icon.svg') left center no-repeat;background-size: contain;}
  .footer-info .f_copyright {font-size: 1.1vw;color: #e1d1c0;}
  form {position: relative;margin: 3.2vw 0 0;}
  fieldset {width: 100%;margin: 0 0 1.8vw;position: relative;}
  .disp_row_between fieldset {width: calc(50% - 70px);}
  fieldset input {width: 100%;height: 3.5vw;background: none;border: none;outline: none;border-bottom: 3px solid #e1d1c0;font-size: 1.2vw;color: #e1d1c0;}
  fieldset textarea {width: 100%;height: 8em;background: none;border: none;outline: none;resize: none;border-bottom: 3px solid #e1d1c0;font-size: 1.2vw;color: #e1d1c0;}
  fieldset input:focus,
  fieldset textarea:focus {border-color: #c14e23;}
  fieldset input::placeholder,
  fieldset textarea::placeholder {color: #e1d1c0;opacity: 1;}
  fieldset input:-ms-input-placeholder,
  fieldset textarea:-ms-input-placeholder {color: #e1d1c0;}
  fieldset input::-ms-input-placeholder,
  fieldset textarea::-ms-input-placeholder {color: #e1d1c0;}
  fieldset input.error,
  fieldset textarea.error {border-color: #ff0000 !important;}
  fieldset input + .invalid-message,
  fieldset textarea + .invalid-message {position: absolute;top: 100%;left: 0;font-size: 12px;color: #ff0000;padding-top: 5px;}

  .form_btn_holder {padding: 1.2vw 0 0;}
  .form_btn {width: 100%;height: 3.6vw;display: block;background: #e1d1c0;border: none;outline: none;font-size: 1.3vw;font-weight: 600;color: #000;}
  body:not(.mobile) .form_btn:hover {opacity: .8;}


</style>
