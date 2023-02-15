import { editor } from "@/node-tree/editor"
import { TreeNodeSchema } from "./types"

export let useSchema = (api) : TreeNodeSchema | false => {
    return editor.nodes.list.find(entry => {
        return entry.node.schema == api.node.schema
    } ) ?? false
}