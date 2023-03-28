import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"

export default () => ({
    addNodeView: () => {
        return (a) => {
            return VueNodeViewRenderer(Component)
        }
    }
})
