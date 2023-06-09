
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Focus from "@tiptap/extension-focus"
import starterKit from "@tiptap/starter-kit"
import textStyling  from "./text-styling"
import attributes from './attributes'
export default [
    
    TextStyle,
    textStyling,
    attributes,
    starterKit,
    Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: 'Enter text here',
    }),
    Focus,
]