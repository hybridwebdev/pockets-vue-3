import type { TreeNode, createdApi } from "@/node-tree/types"
import { createApi } from "@/node-tree/create-tree-api"

export let node = (key: string ) : TreeNode => ( {
    el: "test",
    props: {
        key
    },
    schema: "test",
} )

export let getTree = () : createdApi => createApi( {
    root: {
        el: "div",
        props: {},
        schema: 'container',
        nodes: [
            {
                ...node("root.0"),
                nodes: [
                    node("root.0.0"),
                    node("root.0.1"),
                    node("root.0.2"),
                ]
            },
            node("root.1"),
            node("root.2"),
        ]
    },
    source: {
        ID: -1,
        type: "test",
        metaKey: "test"
    }
} )
