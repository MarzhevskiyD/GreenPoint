import { Store } from 'vuex'
import home from './modules/home'
import packs from './modules/packs-info'

export default () => new Store({
    modules: {
      home,
      packs
    },
})

