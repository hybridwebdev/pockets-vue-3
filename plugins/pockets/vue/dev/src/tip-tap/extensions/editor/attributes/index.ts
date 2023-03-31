import { Extension } from "@tiptap/core"
/**
  Adds global attributes to all nodes.
*/
export default Extension.create({
  name: "Editor - Global Attributes",
  addOptions(){
    return {
      types: [
        'image', 
        'paragraph'
      ],
      attributes: {
        class: ""
      }
    }
  },
  addGlobalAttributes() {
    return [
      {
        ...this.options
      }
    ]
  },
} )