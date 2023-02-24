import { testMove } from "./shared"

test('Move Child Before Parent', () => {
    let { expectNode } = testMove('root.0', 'root.0.0', 'before')
    expectNode('root.0', 'root.0.0')
    expectNode('root.1.0', 'root.0.1')

} )

test('Move Sibling Before Target', () => {
    let { expectNode } = testMove('root.0.0', 'root.0.2', 'before')
    expectNode('root.0.0', 'root.0.2')
    expectNode('root.0.1', 'root.0.0')
    expectNode('root.0.2', 'root.0.1')
} )

test('Try and move A node inside itself', () => {
    let { dropApi } = testMove('root.0.0', 'root.0')
    expect(dropApi.inside).toBe(false)
})

test('Target and Selected are the same', () => {
    let { dropApi } = testMove('root.0.0', 'root.0.0')
    expect(dropApi.after).toBe(false)
    expect(dropApi.inside).toBe(false)
    expect(dropApi.before).toBe(false)
})