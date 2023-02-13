import axios, { AxiosRequestConfig } from 'axios'
import { createDataLoader } from "./create-data-loader"
/**
* Creates an api post call that is wrapped in a connection proxy. 
* This collects all api calls in 1 tick and sends them to the url as an array.
*/
export let createConnection = ($config?: AxiosRequestConfig ) => {

    let api = axios.create()
    api.interceptors.request.use( ( config: any ) => ( { ...config, ...$config } ) )
    api.interceptors.response.use( r => r.data, e => Promise.reject(e) )

    let loader = createDataLoader( (data: object) => api( { data } ) )

    return {
        /**
            Exposes dataloader so additional config can be done
        */
        loader,
        /**
            Exposes api so additional axios hooks can be added.
        */
        api 
    }
}
