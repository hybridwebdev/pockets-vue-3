import type { TreeNode, createdApi, dropLocations, dropApi, path } from "@/node-tree/types"
import { reactive, computed } from "vue"
import { createApi } from "@/node-tree/create-tree-api"
import { move } from "@/node-tree/create-tree-api/bridges/move"
 
type testCreatedApi = createdApi & {
    test: {
        node: ( ( path: string, toBe: string ) => void )
        nodes: ( ( path: string, arr: Array<string> ) => void )
    }
}
type testMoveApiTestArgs = {
    inside?: boolean | string
    before?: boolean | string
    after?: boolean | string
}
type testDropApi = dropApi & {
    test: ( ( test: testMoveApiTestArgs) => void ) 
}
type testMoveApi = {
    dropApi: testDropApi,
    to: testCreatedApi,
}

export let node = (key: string ) : TreeNode => ( {
    el: key,
    props: {},
    schema: "test",
} )

export let getTree = () : testCreatedApi => {

    let state = {
        root: reactive({
            el: "div",
            props: {},
            schema: 'container',
            nodes: [
                //
                {
                    ...node("root.0"),
                    nodes: [
                        node("root.0.0"),
                        node("root.0.1"),
                        node("root.0.2"),
                        node("root.0.3"),
                    ]
                },
                //
                {
                    ...node("root.1"),
                    nodes: [
                        node("root.1.0"),
                        node("root.1.1"),
                        node("root.1.2"),
                        node("root.1.3"),
                    ]
                },
                {
                    ...node("root.2"),
                    nodes: [
                        node("root.2.0"),
                        node("root.2.1"),
                        node("root.2.2"),
                        node("root.2.3"),
                    ]
                },
                {
                    ...node("root.3"),
                    nodes: [
                        node("root.3.0"),
                        node("root.3.1"),
                        node("root.3.2"),
                        node("root.3.3"),
                    ]
                },
            ]
        }),
        source: {
            ID: 0,
            type: "test",
            /*
                Meta key is randomized so that full path will be unique for each tree instance.
            */
            metaKey:  ( Math.random() + 1 ).toString(36).substring(2) 
        }
    } 
    
    let tree = createApi(state)

    Object.assign(tree, {
        test: {
            node: (path: string | path, toBe: string | path) => expect( tree.getNode(path).node.el ).toBe(toBe),
            nodes: (path: string | path, arr: Array<string>) => expect( tree.getNode(path).node.nodes?.map(e=>e.el) ).toStrictEqual(arr),
        }
    })

    return tree as testCreatedApi

}

export let createTestDropApi = (dropApi: dropApi) : testDropApi=> {
    let test = (test: testMoveApiTestArgs) => {
        Object.entries(test).map(([key, value]) => {
            let type = typeof value
            if( type == 'boolean' ) expect( dropApi[key] ).toBe(false)    
            if( type == 'string' ) expect( typeof dropApi[key] ).toBe('function')
        } )
    } 
    Object.assign(dropApi, {
        test
    })
    return dropApi as testDropApi
}
export let testMove = (
    to: string | path, 
    from: string | path, 
    location: dropLocations | false = false, 
    /**
        If location argument is provided, it will automatically run the action for that slot
    */
    sameTree: boolean = true 
) : testMoveApi  => {

    let tree = getTree()

    let states = reactive({
        to: tree.getNode(to),
        from: tree.getNode(from)
    })
    let dropApi = createTestDropApi( move( states.to, states.from ) )

    if(location) {
        let action = dropApi[location]
        if(typeof action == 'function') action()
    }

    return {
        to: tree,
        dropApi
    }

}
