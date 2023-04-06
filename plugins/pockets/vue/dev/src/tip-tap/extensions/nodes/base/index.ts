
import Component from './render.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

let schemas = {
  container: {
    default: "<div>Hello world</div>",
    as:"div",
    editable: false
  },
  image: {
    default: "<img src='https://placehold.co/600x400'>",
    as: 'img',
    editable: false
  },
  paragraph: {
    default: "<p>Hello</p>",
    as: 'p',
    editable: true
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
      let nodeSchema = schemas[this.name] ?? false
      return {
          ...this.parent?.(),
          class: "",
          blockId: {
              render: false,
              default: null,
              renderHTML: (attributes) => ({
                blockId: attributes.blockId,
              }),  
              parseHTML: _ => Math.random(),
          },
          contenteditable: {
            default: nodeSchema.editable
          }
      }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
 
}