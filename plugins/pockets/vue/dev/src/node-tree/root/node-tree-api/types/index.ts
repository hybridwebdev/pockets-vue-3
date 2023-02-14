export type path = Array<string | number>

export type add = {
    inside: false | ( (node: any, index: number) => path)
    after:  false | ( (node: any) => path)
    before: false | ( (node: any) => path)
}

export type clone = {
    self: false | ( () => path )
    node: false | ( (index: number) => path )
}