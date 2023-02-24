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

export let moveBridge = (active: string, selected: string, location: dropLocations | false = false, sameTree: boolean = true ) : { 
    first: createdApi, 
    second: createdApi,
    bridge: dropApi
} => {

    /**
        if sameTree is set to false, the operaction will occur across separate trees.
    **/
    let tree = getTree()

    let trees = {
        first: tree,
        second: sameTree ? tree : getTree()
    }

    let bridge = move( trees.first.getNode(active), trees.second.getNode(selected) )

    if(location) {
        let action = bridge[location]
        if(typeof action == 'function') action()
    }

    return { ...trees, bridge }

}
