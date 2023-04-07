import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'
import colorExtension from "./color"
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
}).extend(colorExtension)