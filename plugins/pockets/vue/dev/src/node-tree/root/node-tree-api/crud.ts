import { $pockets } from "@/pockets"

export let useCrud = (api) => {
    let initialize = async () => {
        try {
            let res = await $pockets.crud('node-tree/node').init(api.node).read(['initialize:<='])
            api.node = res
        } catch(e) {

        }
    }
    return {
        initialize
    }
}
