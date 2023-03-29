import { Node } from '@tiptap/core'

export default Node.create( {
    name: 'paragraph',
    group: 'block',
    content: 'inline*',
    parseHTML: () => [ { tag: 'p' } ],
    renderHTML: ( { HTMLAttributes } ) => ['p', HTMLAttributes, 0]
} )