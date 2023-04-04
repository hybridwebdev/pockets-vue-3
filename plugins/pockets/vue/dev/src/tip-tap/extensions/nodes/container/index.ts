
import { Node } from '@tiptap/core'

export default Node.create( {
    isolating: true,
    name: 'container',
    group: 'block',
    content: 'block*',
    renderHTML: ( { HTMLAttributes } ) => [ 'div', HTMLAttributes, 0 ],
    parseHTML: () =>  [
        {   
            tag: "div",
        },
    ],
} )
