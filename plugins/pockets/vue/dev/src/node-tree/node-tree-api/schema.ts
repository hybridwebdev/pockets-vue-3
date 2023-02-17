import { TreeNodeSchema, TreeNodeApi } from "./types"
import { editor } from "../editor"
export let useSchema = (api : TreeNodeApi) : TreeNodeSchema | false => {
    return editor.nodes.list.find((entry: TreeNodeSchema) => {
        return entry.node.schema == api.node.schema
    } ) ?? false
}