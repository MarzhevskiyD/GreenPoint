<template>
  <footer>
    <div class="content_grid">
      <div class="disp_col">
        <div>
          <NuxtLink to="/"><span class="mLogo ease"><svg viewBox="0 0 404 98"><use xlink:href="@/assets/images/sendero_logo.svg#logo"></use></svg></span></NuxtLink>
        </div>
        <div class="fcontent_holder">
          <div class="disp_row_between footerInfo">

            <div v-if="staticInfo.visitBlock">
              <span class="fTitle up_case">{{ staticInfo.visitBlock.title }}</span>
              <div class="fInfo">
                <span v-if="staticInfo.visitBlock.hotelName != ''" class="hotelName">{{ staticInfo.visitBlock.hotelName }}</span>
                <span v-sanitize="$text.handleNewLine(staticInfo.visitBlock.address)"></span>
              </div>
            </div>

            <div v-if="staticInfo.contactsBlock">
              <span class="fTitle up_case">{{ staticInfo.contactsBlock.title }}</span>
              <div v-if="staticInfo.contactsBlock.ContactOption" class="fInfo">
                <span v-for="(item, index) in staticInfo.contactsBlock.ContactOption" :key="index">
                  <span v-if="item.emails" class="disp_row">
                    <span>{{ item.title }}:</span>
                    <span>
                      <span v-for="(itm, idx) in $text.handleParagraphs(item.emails)" :key="idx">
                        <a :href="`mailto:${itm}`" class="ease">{{ itm }}</a><br>
                      </span>
                    </span>
                  </span>
                  <span v-if="item.phones" class="disp_row">
                    <span>{{ item.title }}:</span>
                    <span>
                      <span v-for="(itm, idx) in $text.handleParagraphs(item.phones)" :key="idx">
                        <a v-sanitize="itm" :href="`tel:+${clearPhone(itm)}`" class="ease"></a><br>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div v-if="staticInfo.joinBlock">
              <span class="fTitle up_case">{{ staticInfo.joinBlock.title }}</span>
              <div class="fInfo">
                <form @submit="becomeSubscriber">
                  <fieldset v-if="staticInfo.joinBlock.subscriptionsActive">
                    <input id="userEmail" type="text" placeholder="Email" class="ease2" :class="emailStatus" @keypress="clearEmail">
                    <span class="invalid-subscribe">{{ emailErrorMessage }}</span>
                    <button type="submit" class="form_button ease"><svg viewBox="0 0 32 32"><use xlink:href="@/assets/images/icons.svg#arrow_right"></use></svg></button>
                  </fieldset>
                </form>

                <div class="socials">
                  <a v-if="staticInfo.joinBlock.FacebookLink" :href="staticInfo.joinBlock.FacebookLink" rel="nofollow" target="_blank"><svg viewBox="0 0 32 32"><use xlink:href="@/assets/images/icons.svg#facebook"></use></svg></a>
                  <a v-if="staticInfo.joinBlock.InstagramLink" :href="staticInfo.joinBlock.InstagramLink" rel="nofollow" target="_blank"><svg viewBox="0 0 32 32"><use xlink:href="@/assets/images/icons.svg#instagram"></use></svg></a>
                </div>
              </div>
            </div>
          </div>

          <span class="footer_copyright">© Copyright 2022. All Rights Reserved Sendero Nosara LLC</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import emailRegexSafe from 'email-regex-safe'

