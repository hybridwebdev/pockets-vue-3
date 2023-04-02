// @ts-nocheck

import { Node } from '@tiptap/core'

export default Node.create( {
    name: 'container',
    group: 'block',
    content: 'block*',
    renderHTML({ HTMLAttributes }) {
        return  [ 'div', HTMLAttributes, 0 ]
    },
    parseHTML() {
        return [
            {
                tag: 'div',
            },
        ]
    },
} )
