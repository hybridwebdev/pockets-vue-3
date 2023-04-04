import Image from "./image"
import Paragraph from "./paragraph"
import Document from './document'
import Text from "./text"
import Container from "./container"
import base from "./base"
import { Extension } from "@tiptap/core"
import { uniqueId } from "lodash"

let t = Extension.create({
    name: "snah",
    onTransaction(o) {
        console.log(o)
    },
})
export default [
    t,
    Paragraph.extend(base),
    Image.extend(base),
    Container.extend(base),
    
    Document,
    Text,
    
]
