
let schemas = {
  container: {
    default: "<div>Hello world</div>"
  },
  image: {
    default: "<img src='https://placehold.co/600x400'>"
  }
}

export default {
  extendNodeSchema(){
    let nodeSchema = schemas[this.name] ?? false
    return {
      ...this.parent?.(),
      nodeSchema
    }
  },
  addAttributes() {
      return {
          ...this.parent?.(),
          class: "",
          id: ""
      }
  },
  
}