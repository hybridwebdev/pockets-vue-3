import { $pockets } from "@/pockets"
export let useRemove = (api) => {
    return {
        node: (index) => {
            api.node.nodes = $pockets.utils.array.omit(api.node.nodes, index)
        },
        self: () => {
            api.parent.remove.node(api.index)
        }
    }
}