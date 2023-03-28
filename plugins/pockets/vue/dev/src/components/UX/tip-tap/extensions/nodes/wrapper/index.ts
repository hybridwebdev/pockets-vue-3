import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"

type NodeSchema = {
    tag: String
}

export default (NodeSchema: NodeSchema) => ( {
    ...NodeSchema,
    addNodeView: () => VueNodeViewRenderer(Component)
} )
