import { testMove } from "./shared"
 describe('Move - After', () => {
    describe('Children', () => {
        test('Child of target to target', () => {
            let { to } = testMove('root.0', 'root.0.0', 'after')
            to.test.node('root.1', 'root.0.0')
            to.test.nodes('root', ['root.0', 'root.0.0', 'root.1', 'root.2', 'root.3'])
        })
        test('Child of another parent to target', () => {
            let { to } = testMove('root.0', 'root.1.0', 'after')
            to.test.node('root.1', 'root.1.0')
        })
        test('Mother fucking shit', () => {
            let { to } = testMove('root.1', 'root.1.0', 'after')
            to.test.nodes('root', ['root.0', 'root.1', 'root.1.0', 'root.2', 'root.3'])
        })
    })
    describe("Siblings", () => {
        test('Siblings - To End - test 1', () => {
            let { to } = testMove('root.3', 'root.2', 'after')
            to.test.nodes('root', ['root.0', 'root.1', 'root.3', 'root.2'])
        })
        test('Siblings - To End 2 - test 2', () => {
            let { to } = testMove('root.3', 'root.0', 'after')
            to.test.nodes('root', ['root.1', 'root.2', 'root.3', 'root.0'])
        })
        test('Siblings - Target > Selected', () => {
            let { to } = testMove('root.0', 'root.2', 'after')
            to.test.nodes('root', ['root.0', 'root.2', 'root.1', 'root.3'])
        })
        test('Siblings - Selected > Target - test 1', () => {
            let { to } = testMove('root.2', 'root.0', 'after')
            to.test.nodes('root', ['root.1', 'root.2', 'root.0', 'root.3'])
        })
        test('Siblings - Selected > Target - test 2', () => {
            let { to } = testMove('root.2', 'root.1', 'after')
            to.test.nodes('root', ['root.0', 'root.2', 'root.1', 'root.3'])
        })
    })
 })


