import { TreeNodeApi,  TreeNodeSchemaField } from "@/node-tree/types"

export let useEditFields = (api:TreeNodeApi) : Array<TreeNodeSchemaField> => {
    
    if(!api.schema || !api.node || !api.editor.nodes.fields) return []
    
    return api.editor.nodes.fields.filter((field: TreeNodeSchemaField) => {
        if(!api.schema) return;
        return api.schema.fields.includes(field.ID)
    })

}