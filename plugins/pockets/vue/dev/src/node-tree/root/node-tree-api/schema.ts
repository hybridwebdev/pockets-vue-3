import { TreeNodeSchema } from "./types"

export let useSchema = (api) : TreeNodeSchema | false => {
    return api.editor.nodes.list.find(entry => {
        return entry.node.schema == api.node.schema
    } ) ?? false
}