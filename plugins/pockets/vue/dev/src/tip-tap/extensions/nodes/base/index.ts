
export default {
  extendNodeSchema(){
    return {
      nodeSchema: {

      }
    }
  },
  addAttributes() {
      return {
          ...this.parent?.(),
          class: ""
      }
  }
}