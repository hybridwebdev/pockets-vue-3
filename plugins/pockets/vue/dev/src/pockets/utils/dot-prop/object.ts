import { get, set } from "lodash"
 
export let clone = (o: object) => JSON.parse( JSON.stringify( o ) )

export let $object = {
    get, set, clone
}