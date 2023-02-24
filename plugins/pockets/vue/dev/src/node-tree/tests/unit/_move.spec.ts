import { moveBridge } from "./shared"

test('Move Child Before Parent', () => {
    let { first } = moveBridge('root.0', 'root.0.0', 'before')
    expect( first.getNode('root.0').node.el ).toBe('root.0.0')
    expect( first.getNode('root.1.0').node.el ).toBe('root.0.1')

    //first.expect('', '')

} )

test('Move Sibling Before Target', () => {
    let { first } = moveBridge('root.0.0', 'root.0.2', 'before')
    expect( first.getNode('root.0.0').node.el ).toBe('root.0.2')
    expect( first.getNode('root.0.1').node.el ).toBe('root.0.0')
    expect( first.getNode('root.0.2').node.el ).toBe('root.0.1')
} )

test('Try and move A node inside itself', () => {
    let { bridge } = moveBridge('root.0.0', 'root.0')
    expect(bridge.inside).toBe(false)
})

test('Target and Selected are the same', () => {
    let { bridge } = moveBridge('root.0.0', 'root.0.0')

    expect(bridge.after).toBe(false)
    expect(bridge.inside).toBe(false)
    expect(bridge.before).toBe(false)

})