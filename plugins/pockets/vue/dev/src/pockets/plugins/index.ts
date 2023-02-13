/**
    This is the boostrapper that looks for and initially adds them to the registered list.
    This registered list is then used for extension loading, such as through the extendApp or init hooks. 

    This can be externally extended via register, allowing external libraries to hook in their own extensions. 
*/
let context = require.context("@/", true, /\pockets-plugin.ts$/);

export let pluginList = context.keys()
    .map( (path: string) => {
        let plugin:$pocketsPlugin = context(path)?.plugin ?? {}
        return {
            ...plugin,
            path
        }
    } )
import { $pockets } from "@/pockets"
export let plugins = {
    registered: pluginList,
    add(plugin: $pocketsPlugin){
        this.registered.push(plugin)
    },
    load(hookName: keyof $pocketsPlugin){
        return ( app: any,  ...args:any[] ) => {
            
            app.config.globalProperties.$pockets = $pockets
            
            $pockets.plugins?.registered.forEach( ( loader: $pocketsPlugin ) =>  {
                if( hookName in loader == false) return;
                let fn = loader[hookName] ?? false
                if(typeof fn === 'function') fn(app, $pockets, ...args)
            } )

        }
    }
}

