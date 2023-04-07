import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type ColorOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
     
  }
}

export default Extension.create<ColorOptions>({
})