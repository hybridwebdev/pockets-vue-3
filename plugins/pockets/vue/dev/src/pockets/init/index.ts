import { $pockets } from "@/pockets/"
import { createApp } from "vue"

export let init = function() {
    createApp( {} ).use( $pockets.plugins.load('init') )
}