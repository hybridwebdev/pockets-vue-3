import { Node } from '@tiptap/core'

export default Node.create( {
  name: 'image',
  group: "block",
  addAttributes: () => ({
    src: {
      default: 'https://placehold.co/150x150',
    },
    alt: {
      default: null,
    },
    title: {
      default: null,
    },
  }),
  parseHTML: () => [ { tag: "img" } ],
  renderHTML: ( { HTMLAttributes } )  => [ 'img', HTMLAttributes ]
} )