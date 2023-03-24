import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Placeholder from '@tiptap/extension-placeholder'
import { FontSize } from "./font-size"
export let extensions = [
  StarterKit,
  TextStyle,
//   Color,
  FontFamily,
  FontSize,
  Placeholder.configure({
    showOnlyCurrent: false,
    placeholder: 'Enter text here',
  })
]