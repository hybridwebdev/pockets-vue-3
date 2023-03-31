
import { nodes } from "./nodes"
import TextStyle from '@tiptap/extension-text-style'

import FontFamily from '@tiptap/extension-font-family'
import Placeholder from '@tiptap/extension-placeholder'
import { FontSize } from "./font-size"

import Focus from "@tiptap/extension-focus"
import events from "./editor/events"
import { Extension } from "@tiptap/core"
let terst = Extension.create({
  addGlobalAttributes() {
    return [
      {
        // Extend the following extensions
        types: [
          'image',
          'paragraph',
        ],
        // … with those attributes
        attributes: {
           class: ""
        },
      },
    ]
  },
})
export let extensions = [
  terst,
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