import { testMove } from "./shared"
 describe('Move - After', () => {
    test('Child of target to target', () => {
        let { to } = testMove('root.0', 'root.0.0', 'after')
        to.test.node('root.1', 'root.0.0')
    })
    test('Child of another parent to target', () => {
        let { to } = testMove('root.0', 'root.1.0', 'after')
        to.test.node('root.1', 'root.1.0')
    })
    test('Siblings - Target > Selected', () => {
        let { to } = testMove('root.0', 'root.2', 'after')
        to.test.nodes('root', ['root.0', 'root.2', 'root.1', 'root.3'])
    })
    test('Siblings - Selected > Target', () => {
        let { to } = testMove('root.2', 'root.0', 'after')
        to.test.nodes('root', ['root.1', 'root.2', 'root.0', 'root.3'])
    })

 })


