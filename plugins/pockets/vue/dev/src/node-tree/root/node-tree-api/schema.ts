import { TreeNodeSchema, TreeNodeApi } from "./types"

export let useSchema = (api : TreeNodeApi) : TreeNodeSchema | false => {
    return api.editor.nodes.list.find(entry => {
        return entry.node.schema == api.node.schema
    } ) ?? false
}