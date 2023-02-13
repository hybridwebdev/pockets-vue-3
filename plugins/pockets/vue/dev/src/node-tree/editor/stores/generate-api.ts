import { reactive, computed } from "vue"
import { $pockets } from "@/pockets"

import type { TreeData, TreeNode, TreeNodeApi, TreeNodeResolvedPath, TreeNodePathArray, TreeNodeSchema, TreeNodeSchemaField } from "@/node-tree/types"

import { editor } from "@/node-tree/editor"


let initialize = (api: TreeNodeApi) => {
    return async () => {
        try {
            let res = await $pockets.crud('node-tree/node').init(api.node).read(['initialize:<='])
            $pockets.utils.object.set( api.paths.node.resolved, res, api.tree)
        } catch(e) {

        }
    }
}

let hydrate = (api: TreeNodeApi) => {
    return async () => {
        try {
            let res = await $pockets.crud('node-tree/node').init(api.node).read(['hydrate:<='])
            $pockets.utils.object.set( api.paths.node.resolved, res, api.tree)
        } catch(e) {

        }
    }
}

let save = (api: TreeNodeApi) => {
    return async () => await $pockets.crud('node-tree/root').init(api.tree.source).update(api.tree.root)
}

let resolvePath = (path: TreeNodePathArray ) : TreeNodeResolvedPath => {
    return {
        path,
        resolved: path.join('.nodes.'),
        index: parseInt(path.slice(-1)[0]),
        joined: path.join('.'),
    }
}

let getPaths = (api:TreeNodeApi) => {
    
    let { ID, type, metaKey } = api.tree.source

    let sourcePath = [type, metaKey, ID].join('.')
    
    let parentChunks:TreeNodePathArray = api.path.slice(0, -1)

    let parent: null | TreeNodeResolvedPath = null;
    
    if(parentChunks.length != 0) {
        parent = resolvePath(parentChunks)
    }

    let node = resolvePath(api.path)

    return {
        node,
        parent,
        source: [sourcePath, node.joined ].join('.')
    }
}


let clone = (api:TreeNodeApi) => {
    
    if(!api.addSibling || !api.node) return false;

    return async(): Promise<TreeNodePathArray> => {
        if(!api.addSibling) return []
        
        return await api.addSibling( $pockets.utils.object.clone( api.node ) )
    }
}

let remove = (api:TreeNodeApi) => {
    if(!api.hasParent) return false;
    return async(): Promise<TreeNodePathArray> => {

        if(!api.parent)  return []

        api.parent.nodes = $pockets.utils.array.omit(api.parent.nodes, api.paths.node.index)
        
        /**
            do Logic here to return previous sibling or parent path
        */
        return []
    }
}

let addSibling = (api:TreeNodeApi) => {
    if(!api.hasParent) return false;
    return async(node: TreeNode, after: boolean = true): Promise<TreeNodePathArray> => {
        
        if(!api.parent || !api.paths.parent)  return []

        let { index } = api.paths.node
        let addIndex = after ? index + 1 : index 
        
        api.parent.nodes = $pockets.utils.array.insert(api.parent.nodes, addIndex, node)
        return api.paths.parent.path.concat(addIndex)
    }
}

let addInside = ( api:TreeNodeApi ) => {
    if(!api.hasNodes) return false;
    return async(node:TreeNode, addIndex: number = 0): Promise<TreeNodePathArray> => {
        
        if(!api.node)  return []

        api.node.nodes = $pockets.utils.array.insert(api.node.nodes, addIndex, node)
        
        return api.paths.node.path.concat(addIndex)
    }
}

let schema = (api:TreeNodeApi) : false | TreeNodeSchema => {
    
    /**
        in here I would change entry.node.model == api.node.model
    */


    if(!api.node) return false
    
    return editor.nodes.list.find(entry => {
        if(!api.node || !api.node.el) return false;
        return entry.node.schema == api.node.schema
    } ) ?? false
}

let editFields =  (api:TreeNodeApi) : Array<TreeNodeSchemaField> => {
    
    if(!api.schema || !api.node || !editor.nodes.fields) return []
    
    return editor.nodes.fields.filter(field => {
        if(!api.schema) return;
        return api.schema.fields.includes(field.ID)
    })


}
export let generateApi = (object:TreeData | false) : TreeNodeApi | false => {
    
    if(!object) return false;
    
    let { path, tree } = object 
    
    if(!path) return false;

    let api:TreeNodeApi = reactive( {
        
        tree,
        path: computed<TreeNodePathArray>( {
            get: () =>  path,
            /**
                path can be changed directly in the api, allowing it to traverse the tree as it needs.
            */
            set: (path) => object.path = path
        } ),

        paths: computed(() => getPaths(api) ),
        hasParent: computed( () => api.paths.parent != null),
        hasNodes: computed( () => {
            
            if(!api.node)  return false;

            return api.node.nodes && Array.isArray( api.node.nodes ) ? true : false

        } ) ,
        node: computed( () => $pockets.utils.object.get( api.paths.node.resolved, tree) ),

        parent: computed(() => {
            if(!api.hasParent || !api.paths.parent) return false;
            return $pockets.utils.object.get( api.paths.parent.resolved, tree) ?? false
        }),

        /*
            Actions
        */

        clone:      computed(()=>clone(api)),
        remove:     computed(()=>remove(api)),
        addSibling: computed(()=>addSibling(api)),
        addInside:  computed(()=>addInside(api)),

        schema: computed(() => schema(api)),
        editFields: computed(() => editFields(api) ),

        save: computed(() => save(api)),
        hydrate: computed(() => hydrate(api)),
        initialize: computed(() => initialize(api)),

    } )


    if( !api.node ) return false

    return api
    
}