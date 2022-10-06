import { Store } from 'vuex'
import home from './modules/home'
import nosara from './modules/nosara'
import stay from './modules/stay'
import work from './modules/work'
import reserve from './modules/reserve'
import menus from './modules/menus'
import staticInfo from './modules/static'

export default () => new Store({
    modules: {
        home,
        nosara,
        stay,
        work,
        reserve,
        menus,
        staticInfo
    },
})

