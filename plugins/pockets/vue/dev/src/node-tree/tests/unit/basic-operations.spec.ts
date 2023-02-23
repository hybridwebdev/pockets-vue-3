import { node, getTree } from "./"

let cloneSelf = () => {

    let tree = getTree()
    
    tree.getNode(['root', 0, 2]).clone.self()

    expect(
        tree.getNode(['root', 0, 2]).node.props.key
    ).toBe('root.0.2')

}

let removeSelf = () => {
    let tree = getTree()
    
    tree.getNode(['root', 0, 0]).remove.self()

    expect(
        tree.getNode(['root', 0, 0]).node.props.key
    ).toBe('root.0.1')
}

let addBefore = () => {
    let tree = getTree()
    
    tree.getNode(['root', 0, 0]).add.before(node('a new node'))

    expect(
        tree.getNode(['root', 0, 0]).node.props.key
    ).toBe('a new node')
}

let addInside = () => {
    let tree = getTree()
    
    tree.getNode(['root', 0]).add.inside( node('a new node'), 1 )

    expect(
        tree.getNode(['root', 0, 1]).node.props.key
    ).toBe('a new node')
}
let addAfter = () => {
    let tree = getTree()
    
    tree.getNode(['root', 0, 0]).add.after(node('a new node'))

    expect(
        tree.getNode(['root', 0, 1]).node.props.key
    ).toBe('a new node')
}

test('Add After', addAfter)
test('Add Before', addBefore)
test('Add Inside', addInside)

test('Remove Self', removeSelf)
test('Clone Self', cloneSelf)
