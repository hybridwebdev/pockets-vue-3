
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Focus from "@tiptap/extension-focus"
import starterKit from "@tiptap/starter-kit"

import selectHandler from "./select-handler/"
import colors  from "./color/"

export default [
    ...colors,
    starterKit,
    Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: 'Enter text here',
    }),
    TextStyle,
    Focus,
    selectHandler,
]