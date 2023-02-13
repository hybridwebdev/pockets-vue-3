import { $pockets } from "@/pockets"
import { computed, reactive } from "vue"
export let setup = ( $props ) => {

    let props = reactive($props)

    let selectAll = () => {
        if(!props.multiple || props.disabled) return;
        return () => api.selected = [ ...props.options ]
    }

    let clearAll = () => {
        if(!props.clearable || props.disabled) return;
        return () => api.selected = props.multiple ? [] : null 
    }

    let select = () => {
        
        if(props.disabled) return;

        let single = (ID:number) => {
            api.selected = api.selected == ID && props.clearable ? null : ID
        }
        let multiple = (ID:number) => {
             api.selected = $pockets.utils.array.toggleValue( api.selected, ID)
        }

        return props.multiple ? multiple : single
    }
    /**
        selected serves as internal state for the api.
        It translates the passed in selected property and coerces it into
        an array so that it can be used throughout the api.
    */
    let selected = computed( {
        get: () => Array.isArray(props.selected) ? props.selected : [ props.selected ],
        set: (v:any) => props.selected = v
    } )

    let api = reactive( {
        selectAll: selectAll(),
        clearAll: clearAll(),
        select: select(),
        selected
    } )

    return api

} 