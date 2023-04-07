//@ts-nocheck
import { BubbleMenuPlugin, BubbleMenuPluginProps } from './base'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  reactive,
  watch,

} from 'vue'

export const BubbleMenu = defineComponent({
  name: 'BubbleMenu',

  props: {
    pluginKey: {
      type: [String, Object] as PropType<BubbleMenuPluginProps['pluginKey']>,
      default: 'bubbleMenu',
    },

    editor: {
      type: Object as PropType<BubbleMenuPluginProps['editor']>,
      required: true,
    },

    updateDelay: {
      type: Number as PropType<BubbleMenuPluginProps['updateDelay']>,
      default: undefined,
    },

    tippyOptions: {
      type: Object as PropType<BubbleMenuPluginProps['tippyOptions']>,
      default: () => ({}),
    },

    shouldShow: {
      type: Function as PropType<Exclude<Required<BubbleMenuPluginProps>['shouldShow'], null>>,
      default: null,
    },
  },

  setup(props, { slots }) {

    const root = ref<HTMLElement | null>(null)
    let test = reactive({
      coords: ""
    })
    watch(() => test, () => {
      console.log(test)
    }, { deep: true})
    onMounted(() => {
      const {
        updateDelay,
        editor,
        pluginKey,
        shouldShow,
        tippyOptions,
      } = props

      editor.registerPlugin( BubbleMenuPlugin({
        updateDelay,
        editor,
        element: root.value as HTMLElement,
        pluginKey,
        shouldShow,
        tippyOptions,
        test
      }) )
    })

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props

      editor.unregisterPlugin(pluginKey)
    })

    return () => h('div', { ref: root }, slots.default?.())
  },
})