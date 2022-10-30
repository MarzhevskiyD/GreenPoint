import { Store } from 'vuex'
import home from './modules/home'
import start from './modules/start'
import packs from './modules/packs-info'

export default () => new Store({
    modules: {
      home,
      start,
      packs
    },
})

