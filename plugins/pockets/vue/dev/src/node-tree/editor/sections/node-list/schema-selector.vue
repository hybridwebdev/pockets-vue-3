<script>
import { computed } from "vue"
import nodeSelector from "./node-selector"
import {setup, props} from "./setup"
import { editor } from "@/node-tree/editor"

export default {
    mixins: [nodeSelector],
    setup(props, ctx) {
            
        let api = setup(props, ctx)

        let select = async(node) => {
            api.loading.value = true
            api.selectedModel.value = node.node.schema
            editor.active = await editor.active.initialize.self()
            api.loading.value = false
        }

        let isSelected = (node) => {
            return api?.selectedModel?.value === node?.node?.schema ? "active" : ''
        }

        return {
            ...api,
            isSelected,
            select
        }
    }, 
    props
}
</script>