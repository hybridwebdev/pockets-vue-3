import { testMove } from "./shared"

test('Child Before Target', () => {
    let { target } = testMove('root.0', 'root.0.0', 'before')
    target.test.node('root.0').toBe('root.0.0')
    target.test.node('root.1.0').toBe('root.0.1')
} )

// test('Child After Target', () => {
//     let { expectNode } = testMove('root.0', 'root.0.0', 'after')
//     expectNode('root.0').toBe('root.0')
//     expectNode('root.1').toBe('root.0.0')
// } )

// test('Sibling left of Target', () => {
//     let { expectNode } = testMove('root.0.0', 'root.0.2', 'before')
//     expectNode('root.0.0').toBe('root.0.2')
//     expectNode('root.0.1').toBe('root.0.0')
// } )

// test('Sibling Right of Target', () => {
//     let { expectNode } = testMove('root.0.0', 'root.0.2', 'after')
//     expectNode('root.0.0').toBe('root.0.0')
//     expectNode('root.0.1').toBe('root.0.2')
// } )

// test('Try and move A node inside itself', () => {
//     let { dropApi, expectNode } = testMove('root.0.0', 'root.0', 'inside')
    
//     expectNode('root.0.0').toBe( 'root.0.0')
//     expect(dropApi.inside).toBe(false)
// })

// test('Target and Selected are the same', () => {
//     let { dropApi } = testMove('root.0.0', 'root.0.0')
//     expect(dropApi.after).toBe(false)
//     expect(dropApi.inside).toBe(false)
//     expect(dropApi.before).toBe(false)
// })