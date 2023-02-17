import { TreeNodeSchema, TreeNodeApi } from "@/node-tree/types"
import { editor } from "@/node-tree/editor"
export let useSchema = (api : TreeNodeApi) : TreeNodeSchema | false => {
    return editor.nodes.list.find((entry: TreeNodeSchema) => {
        return entry.node.schema == api.node.schema
    } ) ?? false
}