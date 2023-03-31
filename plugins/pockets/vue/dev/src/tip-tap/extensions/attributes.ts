import { Extension } from "@tiptap/core"
export default Extension.create({
  name: "Attributes",
  addGlobalAttributes() {
    return [
      {
        types: [
          'image',
          'paragraph',
        ],
        attributes: {
           class: ""
        },
      },
    ]
  },
})