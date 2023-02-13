/**
    any extensions to app sohuld be done in here.
 */
import vClickOutside from "click-outside-vue3"


 
let createApp = (app: any, $pockets: $pockets) => { 
    app.use(vClickOutside)
}

let init = (app: any, $pockets: $pockets) => {  }

export let plugin:$pocketsPlugin = {
    init,
    createApp
}