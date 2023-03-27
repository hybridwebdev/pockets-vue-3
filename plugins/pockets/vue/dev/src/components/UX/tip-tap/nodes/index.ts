import Wrapper from "./wrapper"
import VueComponent from "./vue-component"

import { Paragraph } from "@tiptap/extension-paragraph"
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'

export let nodes = [
    VueComponent,
    Wrapper,
    Document,
    Text,
    Paragraph
]