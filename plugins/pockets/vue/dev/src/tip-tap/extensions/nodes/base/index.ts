
let schemas = {
  container: {
    default: "<div>aaaaaaaaaaaa</div>"
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