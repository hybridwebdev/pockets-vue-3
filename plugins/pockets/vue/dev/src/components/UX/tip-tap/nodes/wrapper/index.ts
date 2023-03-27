import Paragraph from '@tiptap/extension-paragraph';
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"
export default Paragraph.extend({
    addOptions(){
        return {
            tag: "p",
            HTMLAttributes: {}
        }
    },
    addAttributes(){
        return {
            class: ""
        }
    },
    parseHTML() {
        return [
            { tag: 'p' },
        ]
    },
    renderHTML({HTMLAttributes}) {
        return ['p', HTMLAttributes, 0]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})