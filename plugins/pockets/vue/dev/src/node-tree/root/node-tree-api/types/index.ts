export type path = Array<string | number>

export type add = {
    inside: false | ( (node: any, index: number) => path)
    before: false | ( (node: any) => path)
    after: false | ( (node: any) => path)
}

export type clone = {
    self: false | ( () => path )
    node: false | ( (index: number) => path )
}

export type remove = {
    self: false | ( () => path )
    node: false | ( (index: number) => path )
}
