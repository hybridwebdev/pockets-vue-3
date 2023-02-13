let set = (path: string, value: any, obj: any) => {

    var parts = path.split("."), p=parts.pop() 
    
    for(var i=0, j; obj && ( j = parts[i] ); i++ ) {
        obj = (j in obj ? obj[j] : obj[j]={} ) 
    }

    return obj && p ? (obj[p]=value) : undefined 
}

let get = ( path: string, obj: any ) => path.split('.').reduce( ( o: any, i: string ) => o[i], obj )

export let clone = (o: object) => JSON.parse( JSON.stringify( o ) )

export let $object = {
    get, set, clone
}