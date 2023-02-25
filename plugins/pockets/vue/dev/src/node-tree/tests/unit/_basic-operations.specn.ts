import { node, getTree } from "./shared"
 
describe('Adding a new node', () => {
    test('Before', () => {
        let tree =  getTree()
        tree.getNode('root.0.0').add.before( node('a new node') )
        tree.test.node( 'root.0.0', 'a new node' )
    })
    test('After', () => {
        let tree = getTree()
        tree.getNode('root.0.0').add.after( node('a new node') )
        tree.test.node( 'root.0.1', 'a new node' )
    })
    test('Inside', () => {
        let tree =  getTree()
        tree.getNode('root.0').add.inside( node('a new node'), 2 )
        tree.test.node( 'root.0.2', 'a new node' )
    })
}) 

test('Remove', () => {
    let tree = getTree()
    tree.getNode('root.0.0').remove.self()
    tree.test.node('root.0.0', 'root.0.1')
})

test('Clone', () => {
    let tree = getTree()
    tree.getNode('root.0.2').clone.self()
    tree.test.node( 'root.0.3', 'root.0.2' )
})
