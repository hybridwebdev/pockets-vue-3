import interfaceWrapper from "./wrapper"
import Image from "./image"
import Paragraph from "./paragraph"
import Document from './document'
import Text from "./text"

export let nodes = [

    Paragraph.extend( interfaceWrapper ),

    Image.extend( interfaceWrapper ),

    Document,
    Text,
]
