import type { crudConnection } from "@/pockets/crud/types"
import { createConnection } from '@/pockets/connection/create-connection'

let init = (app: any, $pockets: $pockets) => { 

    let { loader, api } = createConnection()

    let {
        nonce,
        url
    } = $pockets.data.crud

    api.interceptors.request.use( ( config: any ) => {
        config.headers = {
            ...config.headers,
            'queried-object': JSON.stringify($pockets.data.queried_object)
        }
        return config
    } )

    api.interceptors.request.use( ( config: any ) => {
        config.method='post'
        config.url = url
        config.headers = {
            ...config.headers,
            'X-WP-Nonce': nonce,
        }
        return config
    } )
    
    let crud = (model: string) => {

        let object:crudConnection = {
            model,
            resource: {},
            action: "read",
            fields: {},
        }

        let fn = async (action: crudConnection['action'], fields: crudConnection['fields'] ) => {
            object.action = action
            object.fields = fields
            return await loader.load(object)
        }

        return {
            init(resource){
                object.resource = resource;
                return {
                    create: (fields) => fn('create', fields),
                    read: (fields) => fn('read', fields),
                    update: (fields) => fn('update', fields),
                    delete: (fields) => fn('delete', fields),
                }
            }
        }
    }

    $pockets.crud = crud;

}

export let plugin:$pocketsPlugin = {
    init
}