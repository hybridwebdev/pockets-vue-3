
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Focus from "@tiptap/extension-focus"
import starterKit from "@tiptap/starter-kit"

import textStyling  from "./text-styling"

export default [
    
    TextStyle,
    textStyling,

    starterKit,
    Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: 'Enter text here',
    }),
    Focus,
]