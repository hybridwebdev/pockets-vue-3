import { node, getTree } from "./shared"
 
test('Add After', () => {
    let tree = getTree()
    tree.getNode('root.0.0').add.after( node('a new node') )
    expect( tree.getNode('root.0.1').node.el ).toBe('a new node')
})

test('Add Before', () => {
    let tree = getTree()
    tree.getNode('root.0.0').add.before( node('a new node') )
    expect( tree.getNode('root.0.0').node.el ).toBe('a new node')
})

test('Add Inside', () => {
    let tree = getTree()
    tree.getNode('root.0').add.inside( node('a new node'), 2 )
    expect( tree.getNode( 'root.0.2' ).node.el ).toBe('a new node')
})

test('Remove', () => {
    let tree = getTree()
    tree.getNode('root.0.0').remove.self()
    expect( tree.getNode('root.0.0').node.el ).toBe('root.0.1')
})

test('Clone', () => {
    let tree = getTree()
    tree.getNode('root.0.2').clone.self()
    expect( tree.getNode('root.0.3').node.el ).toBe('root.0.2')
})
