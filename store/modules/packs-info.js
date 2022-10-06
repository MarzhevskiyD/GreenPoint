import qs from 'qs'

const extendedQuery = qs.stringify({
    populate: [
      'topScreen',
      'brandPackages',
      'brandPackages.packages',
      'brandPackages.packages.image',
      'AudiencePackages',
      'AudiencePackages.packages',
      'AudiencePackages.packages.image',
      'footer'
    ]
},{
    encodeValuesOnly: true
});

export default {
    actions: {
        async fetchHomeContent(ctx) {
            const res = await fetch(`${this.$config.apiURL}/home?`+extendedQuery);
            const blocks = await res.json();

            ctx.commit('updateHomeBlocks', blocks);
        }
    },
    state() {
        return {
            blocks: []
        }
    },
    mutations: {
        updateHomeBlocks(state, blocks) {
            state.blocks = blocks
        }
    },
    getters: {
        getHomeBlocks(state) {
            return state.blocks
        }
    }
}
