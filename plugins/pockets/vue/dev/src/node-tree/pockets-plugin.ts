import { defineAsyncComponent } from "vue"
let editor = defineAsyncComponent( () => import("./editor/index.vue") )
let root = defineAsyncComponent( () => import("./root/index.vue") )
export let plugin:$pocketsPlugin = {
    createApp(app: any, $pockets: $pockets){ 
        app.component('pockets-node-tree-editor', editor)
        app.component('pockets-tree-root', root)
    }
}