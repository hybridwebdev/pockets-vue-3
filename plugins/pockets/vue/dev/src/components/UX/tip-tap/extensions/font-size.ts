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
                color: {
                    default: null,
                    parseHTML: element => element.style.color?.replace(/['"]+/g, ''),
                    renderHTML: attributes => {
                        if (!attributes.color) {
                            return {}
                        }

                        return {
                            style: `color: ${attributes.color}`,
                        }
                    },
                },
            },
        },
        ]
    },
    addCommands() {
        return {
            setColor: color => ( { chain } ) => chain().setMark('textStyle', { color } ).run(),
            unsetColor: () => ({ chain }) => chain().setMark('textStyle', { color: null } ).removeEmptyTextStyle().run(),
        }
    },
})