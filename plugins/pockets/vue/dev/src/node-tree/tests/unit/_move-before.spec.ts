import { testMove } from "./shared"

describe("Move - Before", () => {
    describe('Children', () => {
        test('Child of target to target', () => {
            let { to, $path } = testMove('root.0', 'root.0.0', 'before')
            to.test.node('root.0', 'root.0.0')
            to.test.node('root.1', 'root.0')
            expect($path).toBe('root.0')
        })
        test('Child of another parent to target', () => {
            let { to, $path } = testMove('root.0', 'root.1.0', 'before')
            to.test.node('root.0', 'root.1.0')
            to.test.node('root.1', 'root.0')
            expect($path).toBe('root.0')
        })
    })
    describe("Siblings", () => {
        test('Siblings < target', () => {
            let { to, $path } = testMove('root.2', 'root.0', 'before')
            to.test.nodes('root', ['root.1', 'root.0', 'root.2', 'root.3'])
            expect($path).toBe('root.1')
        })
        test('Siblings to > target', () => {
            let { to, $path } = testMove('root.0', 'root.2', 'before')
            to.test.nodes('root', ['root.2', 'root.0', 'root.1', 'root.3'])
            expect($path).toBe('root.0')
        })
    })
})
