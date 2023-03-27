import Paragraph from '@tiptap/extension-paragraph';
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"
export default Paragraph.extend({
    parseHTML() {
        return [
            { tag: 'p' },
        ]
    },
    renderHTML: ({HTMLAttributes}) => ['p', HTMLAttributes, 0],
    addNodeView: () => VueNodeViewRenderer(Component),

})