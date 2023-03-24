import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export const FontSize = Extension.create({

    addOptions() {
        return {
            types: ['textStyle'],
        }
    },

    addGlobalAttributes() {
        return [ {
            types: this.options.types,
            attributes: {
                color: {
                    default: null,
                    parseHTML: element => element.style.backgroundColor?.replace(/['"]+/g, ''),
                    renderHTML: attributes => {
                        if (!attributes.color) {
                            return {}
                        }

                        return {
                            style: `background-color: ${attributes.color}`,
                        }
                    },
                },
            },
        } ]
    },

    addCommands() {
        return {
            setColor: color => ({ chain }) => chain().setMark('textStyle', { color } ).run(),
            unsetColor: () => ({ chain }) => chain().setMark('textStyle', { color: null } ).removeEmptyTextStyle().run()
        }
    },
})