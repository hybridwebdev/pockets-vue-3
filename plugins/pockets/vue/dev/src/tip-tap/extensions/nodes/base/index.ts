
let schemas = {
  container: {
    default: "<div></div>"
  }
}

export default {
  extendNodeSchema(){
    let nodeSchema = schemas[this.name] ?? false
    return {
      nodeSchema
    }
  },
  addAttributes() {
      return {
          ...this.parent?.(),
          class: "",
          id: ""
      }
  }
}