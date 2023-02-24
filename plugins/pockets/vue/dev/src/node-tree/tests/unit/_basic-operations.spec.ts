import { node, testBasic } from "./shared"
 
test('Add After', () => {
    let tree = testBasic()
    tree.getNode('root.0.0').add.after( node('a new node') )
    tree.test.node( 'root.0.1' ).toBe('a new node')
})

test('Add Before', () => {
    let tree =  testBasic()
    tree.getNode('root.0.0').add.before( node('a new node') )
    tree.test.node( 'root.0.0' ).toBe('a new node')
})

test('Add Inside', () => {
    let tree =  testBasic()
    tree.getNode('root.0').add.inside( node('a new node'), 2 )
    tree.test.node( 'root.0.2' ).toBe('a new node')
})

test('Remove', () => {
    let tree = testBasic()
    tree.getNode('root.0.0').remove.self()
    tree.test.node('root.0.0').toBe('root.0.1')
})

test('Clone', () => {
    let tree = testBasic()
    tree.getNode('root.0.2').clone.self()
    tree.test.node( 'root.0.3' ).toBe('root.0.2')
})
