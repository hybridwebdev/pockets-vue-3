import DataLoader from 'dataloader'
/**
* @function connection
* Connection creates a data loader that proxies all axio requests invoked in 1 event cycle.
* It creats an array of promises that it resolves in 1 server request. 
* Each request will get their own response as if it had not been passed through
* the proxy. 
*/
export let createDataLoader = ( apiLoader: (request: any) => Promise<any>, options: object = { cache: false } ) =>  {
    let handler = async ( request: any ) => {
        let response = await apiLoader(request)
        return await Promise.all( request.map( (_: any, i:string) => response[i] ) ) 
    }
    return new DataLoader( handler, options )  
}