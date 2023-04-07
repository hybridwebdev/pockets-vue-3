import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'
import styleExtension from "./create-style-extension"
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
  addOptions: () => ({
    types: ['textStyle'],
  }),
  addCommands: () => ({
    setTextStyle: (o: property) => ({ chain }) => chain().setMark('textStyle', o).removeEmptyTextStyle().run(),
  }),
})
  .extend( styleExtension( { key: "color", styleName: "color" } ) )