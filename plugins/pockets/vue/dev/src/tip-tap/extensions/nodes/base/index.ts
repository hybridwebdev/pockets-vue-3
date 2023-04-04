
import Component from './render.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

let schemas = {
  container: {
    default: "<div>Hello world</div>",
    as:"div"
  },
  image: {
    default: "<img src='https://placehold.co/600x400'>",
    as: 'img'
  },
  paragraph: {
    default: "<p>Hello</p>",
    as: 'p'
  }
}

export default {
  draggable: true,
  extendNodeSchema(){
    let nodeSchema = schemas[this.name] ?? false
    return {
      ...this.parent?.(),
      nodeSchema
    }
  },
  addAttributes() {
      return {
          ...this.parent?.(),
          class: "",
          // blockId: {
          //     render: false,
          //     default: null,
          //     renderHTML: (attributes) => ({
          //       blockId: attributes.blockId,
          //     }),  
          //     parseHTML: _ => Math.random(),
          // },
      }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
 
}