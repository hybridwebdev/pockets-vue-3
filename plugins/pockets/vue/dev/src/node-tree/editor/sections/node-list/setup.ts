//@ts-nocheck
import { vModel } from "@/pockets/utils/v-model"
import { inject, ref, computed } from "vue"
import { editor } from "@/node-tree/editor"
export let setup = (props, { emit } )  => { 
    
    let loading = ref(false)

    let filterText = ref('')

    
    let nodeList = computed(() => {
        return Object.values(editor.nodes.list).filter((e) => {
            if(filterText.value == '') return true
            return e.title.toLowerCase().includes(filterText.value.toLowerCase())
        })
    })

    let selectedModel = vModel(props, emit, 'selected')
    
    let select = (node) => {
        selectedModel.value = node
    }

    let isSelected = (node) => {
        return selectedModel && node.title == selectedModel.title ? "active" : ""
    }
    
    return { 
        filterText,
        nodeList,
        selectedModel, 
        select,
        isSelected,
        loading
    }

}
export let props ={
    selected: {
        type: [Boolean, Object, String],
        required: true
    }
}