import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from "./component.vue"

export default {
    addOptions(){
        return {
            wrapperAttrs: {
                as: "tag"
            }
        }
    },
    extendNodeSchema(){
        return {
            ...this.parent?.(),
            ...this.options,
        }
    },
    addAttributes(){
        return {
            ...this.parent?.(),
            class: "",
            id: "",
        }
    },
    update(node, decorations) {
        console.log('node', node)
        return true;
    }
    //addNodeView: () => VueNodeViewRenderer(Component),
} 
