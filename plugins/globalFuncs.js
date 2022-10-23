import Vue from 'vue';


const text = {
  handleParagraphs(p) {
    const Ps = p.split(/(?:\r\n|\r|\n)/g);

    for(let r = 0; r < Ps.length; r++) {
      Ps[r] = Ps[r].replace(/ ([^ ]*)$/, '&nbsp;' + '$1')
    }

    return Ps
  },

  handleNewLine(p) {
    if(p) {
      return p.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }
  },

  handleNewDivider(p) {
    if(p) {
      return p.replace(/(?:\r\n|\r|\n)/g, '<div></div>');
    }
  },

  handleNewLineWrapped(p) {
    if(p) {
      const wW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let result = ''

      if(wW >= 768) {
        const mid = p.split(/(?:\r\n|\r|\n)/g);

        for(let r = 0; r < mid.length; r++) {
          result += '<span><span>' + mid[r] + '</span></span>';
        }
      }
      else {result = p;}

      return result;
    }
  },

  handleList(p) {
    if(p) {
      let result = ''
      const mid = p.split(/(?:\r\n|\r|\n)/g);

      for(let r = 0; r < mid.length; r++) {
        let p = document.createElement('p')
        p.innerText = mid[r]

        result += p
      }

      return result;
    }
  }
}

const actions = {
  showSidebar(target) {
    if(target) {
      const body = document.body
      const deep = document.getElementById('deep')

      body.classList.add('sidebarActivated')
      deep.setAttribute('data-target', target)
    }
  },

  hideSidebar() {
    const body = document.body
    const deep = document.getElementById('deep')

    body.classList.remove('sidebarActivated')
    setTimeout(function() {
      deep.removeAttribute('data-target')


      if(Vue.prototype.$sliders.instances.length > 0) {
        for(let s = 0; s < Vue.prototype.$sliders.instances.length; s++) {
          Vue.prototype.$sliders.instances[s].translateTo(0)
        }
      }
    }, 800)
  }
}

const sliders = {
  instances: '',
  init() {
    this.instances = new Swiper('.swiper', {
      slidesPerView: 'auto',
      freeMode: true,
      mousewheel: true,
      on: {
        progress: function(e) {
          let pos = (e.progress)? Math.round(e.progress.toFixed(2) * 100) : 0,
            finalPos = (pos <= 20)? 20 : pos

          const deepProgress = document.getElementById('deepProgress')

          deepProgress.setAttribute('style', 'width: ' + finalPos + '%;')
        }
      }
    });
  }
}






Vue.prototype.$text = text;
Vue.prototype.$actions = actions;
Vue.prototype.$sliders = sliders;

export default ({app}, inject) => {
  inject('text', text);
  inject('actions', actions);
  inject('sliders', sliders);
}
