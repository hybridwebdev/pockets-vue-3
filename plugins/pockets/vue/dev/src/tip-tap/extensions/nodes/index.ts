import interfaceWrapper from "./wrapper"
import Image from "@tiptap/extension-image"
import { Paragraph } from "@tiptap/extension-paragraph"
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'

export let nodes = [

    Paragraph.extend( interfaceWrapper( { 
        as: "p"
    } ) ),

    Image.extend( interfaceWrapper( {
        as: "img",
        contenteditable: false
    } ) ),
    
    Document,
    Text,
]
