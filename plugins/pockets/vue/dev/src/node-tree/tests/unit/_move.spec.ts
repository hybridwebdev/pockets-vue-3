import { testMove } from "./shared"

describe('Child of Target', () => {
    test('Before Target', () => {
        let { to } = testMove('root.0', 'root.0.0', 'before')
        to.test.nodes('root.1', ['root.0.1', 'root.0.2', 'root.0.3'])
    })
    test('After Target', () => {
        let { to } = testMove('root.0', 'root.0.0', 'after')
        to.test.nodes('root.0', ['root.0.1', 'root.0.2', 'root.0.3'])
    })
})

describe('Move Siblings', () => {
    test('Before - to > selected', () => {
        let { to } = testMove('root.3', 'root.0', 'before')
        to.test.nodes('root', ['root.1', 'root.2', 'root.0', 'root.3'])
    })
    test('Before - to < selected', () => {
        let { to } = testMove('root.1', 'root.2', 'before')
        to.test.nodes('root', ['root.0', 'root.2', 'root.1', 'root.3'])
    })
    test('After - to > selected', () => {
        let { to } = testMove('root.3', 'root.0', 'after')
        to.test.nodes('root', ['root.1', 'root.2', 'root.3', 'root.0'])
    })
    test('After - to < selected', () => {
        let { to } = testMove('root.0', 'root.3', 'after')
        to.test.nodes('root', ['root.0', 'root.3', 'root.1', 'root.2'])
    })
})

describe('Safety Checks', () => {
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
})

