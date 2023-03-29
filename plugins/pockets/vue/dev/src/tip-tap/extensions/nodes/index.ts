import interfaceWrapper from "./wrapper"
import Image from "./image"
import Paragraph from "./paragraph"
import Document from './document'
import Text from "./text"

export let nodes = [

    Paragraph.extend( interfaceWrapper( { 
        as: "p"
    } ) ),

    Image.extend( interfaceWrapper( {
        as: "img",
    } ) ),

    Document,
    Text,
]
