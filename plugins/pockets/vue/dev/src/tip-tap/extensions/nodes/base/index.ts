
type schema = {
  editFields: [],
}

let schemas = {
  paragraph: {
    editFields: []
  },
  container: {
    editFields: []
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