import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state'

class terst {
    constructor(o){
        super()
    }
}
export default (options) => {
  return new Plugin({
    key:
      typeof options.pluginKey === 'string' ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: view => new terst({ view, ...options }),
  })
}