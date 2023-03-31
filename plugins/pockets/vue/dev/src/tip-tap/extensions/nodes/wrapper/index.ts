 
export default {
     
    addAttributes(){
        return {
            ...this.parent?.(),
            class: "",
            id: "",
        }
    },
    
} 
