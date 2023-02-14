import { $pockets } from "@/pockets"

type path = Array<string | number>

type useAdd = {
    inside: false | ((node: any) => path)
    before: any
    after: any
}

export let useAdd = (api) : useAdd => {

    let add:useAdd = {
        inside: false,
        before: false,
        after: false
    }

    let inside = (node: any, index: number = 0) => {
        api.node.nodes = $pockets.utils.array.insert(api.node.nodes, index, node)
        return []
    }
    let after = (node: any) => {
        return api.parent.add.inside(node, api.index + 1)
    }
    let before = (node: any) => {
        return api.parent.add.inside(node, api.index)
    }

    if(api.parent && api.parent.hasNodes) {
        Object.assign(add, { before, after } )
    }
    if(api.hasNodes ) {
        add.inside = inside
    }

    return add

}