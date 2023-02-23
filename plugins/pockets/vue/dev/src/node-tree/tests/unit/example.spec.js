import { createApi } from "@/node-tree/create-tree-api"

let tree_1  = {
    root: {
        el: "div",
        props: {

        },
        schema: 'container'
    },
    source: {
        ID: 0,
        type: "test",
        metaKey: ""
    }
}

test('adds 1 + 2 to equal 3', () => {
    expect(1).toBe(1);
    let api1 = createApi(tree_1)


    let node = api1.getNode(['root'])

    console.log(node)
});