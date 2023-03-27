import wrapper from "./wrapper"

import { Paragraph } from "@tiptap/extension-paragraph"
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'

export let nodes = [
    Paragraph.extend(wrapper),
    Document,
    Text,
]