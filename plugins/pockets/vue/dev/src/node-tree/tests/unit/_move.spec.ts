import { testMove } from "./shared"

test('Child Before Target', () => {
    let { to } = testMove('root.0', 'root.0.0', 'before')
    to.test.nodes('root.1', ['root.0.1', 'root.0.2'])
} )

test('Child After Target', () => {
    let { to } = testMove('root.0', 'root.0.0', 'after')
    to.test.nodes('root.0', ['root.0.1', 'root.0.2'])
} )

test('Sibling left of Target', () => {
    let { to } = testMove('root.0.0', 'root.0.2', 'before')
    to.test.nodes('root.0', ['root.0.2', 'root.0.0', 'root.0.1'])
} )

test('Sibling Right of Target', () => {
    let { to } = testMove('root.0.0', 'root.0.2', 'after')
    to.test.nodes('root.0', ['root.0.0', 'root.0.2', 'root.0.1'])
} )

test('Try and move A node inside itself', () => {
    let { to, dropApi } = testMove('root.0.0', 'root.0', 'inside')
    to.test.node('root.0.0', 'root.0.0')
    expect(dropApi.inside).toBe(false)
})

test('Target and Selected are the same', () => {
    let { dropApi } = testMove('root.0.0', 'root.0.0')
    expect(dropApi.after).toBe(false)
    expect(dropApi.inside).toBe(false)
    expect(dropApi.before).toBe(false)
})