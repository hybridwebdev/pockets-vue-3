import type { TreeNodeApi } from "./types"
export let test = (api: TreeNodeApi) => {
    
    let el = api.getNode(['root'])

    if(el.hasNodes) {

        el.add.inside({
            el: "div",
            schema: "post",
            props: {
                class: 'p-2'
            }
        })

        el.add.inside( {
            el: "img",
            props: {
                class: 'img-fluid',
                src: "https://via.placeholder.com/150"
            },
            schema: "image",
        }, 1)

        el.clone.child(1)
        el.clone.child(2)
        el.remove.child(2)
        
        el.initialize.child(0)

        el.getChild(1).clone.self()
    }

    console.log("Trying to get path that doesnt exist", api.getNode(['root', 0, 3]) )
    
}