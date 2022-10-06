<template>

</template>

<script>
// import { mapGetters } from 'vuex'
// import emailRegexSafe from 'email-regex-safe'

export default {
  name: 'MainFooter',
  data() {
    return {
      api_url: this.$config.baseURL,
      footerInfo: [],
      emailErrorMessage: '',
      emailStatus: '',
      messangerTimer: 0,
    }
  },
//  computed: mapGetters(['getFooter']),
  async mounted() {
//    await this.$store.dispatch('fetchFooterContent')

 //   this.footerInfo = this.getFooter.data.footer
  },
  methods: {
    becomeSubscriber(e) {
      e.preventDefault()

      const uEmail = document.getElementById('userEmail')

      if(uEmail.value && uEmail.value.length > 0) {
        // if(emailRegexSafe({ exact: true }).test(uEmail.value)) {
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
        // }
        // else {
        //   this.emailErrorMessage = 'Incorrect email format'
        //   this.emailStatus = 'error'
        // }
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



</style>
