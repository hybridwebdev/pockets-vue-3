export type path = Array<string | number>

export type add = {
    inside: false | ( (node: TreeNode, index: number) => path)
    before: false | ( (node: TreeNode) => path)
    after: false | ( (node: TreeNode) => path)
}

export type clone = {
    self: false | ( () => path )
    node: false | ( (index: number) => path )
}

export type remove = {
    self: false | ( () => path )
    node: false | ( (index: number) => path )
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

export type TreeNodeApi = {
    [key: string] : any
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