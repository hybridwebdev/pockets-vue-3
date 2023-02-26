import { testMove } from "./shared"

describe('Safety Checks', () => {
    test('Try and move A node inside itself', () => {
        let { to, dropApi } = testMove('root.0.0', 'root.0', 'inside')
        to.test.node('root.0.0', 'root.0.0')
        to.test.node('root.0', 'root.0')
        dropApi.test({
            inside: false
        })
    })
    test('Target and Selected are the same', () => {
        let { dropApi, to } = testMove('root.0.0', 'root.0.0')
        to.test.node('root.0.0', 'root.0.0')
        dropApi.test({ 
            before: false,
            after: false,
            inside: false
        })
    })
})
describe('Placement Checks', () => {
     test('2 -> 3', () => {
        let { dropApi } = testMove('root.3', 'root.2')
        dropApi.test({
            before: false,
            after: "function",
        })
    })
    test('0 -> 1', () => {
        let { dropApi } = testMove('root.1', 'root.0')
        dropApi.test({
            before: false,
            after: "function",
        })
    })
    test('0 -> 2', () => {
        let { dropApi } = testMove('root.2', 'root.0')
        dropApi.test({
            before: "function",
            after: "function",
        })
    })
    test('1 -> 0', () => {
        let { dropApi } = testMove('root.0', 'root.1')
        dropApi.test({
            before: "function",
            after: false,
        })
    })
})