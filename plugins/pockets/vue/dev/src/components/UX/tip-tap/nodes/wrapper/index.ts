import Paragraph from '@tiptap/extension-paragraph';
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"
export default Paragraph.extend({
    addNodeView: () => VueNodeViewRenderer(Component),
})