import { get, set } from "lodash"
 
//let get = ( path: string, obj: any ) => path.split('.').reduce( ( o: any, i: string ) => o[i], obj )

export let clone = (o: object) => JSON.parse( JSON.stringify( o ) )

export let $object = {
    get, set, clone
}