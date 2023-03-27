import Paragraph from '@tiptap/extension-paragraph';
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"
let wrapper = {
    addNodeView: () => VueNodeViewRenderer(Component),
}
export default wrapper