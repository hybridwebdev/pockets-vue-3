import { TreeNodeApi,  TreeNodeSchemaField } from "@/node-tree/types"
import { editor } from "@/node-tree/editor"
export let useEditFields = (api:TreeNodeApi) : Array<TreeNodeSchemaField> => {
    
    if(!api.schema || !api.node || !editor.nodes.fields) return []
    
    return editor.nodes.fields.filter((field: TreeNodeSchemaField) => {
        return api.schema.fields.includes(field.ID)
    })

}