export default {
  name: 'MainFooter',
  data() {
    return {
      api_url: this.$config.baseURL,
      staticInfo: [],
      emailErrorMessage: '',
      emailStatus: '',
      messangerTimer: 0,
    }
  },
  computed: mapGetters(['getStaticBlocks']),
  async mounted() {
    await this.$store.dispatch('fetchStaticContent')

    this.staticInfo = this.getStaticBlocks.data
  },
  methods: {
    clearPhone(str) {
      return str.replace(/\D+/g, "")
    },

    becomeSubscriber(e) {
      e.preventDefault()

      const uEmail = document.getElementById('userEmail')

      if(uEmail.value && uEmail.value.length > 0) {
        if(emailRegexSafe({ exact: true }).test(uEmail.value)) {
          const _this = this;
          this.clearEmail();

          this.$axios({
            method: "post",
            url: `${this.$config.apiURL}/subscribers`,
            data: {
              data: {
                "userEmail": uEmail.value
              }
            },
          }).then(function (resp) {
            _this.showMessage('You have successfully subscribed to our mailing list')
            uEmail.value = ''
          }).catch(function (resp) {

          });
        }
        else {
          this.emailErrorMessage = 'Incorrect email format'
          this.emailStatus = 'error'
        }
      }
      else {
        this.emailErrorMessage = 'This field is required'
        this.emailStatus = 'error'
      }
    },

    clearEmail() {
      this.emailErrorMessage = ''
      this.emailStatus = ''
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  footer {opacity: 0;background: url('~/assets/images/footer-background.png') #e3ddd6 center bottom no-repeat;background-size: cover;padding: 8vh 0 9vh;position: relative;overflow: hidden;-webkit-transition: .5s ease;-moz-transition: .5s ease;transition: .5s ease;}
  #pageBox.content--visibility footer {opacity: 1;}

  .mLogo {width: 136px;height: 34px;display: inline-block;cursor: pointer;position: relative;}
  .mLogo svg {width: auto;height: 100%;}
  .mLogo svg * {fill: #242c1d;-webkit-transition: fill .3s ease;-moz-transition: fill .3s ease;transition: fill .3s ease;}
  body:not(.mobile) .mLogo:hover svg * {fill: #535b4c;}

  .fTitle {display: block;font-size: 20px;color: #242c1d;text-align: left;padding-bottom: 10px;}
  .footerInfo {margin-top: 8vh;}
  .footerInfo > div {display: flex;flex-direction: column;justify-content: space-between;}
  .fInfo {position: relative;}
  .fInfo > span {padding: 3px 0;}
  .fInfo a {text-decoration: none;}
  .fInfo span {font-size: 13px;color: #242c1d;}
  .fInfo span:not(.disp_row) {display: block;}
  .fInfo span.disp_row {padding: 0;}
  .fInfo span.disp_row > span:first-child {margin-right: 6px;}
  .fInfo span.hotelName {font-weight: 700;margin-bottom: 15px;}
  .fInfo span a {font-size: inherit;color: inherit;}
  body:not(.mobile) .fInfo span a:hover {opacity: .7;}
  fieldset {width: 470px;position: relative;}
  fieldset input {width: 100%;height: 66px;background: none;outline: none;border: none;border-bottom: 1px solid #242c1d;font-size: 17px;color: #242c1d;position: relative;z-index: 1;}
  fieldset input:focus {border-color: #242c1d;}
  fieldset input::placeholder {color: #242c1d;opacity: 1;}
  fieldset input:-ms-input-placeholder {color: #242c1d;}
  fieldset input::-ms-input-placeholder {color: #242c1d;}
  fieldset input.error {border-color: #ff0000 !important;}
  fieldset input + .invalid-subscribe {position: absolute;top: 100%;left: 0;font-size: 12px;color: #ff0000;padding-top: 5px;}
  .form_button {width: 30px;height: 30px;position: absolute;top: calc(50% - 15px);right: 0;z-index: 2;cursor: pointer;border: none;background: none;outline: none;}
  .form_button svg * {fill: #242c1d;-webkit-transition: fill .3s ease;-moz-transition: fill .3s ease;transition: fill .3s ease;}
  body:not(.mobile) .form_button:hover {opacity: .8;}
  .fcontent_holder {padding-bottom: 80px;}
  .socials {position: absolute;top: calc(100% + 40px);left: 0;}
  .socials a {width: 38px;height: 38px;display: inline-block;margin: 0 12px 0 0;position: relative;}
  .socials a svg * {fill: #7a6755;-webkit-transition: fill .3s ease;-moz-transition: fill .3s ease;transition: fill .3s ease;}
  body:not(.mobile) .socials a:hover svg * {fill: #242c1d;}
  .footer_copyright {position: absolute;top: calc(100% + 30px);left: 0;font-size: 14px;color: #fff;}



  @media screen and (min-width: 320px) and (max-width: 600px) {
    .footerInfo {justify-content: space-between;}
    footer {padding: 8vh 0 12vh;}
    .footer_copyright {font-size: 12px;}
  }

  @media screen and (min-width: 320px) and (max-width: 1000px) {
    .form_button {width: 20px;height: 20px;top: calc(50% - 10px);}
    .socials a {width: 22px;height: 22px;}
    .footerInfo fieldset input {font-size: 13px;}
  }

  @media screen and (min-width: 320px) and (max-width: 1280px) {
    .mLogo {width: 20vw;}
    .mLogo svg {width: 100%;height: auto;}
    .footerInfo {flex-wrap: wrap;}
    .footerInfo > div:nth-child(1) {min-width: 33vw;}
    .footerInfo > div:nth-child(2) {min-width: 45vw;}
    .footerInfo > div:nth-child(3) {width: 70vw;max-width: 400px;margin-top: 9vw;}
    .footerInfo fieldset {width: 100%;}
    .footerInfo fieldset input {height: 14vw;max-height: 68px;font-size: 16px;}
    .form_button {width: 26px;height: 26px;top: calc(50% - 13px);}
    .fTitle {font-size: 3.2vw;}
    .fInfo span {font-size: 12px;}
    .socials a {width: 28px;height: 28px;}

    footer {background: #f1f2ed;}
    fieldset input {border-color: #b0ada8;}
    .form_button svg * {fill: #b0ada8;}
    fieldset input::placeholder {color: #b0ada8;opacity: 1;}
    fieldset input:-ms-input-placeholder {color: #b0ada8;}
    fieldset input::-ms-input-placeholder {color: #b0ada8;}
    .socials a svg * {fill: #b0ada8;}

    .footer_copyright {color: #242c1d;}


  }

  @media screen and (min-width: 500px) and (max-width: 1280px) {
    .fTitle {font-size: 16px;}
    .fInfo span {font-size: 12px;}
  }

  @media screen and (min-width: 601px) and (max-width: 1280px) {
    .mLogo {width: 120px;}
    .footerInfo {justify-content: flex-start;}
  }


</style>
