
import { nodes } from "./nodes"
import TextStyle from '@tiptap/extension-text-style'

import FontFamily from '@tiptap/extension-font-family'
import Placeholder from '@tiptap/extension-placeholder'
import { FontSize } from "./font-size"

import Focus from "@tiptap/extension-focus"
import events from "./editor/events"
export let extensions = [
  
  events,

  TextStyle,
  // FontFamily,
  // FontSize,
  Placeholder.configure({
    showOnlyCurrent: false,
    placeholder: 'Enter text here',
  }),
  Focus,
  ...nodes,
]