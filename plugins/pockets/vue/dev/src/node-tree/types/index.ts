export type path = Array<string | number>

export type move = {
    self: false | ( (to: number) => path )
    child: false | ( (from: number, to: number) => path )
}

export type replace = {
    self: false | ( (node: TreeNode) => path)
    child: false | ( (index: number, node: TreeNode) => path)
}

export type add = {
    inside: false | ( (node: TreeNode, index: number) => TreeNode | false)
    before: false | ( (node: TreeNode) => TreeNode | false)
    after: false | ( (node: TreeNode) => TreeNode | false)
}

export type clone = {
    self: false | ( () => TreeNode | false )
    child: false | ( (index: number) => TreeNode | false )
}

export type remove = {
    self: false | ( () => boolean )
    child: false | ( (index: number) => boolean )
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
    hash?: string
}

export type TreeNodeProxied = TreeNode & {
    /**
        comprised of properties created by ObservableSlim
    */
    __getPath: string
    __getParent: ( () => any )
    __targetPosition: number
}

export type TreeEditor = {

    show: Boolean
    mode: "edit" | "remove" | "clone" | "add" | "move" | "copy"
    
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

    node: TreeNode
    parent: TreeNodeApi
    schema: TreeNodeSchema
    editor: TreeEditor
    editFields: Array<TreeNodeSchemaField>

}

export type TreeNodeApiProps = {
    root: TreeNode
    source: {
        /*
            represents where the tree is saved to or loaded from
        */
        ID: number
        type: string
        metaKey: string
    }
}

export type createdApi = {
    saveTree: () => Promise<any>
    getNodeApi: ( node: TreeNodeProxied ) => any
}

export type dropLocations = "before" | "after" | "inside"

export type dropApi = {
    inside: boolean | ( () => path )
    before: boolean | ( () => path )
    after : boolean | ( () => path )
}