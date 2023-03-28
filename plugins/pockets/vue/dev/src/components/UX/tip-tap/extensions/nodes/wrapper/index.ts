import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"

type baseAttrs = {
    as: String
}

export default (baseAttrs: baseAttrs) => ( {
    baseAttrs,
    addNodeView: () => VueNodeViewRenderer(Component)
} )
