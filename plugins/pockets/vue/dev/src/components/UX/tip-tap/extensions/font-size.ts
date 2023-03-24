//@ts-nocheck
import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'

export const FontSize = Extension.create({

    addOptions() {
        return {
            types: ['textStyle'],
        }
    },

    addGlobalAttributes() {
        return [
        {
            ...this.options,
            attributes: {
                terst: {
                    default: null,
                    parseHTML: element => element.style.color?.replace(/['"]+/g, ''),
                    renderHTML: attributes => {
                        console.log(attributes)
                        if (!attributes.terst) {
                            return {}
                        }

                        return {
                            style: `background-color: ${attributes.terst}`,
                        }
                    },
                },
            },
        },
        ]
    },
    addCommands() {
        return {
            setColor: color => ( { chain } ) => chain().setMark('textStyle', { terst: color } ).run(),
            unsetColor: () => ({ chain }) => chain().setMark('textStyle', { terst: null } ).removeEmptyTextStyle().run(),
        }
    },
})