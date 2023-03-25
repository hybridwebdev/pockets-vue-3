// @ts-nocheck

import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './test.vue'

export let CustomNode =  Node.create({
    name: 'vue-component',
    group: 'block',
    content: 'block+',
    draggable: true,
    addAttributes() {
        return {
            content: []
        }
    },
    addCommands(){
        return {
            setTest: attributes => (editor) => {
                editor.commands.insertContentAt(editor.state.selection.$to.pos, { type: this.name, content: [
                    {
                        "type": "paragraph",
                    }
                ] } ) ;
            }
        }
    },
    renderHTML({ HTMLAttributes }) {
        return  [this.name, {}, 0]
    },
    parseHTML() {
        return [
            {
                tag: 'vue-component',
            },
        ]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
    
})

export let nodes = [
    CustomNode
]