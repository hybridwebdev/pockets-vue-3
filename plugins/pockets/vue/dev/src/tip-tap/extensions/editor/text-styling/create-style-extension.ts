type propertyDef = {
  key: string
  styleName: string
}
export default (propertyDef: propertyDef) => ({
  addGlobalAttributes() {
    let { key, styleName } = propertyDef
    return [
      {
        types: this.options.types,
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
      },
    ]
  },
})