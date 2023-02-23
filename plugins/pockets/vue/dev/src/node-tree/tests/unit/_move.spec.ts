import { moveAction } from "./shared"

test('Move Child Before Parent', () => {
    let { first } = moveAction('root.0', 'root.0.0', 'before')
    expect( first.getNode('root.0').node.el ).toBe('root.0.0')
    expect( first.getNode('root.1.0').node.el ).toBe('root.0.1')
} )


test('Move Sibling Before Target', () => {
    let { first } = moveAction('root.0.0', 'root.0.2', 'before')
    expect( first.getNode('root.0.0').node.el ).toBe('root.0.2')
    expect( first.getNode('root.0.1').node.el ).toBe('root.0.0')
    expect( first.getNode('root.0.2').node.el ).toBe('root.0.1')
} )