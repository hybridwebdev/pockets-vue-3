// @ts-nocheck

import { Node } from '@tiptap/core'

export default Node.create({
    name: 'div',
    group: 'block',
    content: 'block+',
    atom: false,
    renderHTML({ HTMLAttributes }) {
        return  [ this.name, HTMLAttributes, 0 ]
    },
    parseHTML() {
        return [
            {
                tag: this.name,
            },
        ]
    },
})
