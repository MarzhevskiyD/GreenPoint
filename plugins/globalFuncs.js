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
    return p.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}




Vue.prototype.$text = text;

export default ({app}, inject) => {
  inject('text', text);
}
