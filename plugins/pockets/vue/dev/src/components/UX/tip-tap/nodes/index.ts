// @ts-nocheck

import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './test.vue'
export let CustomNode =  Node.create({
    name: 'vueComponent',
    group: 'block',

    content: 'inline*',
    renderHTML({ HTMLAttributes }) {
        return ['vue-component', HTMLAttributes, 0]
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
    addCommands(){
        return {
            setTest: attributes => ({ commands }) => {
                console.log('yup')
                return commands.setNode(this.name, attributes)
            }
        }
    }
})

export let nodes = [
    CustomNode
]