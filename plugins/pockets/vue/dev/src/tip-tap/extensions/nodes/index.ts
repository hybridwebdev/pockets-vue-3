import Image from "./image"
import Paragraph from "./paragraph"
import Document from './document'
import Text from "./text"
import Container from "./container"
import base from "./base"
export default [
    
    Paragraph.extend(base),
    Image.extend(base),
    Container.extend(base),
    
    Document,
    Text,
    
]
