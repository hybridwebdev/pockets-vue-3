import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'

type property = {
  [key: string]: string | null
}

type propertyDef = {
  key: string
  styleName: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    TextStyle: {
      setTextStyle: (property: property) => void
    }
  }
}

let styleExtension = (propertyDef: propertyDef) => {
  let { key, styleName } = propertyDef
  return {
    types: ['textStyle'],
    attributes: {
      [key]: {
        default: null,
        parseHTML: element => element.style[styleName],
        renderHTML: attributes => {
          if (!attributes[key]) return {}
          return {
            style: `${styleName}: ${attributes[key]}`,
          }
        },
      },
    },
  }
}

export default Extension.create({
  name: 'text-styling',
  addCommands: () => ({
    setTextStyle: (o: property) => ({ chain }) => chain().setMark('textStyle', o).removeEmptyTextStyle().run(),
  }),
  addGlobalAttributes: () => [
    styleExtension( { key: "backgroundColor", styleName: "background-color"}),
    styleExtension( { key: "color", styleName: "color" } ),
    styleExtension( { key: "fontSize", styleName: "font-size" } ),  
    styleExtension( { key: "fontFamily", styleName: "font-family" } ),
    styleExtension( { key: "fontWeight", styleName: "font-weight" } ),
  ]
})
  