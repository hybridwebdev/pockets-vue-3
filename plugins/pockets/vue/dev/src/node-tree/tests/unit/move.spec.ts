import { getTree } from "./"
import { move } from "@/node-tree/create-tree-api/bridges/move"
import type { path } from "@/node-tree/types"

let moveBridge = (active: path, selected: path) => {
    let tree = getTree()
    return {
        tree,
        ...move( tree.getNode(active), tree.getNode(selected) )
    }
}
let moveTest = () => {
    let { tree, before } = moveBridge(['root', 0], ['root', 0, 0])
    
    expect(typeof before).toBe('function')
    
    if(typeof before != 'function') return;


    before()
    
    expect(
        tree.getNode(['root', 0]).node.props.key 
    ).toBe('root.0.0')
    
    expect(
        tree.getNode(['root', 1, 0]).node.props.key 
    ).toBe('root.0.1')

}

test('Move', moveTest)