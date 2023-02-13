import { App } from "vue"

declare global {
    interface Window { $pockets: $pockets }
}

declare global {
    
    type $pocketsDocument = {
        title: string,
        type: "component" | "custom element" | "connection" ,
    }

    type $pocketsApp = App;

    /*
    *   Used to define plugin interfaces for pockets-plugin files 
    */
    
    type $pocketsPluginInstaller = (app: $pocketsApp, $pockets: $pockets, ...args:any[] ) => void

    type $pocketsPlugin = {
        /*
        * Init is only run once when the plugins main installer is loaded.
        * Typically you want to use this for things like registering custom elements or other
        * 1 time installations.
        */
        init?: $pocketsPluginInstaller ,
        /*
        * createApp is called every time a new app instance is created.
        */
        createApp?: $pocketsPluginInstaller,
    }

    type $pockets = {
        customElement: {
            create(tagName: string, installer?: $pocketsPluginInstaller ): void
        },
        /**
            Init will need to store a value internally to ensure it only runs once from external call
        */
        init(): void,
        /*
            Plugins is an event driven system that allows extending the apps
            through installers registered.
        */
        plugins: {
            registered: Array<$pocketsPlugin>,
            add( plugin: $pocketsPlugin ): void,
            load( hookName: keyof $pocketsPlugin): $pocketsPluginInstaller
        },
        /**
        * Store serves as centralized state for apps. 
        */
        store: {
            $data: Record<any, any>,
            use(key: string): any,
            create(k: string, v: any): void
        },
        debug: {
            /**
            * Log is a utility that can be used to conditionally show debugging info.
            */
            log(...args): void
        },
        /**
            This is a necessary evil so that plugins can extend the interface.
        */
        [k: string]: any
    } 
    
}
