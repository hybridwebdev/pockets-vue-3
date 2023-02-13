/**
    Helper Methods for array operations. 
    All methods are immutable. Instead of modifying the array directly,
    they return a modified version of it. You will need to manually apply
    reassignments if mutation is desired.
*/
export let move = (arr: Array<any>, to: number, from: number) => {
    let a = arr.filter( (e, i) => i != from )
    return insert(a, to, arr[from])
}

export let replace = (arr: Array<any>, index: number, ...newItems: Array<any>) => [
    ...arr.slice(0, index),
    ...newItems,
    ...arr.slice(index + 1)
]


export let insert = ( arr: Array<any>, index: number , ...newItems: Array<any>) => {
 
    return [
        ...arr.slice(0, index),
        ...newItems,
        ...arr.slice(index)
    ]
    
}
export let remove = (arr: Array<any>, value: any ) => arr.filter( (item: any) => item !== value )

export let omit = (arr, index) => arr.filter((e, i) => i!=index)

/** 
    $slice_one acts like slice, but always returns the first el if the
    arrays length is 1
*/
export let slice_one = (arr: Array<any>) => arr.length > 1 ? arr.slice(0, -1) : [ arr[0] ]

export let toggleValue = (arr: Array<string>, item: string ) => arr.includes(item) 
    ? arr.filter((i:string)  => i !== item) 
    : [ ...arr, item ]

export let addUnique = (arr: Array<string>, item: string) => {
    return arr.indexOf(item) == -1 ? [...arr, item] : arr
}

export let rotate = (arr: Array<any>, count:number = 1, forward = true ) => {
    let _a = [
        ...arr.slice(count, arr.length), 
        ...arr.slice(0, count)
    ]
    return forward ? _a.reverse() : _a
}
export let $array = {
    move,
    replace,
    insert,
    slice_one,
    toggleValue,
    remove,
    addUnique,
    rotate,
    omit
}