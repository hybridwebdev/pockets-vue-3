import { customElement } from "@/pockets/custom-element"
import { plugins } from "@/pockets/plugins"
import { store } from "@/pockets/store"
import { init } from "@/pockets/init"
import { debug } from "@/pockets/debug"

import { $array as array, $object as object } from "@/pockets/utils/dot-prop"
import $events from 'tiny-emitter/instance'

let $pockets: $pockets = {
    init,
    customElement,
    plugins,
    store,
    debug,
    utils: {
        array, 
        object,
    },
    event: $events
}

window.$pockets = $pockets

export {
    $pockets, 
}

