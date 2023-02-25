import { testMove } from "./shared"
 describe('Move - After', () => {
    test('Child of target to after target', () => {
        let { to } = testMove('root.0', 'root.0.0', 'after')
        to.test.node('root.1', 'root.0.0')
    })
 })


