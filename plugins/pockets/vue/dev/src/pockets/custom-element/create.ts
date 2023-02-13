import { $pockets } from "@/pockets"
import { createApp } from "vue"

export let create = function( tag: string, installer?: $pocketsPluginInstaller ) {
    /**
    * Create registers a custom element with the tag you provide. 
    * This should be a kebab cased and valid HTML tag, such as foo-bar which becomes <foo-bar>.
    */
    let installerFn = installer ?? function(){}
    
    class elementBase extends HTMLElement {
        connectedCallback(){

            createApp( {} )
                .use( $pockets.plugins.load('createApp') )
                .use( installerFn, $pockets )
                .mount( this )

        }
    }
    
    customElements.define(tag, elementBase )    

}
    



    

