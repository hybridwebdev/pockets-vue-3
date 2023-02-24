import type { TreeNode, createdApi, dropLocations, dropApi } from "@/node-tree/types"

import { createApi } from "@/node-tree/create-tree-api"
import { move } from "@/node-tree/create-tree-api/bridges/move"

export let node = (key: string ) : TreeNode => ( {
    el: key,
    props: {},
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
        /*
            Meta key is randomized so that full path is will be unique for each tree instance
        */
        metaKey:  (Math.random() + 1).toString(36).substring(2) 
    }
} )

export let testMove = (active: string, selected: string, location: dropLocations | false = false, sameTree: boolean = true ) : { 
    expectNode: ((path: string, toBe: string, tree?: "first" | "second" ) => void ),
    dropApi: dropApi,
    trees: {
        first: createdApi,
        second: createdApi
    }
} => {

    /**
        if sameTree is set to false, the operaction will occur across separate trees.
    **/
    let tree = getTree()

    let trees = {
        first: tree,
        second: sameTree ? tree : getTree()
    }

    let dropApi = move( trees.first.getNode(active), trees.second.getNode(selected) )

    if(location) {
        let action = dropApi[location]
        if(typeof action == 'function') action()
    }

    return {
        trees,
        expectNode: (path: string, toBe: string, tree = "first") => expect( trees[tree].getNode(path).node.el ).toBe(toBe),
        dropApi 
    }

}
