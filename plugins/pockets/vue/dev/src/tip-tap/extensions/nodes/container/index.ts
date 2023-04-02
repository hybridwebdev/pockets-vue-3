
import { Node } from '@tiptap/core'

export default Node.create( {
    name: 'container',
    group: 'block',
    content: 'block*',
    renderHTML: ({ HTMLAttributes, node }) => [ 'div', HTMLAttributes, 0 ],
    parseHTML: () =>  [
        {   
            tag: "div",
        },
    ],
} )
