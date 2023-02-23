import { getTree } from "./"
import { move } from "@/node-tree/create-tree-api/bridges/move"
import type { dropAreas, createdApi } from "@/node-tree/types"

let moveBridge = (active: string, selected: string, location: dropAreas ) : createdApi => {

    let tree = getTree()

    let bridge = move( tree.getNode(active), tree.getNode(selected) )

    let action = bridge[location]

    expect(typeof action).toBe('function')

    if(typeof action == 'function') action()

    return tree

}
let moveTest = () => {
    
    let tree = moveBridge('root.0', 'root.0.0', 'before')
    
    expect( tree.getNode('root.0').node.el ).toBe('root.0.0')
    
    expect( tree.getNode('root.1.0').node.el ).toBe('root.0.1')

}

test('Move', moveTest)