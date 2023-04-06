import { History } from "@tiptap/extension-history"
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Focus from "@tiptap/extension-focus"
import dropCursor from "@tiptap/extension-dropcursor"
import events from "./events"


export default [
    History,
    Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: 'Enter text here',
    }),
    TextStyle,
    Focus,
    events,
    dropCursor
]