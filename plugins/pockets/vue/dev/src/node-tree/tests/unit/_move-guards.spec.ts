import { testMove } from "./shared"
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
