
import { Node } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/core'
export default Node.create( {
    isolating: true,
    name: 'container',
    group: 'block',
    content: 'block+',
    atom: true,
    renderHTML: ( { HTMLAttributes } ) => [ 'div', mergeAttributes(HTMLAttributes, {}), 0 ],
    parseHTML: () =>  [
        {   
            tag: "div",
        },
    ],
} )
