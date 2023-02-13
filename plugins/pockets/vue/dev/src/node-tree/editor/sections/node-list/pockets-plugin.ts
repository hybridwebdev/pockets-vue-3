import { defineAsyncComponent } from "vue"

let schemaSelector = defineAsyncComponent( () => import("./schema-selector.vue") )

export let plugin:$pocketsPlugin = {
    createApp(app: any, $pockets: $pockets) {
        app.component('pockets-node-tree-schema-selector', schemaSelector )
    }
}
