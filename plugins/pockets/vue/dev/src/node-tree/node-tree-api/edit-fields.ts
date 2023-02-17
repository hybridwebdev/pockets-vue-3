import { TreeNodeApi,  TreeNodeSchemaField } from "./types"
import { editor } from "../editor"
export let useEditFields = (api:TreeNodeApi) : Array<TreeNodeSchemaField> => {
    
    if(!api.schema || !api.node || !editor.nodes.fields) return []
    
    return editor.nodes.fields.filter((field: TreeNodeSchemaField) => {
        return api.schema.fields.includes(field.ID)
    })

}