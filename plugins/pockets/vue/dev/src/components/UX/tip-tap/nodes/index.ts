import wrapper from "./wrapper"
import { Paragraph } from "@tiptap/extension-paragraph"
export let nodes = [
    Paragraph.extend(wrapper()) 
]