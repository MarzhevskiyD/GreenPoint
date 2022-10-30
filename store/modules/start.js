import qs from 'qs'

const extendedQuery = qs.stringify({
    populate: [
      'background',
    ]
},{
    encodeValuesOnly: true
});

export default {
    actions: {
        async fetchStartContent(ctx) {
            const res = await fetch(`${this.$config.apiURL}/start?`+extendedQuery);
            const blocks = await res.json();

            ctx.commit('updateStartBlocks', blocks);
        }
    },
    state() {
        return {
            blocks: []
        }
    },
    mutations: {
        updateStartBlocks(state, blocks) {
            state.blocks = blocks
        }
    },
    getters: {
        getStartBlocks(state) {
            return state.blocks
        }
    }
}
