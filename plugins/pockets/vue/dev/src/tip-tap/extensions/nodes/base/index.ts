export default {
  extendNodeSchema(){
    return {
      ders: "title"
    }
  },
  addAttributes() {
      return {
          ...this.parent?.(),
          class: ""
      }
  }
}