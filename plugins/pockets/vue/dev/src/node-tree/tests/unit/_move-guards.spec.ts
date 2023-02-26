import { testMove } from "./shared"

describe('Safety Checks', () => {
    test('Try and move A node inside itself', () => {
        let { to, dropApi } = testMove('root.0.0', 'root.0', 'inside')
        to.test.node('root.0.0', 'root.0.0')
        expect(dropApi.inside).toBe(false)

        dropApi.test({
            before: false,
            after: false,
            inside: "function"
        })

    })
    test('Target and Selected are the same', () => {
        let { dropApi } = testMove('root.0.0', 'root.0.0')
        expect(dropApi.after).toBe(false)
        expect(dropApi.inside).toBe(false)
        expect(dropApi.before).toBe(false)
    })
})
describe('Placement Checks', () => {
    test('Sibling Adjacent - Target > Selected', () => {
        let { dropApi } = testMove('root.0', 'root.1')
        expect(dropApi.after).toBe(false)
        expect(typeof dropApi.before).toBe('function')
        expect(typeof dropApi.inside).toBe('function')
    })
    test('Sibling Adjacent - Selected < Target', () => {
        let { dropApi } = testMove('root.1', 'root.0')
        expect(dropApi.before).toBe(false)
        expect(typeof dropApi.after).toBe('function')
        expect(typeof dropApi.inside).toBe('function')
    })
})