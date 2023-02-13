import { $pockets } from "@/pockets" 
export let create = (init: Function, config?: any) => {
    var connect:any = null 
    return async () => {
        /**
            This bit here will force this to be chunked,
            allowing it to be loaded on demand.
        */
        if(!connect) {
            let { createConnection } = await import('./create-connection')
            connect = init( createConnection( config ) )
        }
        return connect
    }
}
