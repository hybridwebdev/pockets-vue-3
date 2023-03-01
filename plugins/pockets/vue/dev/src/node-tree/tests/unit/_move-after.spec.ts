import { testMove } from "./shared"
 describe('Move - After', () => {
    describe('Children', () => {
        test('Child of target 1', () => {
            let { to, $path } = testMove('root.0', 'root.0.0', 'after')
            to.test.nodes('root', ['root.0', 'root.0.0', 'root.1', 'root.2', 'root.3'])
            expect($path).toBe('root.1')
        })
        test('Child of target 2', () => {
            let { to, $path } = testMove('root.1', 'root.1.0', 'after')
            to.test.nodes('root', ['root.0', 'root.1', 'root.1.0', 'root.2', 'root.3'])
            expect($path).toBe('root.2')
        })
        test('Child of another parent to target 1', () => {
            let { to, $path } = testMove('root.0', 'root.1.0', 'after')
            to.test.node('root.1', 'root.1.0')
            expect($path).toBe('root.1')
        })
    })
    describe("Siblings", () => {
        test('Siblings - To End - test 1', () => {
            let { to, $path } = testMove('root.3', 'root.2', 'after')
            to.test.nodes('root', ['root.0', 'root.1', 'root.3', 'root.2'])
            expect($path).toBe('root.3')
        })
        test('Siblings - To End 2 - test 2', () => {
            let { to, $path } = testMove('root.3', 'root.0', 'after')
            to.test.nodes('root', ['root.1', 'root.2', 'root.3', 'root.0'])
            expect($path).toBe('root.3')
        })
        test('Siblings - Target > Selected - test 1', () => {
            let { to, $path } = testMove('root.0', 'root.2', 'after')
            to.test.nodes('root', ['root.0', 'root.2', 'root.1', 'root.3'])
            expect($path).toBe('root.1')
        })
        test('Siblings - Target > Selected - test 2', () => {
            let { to, $path } = testMove('root.1', 'root.3', 'after')
            to.test.nodes('root', ['root.0', 'root.1', 'root.3', 'root.2'])
            expect($path).toBe('root.2')
        })
        test('Siblings - Selected > Target - test 1', () => {
            let { to, $path } = testMove('root.2', 'root.0', 'after')
            to.test.nodes('root', ['root.1', 'root.2', 'root.0', 'root.3'])
            expect($path).toBe('root.2')
        })
        test('Siblings - Selected > Target - test 2', () => {
            let { to, $path } = testMove('root.2', 'root.1', 'after')
            to.test.nodes('root', ['root.0', 'root.2', 'root.1', 'root.3'])
            expect($path).toBe('root.2')
        })
    })
 })


