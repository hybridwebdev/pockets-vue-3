
import { Plugin, PluginKey } from '@tiptap/pm/state'
import type { EditorState } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

class pluginClass {
    constructor(o){
    }
    update(view: EditorView, oldState?: EditorState) {
    }

}
export default (options) => {
    let { pluginKey } = options.props
    return new Plugin( {
        key: new PluginKey(pluginKey),
        view: view => new pluginClass({ view, ...options }),
    } )
}