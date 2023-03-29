import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"

type baseAttrs = {
    /**
        passed as additional v-bind attrs on the component
    */
    as: String
    contenteditable?: boolean
}

export default (baseAttrs: baseAttrs) => ( {
    addAttributes(){
        return {
            ...this.parent?.(),
            class: "",
            id: "",
        }
    },
    baseAttrs,
    addNodeView: () => VueNodeViewRenderer(Component),
} )
