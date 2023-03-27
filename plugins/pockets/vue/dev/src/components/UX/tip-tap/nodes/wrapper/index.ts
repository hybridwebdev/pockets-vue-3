import Paragraph from '@tiptap/extension-paragraph';
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"
export default Paragraph.extend({
    addAttributes(){
        return {
            class: ""
        }
    },
    parseHTML() {
        return [
            { tag: 'p' },
            { tag: 'doc' }
        ]
    },
    renderHTML(o) {
        return ['p', o.HTMLAttributes, 0]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})