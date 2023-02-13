// @ts-nocheck

import { computed, reactive, watch, toRefs, provide } from "vue"
import { setup as setupConnection } from "@/pockets/crud/component/base"
import { setup as SelectedIDSModel } from "@/pockets/utils/array-selector"
import { vModel } from "@/pockets/utils/v-model"

export let props = {
    
    clearable: {
        type: Boolean,
        default: false
    },
    selected: {
        type: [Array, Number, null, Boolean],
        default: null
    },
    multiple: {
        type: Boolean,
        default: false
    },
    query: {
        default: {
            model: "images",
            action: 'read',
            resource: {
                post_type: "attachment",
                post_mime_type: 'image',
                post_status:  'inherit',
                posts_per_page: 20,
                paged: 1
            },
            fields: {
                items: {
                    url: {
                        size: "thumnail"
                    },
                    ID: ""
                },
                pagination: ''
            }

        }
    },
    
}

export let setup = (props, ctx) => {
    
    let connection = setupConnection()
    
    let query = reactive(props.query)
    
    watch( query, () => connection.load(query), { immediate: true } )
    
    let options = computed(() => {
        if(connection?.result?.items ?? false) return []
        return connection.results.items.map(e => e.ID)
    } )

    let { clearable, selected, multiple } = toRefs(props)

    let selectedIDS = SelectedIDSModel( {
        clearable, 
        selected, 
        multiple,
        selected: vModel(props, ctx.emit, 'selected'),
        options
    }  )

    let api = {
        connection,
        selectedIDS,
        query
    }

    provide('wp-object-selector', api)

    return api

}