export type path = Array<string | number>

export type move = {
    self: false | ( (to: number) => path )
    child: false | ( (from: number, to: number) => path )
}

export type add = {
    inside: false | ( (node: TreeNode, index: number) => path)
    before: false | ( (node: TreeNode) => path)
    after: false | ( (node: TreeNode) => path)
}

export type replace = {
    self: false | ( (node: TreeNode) => path)
    child: false | ( (index: number, node: TreeNode) => path)
}

export type clone = {
    self: false | ( () => path )
    child: false | ( (index: number) => path )
}

export type remove = {
    self: false | ( () => path )
    child: false | ( (index: number) => path )
}

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


export type TreeNode = {
    el: string
    nodes?: Array<TreeNode>
    props: any
    data?: any,
    schema: string
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
    selectedNodes: Array<TreeNodeApi>

}

export type TreeNodeApi = {
    [key: string ] : any
    /*
        If node is false, all other helpers disable themselves.
    */
    node: TreeNode 
    parent: TreeNodeApi
    getChild(index:number) : TreeNodeApi
    hasNodes: Boolean
    paths: paths

    schema: TreeNodeSchema
    editor: TreeEditor
    editFields: Array<TreeNodeSchemaField>

}

export type TreeNodeApiProps = {
    root: TreeNode
    source: {
        // represents where the tree is saved to or loaded from
        ID: number
        type: string
        metaKey: string
    }
}

export type paths = {
    /*
        index represents what index the node is in
    */
    index: number
    /*
        path is the initial path array passed into getNode
    */
    path: path
    parent: false | paths
    /*
        Full represents the full node path, including its source path
    */
    full: string
    /*
        Joined represents the path that can be used by dotprop get/set to read 
        the tree and find then ode. 
    */
    joined: string
}

export type createdApi = {
    getNode: ( path: path | string ) => TreeNodeApi,
    saveTree: () => Promise<any>
}