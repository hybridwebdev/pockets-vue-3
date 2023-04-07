type propertyDef = {
  key: string
  styleName: string
  types: any
}
export default (propertyDef: propertyDef) => {
  let { key, styleName, types } = propertyDef
  return {
    types,
    attributes: {
      [key]: {
        default: null,
        parseHTML: element => element.style[key]?.replace(/['"]+/g, ''),
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