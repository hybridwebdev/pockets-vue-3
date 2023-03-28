import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"

type baseAttrs = {
    /**
        passed as additional v-bind attrs on the component
    */
    as: String
}

export default (baseAttrs: baseAttrs) => ( {
    addAttributes(){
        return {
            class: {
                default: "aaaaaaaaaaa"
            }
        }
    },
    baseAttrs,
    addNodeView: () => VueNodeViewRenderer(Component)
} )
