import { TreeNodeSchema, TreeNodeApi } from "@/node-tree/types"

export let useSchema = (api : TreeNodeApi) : TreeNodeSchema | false => {
    return api.editor.nodes.list.find((entry: TreeNodeSchema) => {
        return entry.node.schema == api.node.schema
    } ) ?? false
}