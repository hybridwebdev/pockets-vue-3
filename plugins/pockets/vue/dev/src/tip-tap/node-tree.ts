import { EditorSchema } from "@/tip-tap/types"
import { reactive } from "vue"
export let nodeTree = reactive<EditorSchema>({
  nodes: {},
  options: {},
  active: false,
  inMenu: false
})
