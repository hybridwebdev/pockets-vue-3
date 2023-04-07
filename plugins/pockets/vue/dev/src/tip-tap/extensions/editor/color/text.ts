import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type Options = {
  types: string[],
}

type property = {
  [key: string]: string | null
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    TextStyle: {
      setTextStyle: (property: property) => void
    }
  }
}

let colorExtension = {
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: element => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.color) {
                return {}
              }
              return {
                style: `color: ${attributes.color}`,
              }
            },
          },
        },
      },
    ]
  },
}

export default Extension.create<Options>({
  name: 'text-styling',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addCommands() {
    return {
      setTextStyle: (o: property) => ({ chain }) => chain().setMark('textStyle', o).removeEmptyTextStyle().run(),
    }
  },
})
  .extend(colorExtension)