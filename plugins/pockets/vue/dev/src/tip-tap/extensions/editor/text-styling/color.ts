export default {
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
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
}