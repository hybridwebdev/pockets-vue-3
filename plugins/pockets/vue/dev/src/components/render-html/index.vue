<script lang='ts'>
import { compile, h } from "vue"
let render = (props) => {
    let compiled =  h( compile(props.innerHTML), props.state )
    return props.el ? h( props.el, compiled ) : compiled
}
let props = {
    el: {
        type: [String, Boolean],
        default: "div"
    },
    innerHTML: {
        type: String,
        default: ""
    },
    state: {
        type: [Object, null],
        default: null
    }
}
export default {
    render,
    props
}
</script>