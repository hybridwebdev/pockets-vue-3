import type { TreeNode, createdApi, dropLocations, dropApi } from "@/node-tree/types"

import { createApi } from "@/node-tree/create-tree-api"
import { move } from "@/node-tree/create-tree-api/bridges/move"

type testCreatedApi = createdApi & {
    test: {
        node: ( ( path: string, toBe: string ) => any )
        nodes: ( ( path: string, arr: Array<string> ) => any )
    }
}

export let node = (key: string ) : TreeNode => ( {
    el: key,
    props: {},
    schema: "test",
} )

export let getTree = () : testCreatedApi => {
    let tree = createApi( {
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
                {
                    ...node("root.1"),
                    nodes: [
                        node("root.1.0"),
                        node("root.1.1"),
                        node("root.1.2"),
                    ]
                },
                {
                    ...node("root.2"),
                    nodes: [
                        node("root.2.0"),
                        node("root.2.1"),
                        node("root.2.2"),
                    ]
                },
            ]
        },
        source: {
            ID: -1,
            type: "test",
            /*
                Meta key is randomized so that full path will be unique for each tree instance.
            */
            metaKey:  ( Math.random() + 1 ).toString(36).substring(2) 
        }
    } )

    return {
        ...tree,
        test: {
            node: (path: string, toBe: string) => expect( tree.getNode(path).node.el ).toBe(toBe),
            nodes: (path: string, arr: Array<string>) => expect( tree.getNode(path).node.nodes?.map(e=>e.el) ).toStrictEqual(arr),
        }
    }
}

export let testMove = (
    to: string, 
    from: string, 
    location: dropLocations | false = false, 
    /**
        If location argument is provided, it will automatically run the action for that slot
    */
    sameTree: boolean = true 
) : { 
    dropApi: dropApi,
    to: testCreatedApi,
    from: testCreatedApi
} => {
    /**
        if sameTree is set to false, the operaction will occur across separate trees.
    **/
    let tree = getTree()

    let trees = {
        to: tree,
        from: sameTree ? tree : getTree()
    }

    let dropApi = move( trees.to.getNode(to), trees.from.getNode(from) )

    if(location) {
        let action = dropApi[location]
        if(typeof action == 'function') action()
    }

    return {
        ...trees,
        dropApi 
    }

}
