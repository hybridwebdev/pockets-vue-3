export type path = Array<string | number>

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
    nodes?: Record<number, TreeNode>
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
    /**
        selected is used for moving/dragging/cutting a node
    */
    selectedNodes: Array<TreeNodeApi | false> 
    
}

export type TreeNodeApi = {
    [key: string ] : any
    node: TreeNode 
    /*
        If node is false, all other helpers disable themselves.
    */
    parent: TreeNodeApi
    getChild(index:number) : TreeNodeApi
    schema: TreeNodeSchema
    hasNodes: Boolean
    index: number 
    editor: TreeEditor

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
