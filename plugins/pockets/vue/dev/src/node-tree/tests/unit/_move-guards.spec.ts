import { testMove } from "./shared"

describe('Safety Checks', () => {
    test('Try and move A node inside itself', () => {
        let { to, dropApi } = testMove('root.0.0', 'root.0', 'inside')
        to.test.node('root.0.0', 'root.0.0')
        dropApi.test({
            before: false,
            after: false,
            inside: false
        })
    })
    test('Target and Selected are the same', () => {
        let { dropApi } = testMove('root.0.0', 'root.0.0')
        dropApi.test({ 
            before: false,
            after: false,
            inside: false
        })
    })
})
describe('Placement Checks', () => {
    test('Sibling Adjacent - Target > Selected', () => {
        let { dropApi } = testMove('root.0', 'root.1')
        dropApi.test({
            before: "function",
            after: false,
            inside: "function",
        })
    })
    test('Sibling Adjacent - Selected < Target', () => {
        let { dropApi } = testMove('root.1', 'root.0')
        dropApi.test({
            before: false,
            after: "function",
            inside: "function"
        })
    })
})