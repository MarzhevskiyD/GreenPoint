import qs from 'qs'

const extendedQuery = qs.stringify({
    populate: [
      'GrowthPack',
      'GrowthPack.infoBlocks',
    ]
},{
    encodeValuesOnly: true
});

export default {
    actions: {
        async fetchPacksContent(ctx) {
            const res = await fetch(`${this.$config.apiURL}/packages-info?`+extendedQuery);
            const blocks = await res.json();

            ctx.commit('updatePacksBlocks', blocks);
        }
    },
    state() {
        return {
            blocks: []
        }
    },
    mutations: {
        updatePacksBlocks(state, blocks) {
            state.blocks = blocks
        }
    },
    getters: {
        getPacksBlocks(state) {
            return state.blocks
        }
    }
}
