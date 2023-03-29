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
    extendNodeSchema() {
        console.log(this)
        return {
            ass: () => {
                return "hole"
            }
        }
    },
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
