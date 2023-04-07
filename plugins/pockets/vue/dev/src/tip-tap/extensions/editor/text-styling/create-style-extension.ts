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
            parseHTML: element => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.color) return {}
              return {
                style: `${styleName}: ${attributes.color}`,
              }
            },
          },
        },
      },
    ]
  },
})