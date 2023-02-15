
export let useEditFields = (api) : any => {
    
    if(!api.schema || !api.editor.nodes.fields) return []
    
    return api.editor.nodes.fields.filter(field => {
        if(!api.schema) return;
        return api.schema.fields.includes(field.ID)
    })


}