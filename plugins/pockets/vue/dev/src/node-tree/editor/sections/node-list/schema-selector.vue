<script>
import { computed } from "vue"
import nodeSelector from "./node-selector"
import {setup, props} from "./setup"
export default {
    mixins: [nodeSelector],
    setup(props, ctx) {
            
        let api = setup(props, ctx)

        let select = (node) => {
            api.selectedModel.value = node.node.schema
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