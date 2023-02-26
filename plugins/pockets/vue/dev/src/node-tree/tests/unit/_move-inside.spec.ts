import { testMove } from "./shared"

describe('Move Inside', () => {
    test('Bug', () => {
        let { to } = testMove('root.2', 'root.0.0', 'inside')
        to.test.node('root.1', 'root.2')
    })
    test('Child of another parent', () => {
        let { to } = testMove('root.0', 'root.1.1', 'inside')
        to.test.nodes('root.0', ['root.1.1', 'root.0.0', 'root.0.1', 'root.0.2', 'root.0.3'])
    })
    test('Move Sibling in root', () => {
        let { to } = testMove('root', 'root.1', 'inside')
        to.test.nodes('root', ['root.1', 'root.0', 'root.2', 'root.3'])
    })
})