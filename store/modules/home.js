import qs from 'qs'

const extendedQuery = qs.stringify({
    populate: [
        'jungleBlock.image',
        'stayBlock.leftImage_1',
        'stayBlock.leftImage_2',
        'stayBlock.rightImage_1',
        'stayBlock.rightImage_2',
        'wavesBlock.background',
        'surfBlock.leftImage_1',
        'surfBlock.leftImage_2',
        'surfBlock.rightImage_1',
        'outpostBlock.background',
        'eatAndDrinkBlock.leftImage_1',
        'eatAndDrinkBlock.leftImage_2',
        'eatAndDrinkBlock.rightImage_1',
        'eatAndDrinkBlock.rightImage_2',
        'sustainabilityBlock.background',
    ]
},{
    encodeValuesOnly: true
});

export default {
    actions: {
        async fetchHomeContent(ctx) {
            const res = await fetch(`${this.$config.apiURL}/home-page?`+extendedQuery);
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
