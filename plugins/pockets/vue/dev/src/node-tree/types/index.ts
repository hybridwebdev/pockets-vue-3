
export type TreeNodeSchemaField = {
    ID: string // should be a unique ID. 
    content: string // content of the edit field. 
    group: string // group field belongs to. 
}

export type TreeNodeSchema = {

    title: string // used for displaying node

    fields: Array<TreeNodeSchemaField['ID']>
    node: TreeNode
    
}


export type TreeData = {
    path: TreeNodePathArray
    tree: {
        root: TreeNode
        source: {
            // represents where the tree is saved to or loaded from
            ID: number
            type: string
            metaKey: string
        }
    }
}

export type TreeEditor = {

    show: Boolean
    mode: "edit" | 'remove' | "clone" | "add"
    
    options?: {
        "editor-active": Boolean
    }

    nodes: {
        list: Array<TreeNodeSchema>
        fields: Array<TreeNodeSchemaField>
    }

    active: TreeNodeApi | false
    /**
        selected is used for moving/dragging/cutting a node
    */
    selectedNodes: Array<TreeNodeApi | false> 
    
    setActiveNode(o:TreeData) : void
    selectNode(o:TreeData) : void
    
}

export type TreeNode = {
    el: string
    nodes?: Record<number, TreeNode>
    props: any
    data?: any,
    schema: string
}

export type TreeNodeApi = TreeData & {

    /**
        activateInfo is an object that can be directly passed to generateApi
    */
    activateInfo: {
        tree: TreeData['tree'],
        path: TreeNodePathArray
    }

    paths: {
        node: TreeNodeResolvedPath
        parent: TreeNodeResolvedPath | null
        source: string // full qualified path
        parentSource: string | null // full qualified path
    }
    
    tree: TreeData['tree']
    node: TreeNode | false
    parent: TreeNode | false
    hasParent: boolean
    hasNodes: boolean
    /**
    * Actions
    */
    clone: false | ( () => Promise<TreeNodePathArray> )
    addInside: false | ( (node:TreeNode, addIndex: number) => Promise<TreeNodePathArray> )
    remove: false | ( () => Promise<TreeNodePathArray>)
    addSibling: false | ( ( node: TreeNode, after?: boolean) => Promise<TreeNodePathArray> )

    save: () => Promise<any>
    hydrate: () => Promise<any>
    initialize: () => Promise<any>
    /**
    */
    schema: TreeNodeSchema | false
    editFields: Array<TreeNodeSchemaField>  
} 
    
export type TreeNodeResolvedPath = {
    path: TreeNodePathArray
    resolved: string
    index: number
    joined: string
    
}


export type TreeNodePathArray = Record<string | number, any>

