import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'
export default Extension.create( {
    
    addOptions(){
        return {
            types: [
                'heading',
                'paragraph',
            ]
        }
    },
    
    addGlobalAttributes(){
        return [
            {
                types: this.options.types,
                attributes: {
                    class: {
                        default: '',
                    },
                },
            },
        ]
    }

} )