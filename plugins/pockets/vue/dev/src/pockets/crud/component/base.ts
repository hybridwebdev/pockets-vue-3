import type { crudConnection, crudConnectionApi } from "@/pockets/crud/types"
import { reactive, PropType, computed } from 'vue'
import { $pockets } from "@/pockets"

export let props = {
    model: {
        default: "posts",
        type: String as PropType<crudConnection['model']>
    },
    resource: {
        default: {
            post_type: "post"
        },
        type: [Object, Array] as PropType<crudConnection['resource']>
    },
    action: {
        type: String as PropType<crudConnection['action']>,
        default:"read"
    },
    fields: {
        type: [Object, Array] as PropType<crudConnection['fields']>,
        default: {
            items: ['title']
        }
    }
}


export let setup = () => {

    let load = async(props: crudConnection) => {
        connection.loading = true
        connection.failed = false
        try {
            let fn = $pockets.crud(props.model).init(props.resource)[props.action]
            if(typeof fn !='function') {
                throw new Error("Must define a valid action")
            }
            connection.results = await fn(props.fields) 
        } catch(e) {
            connection.failed = e
        }
        connection.loading = false
    }
    
    let connection:crudConnectionApi = reactive( {
        results: null,
        loading: false,
        failed: false,
        load 
    } ) 

    return connection

}