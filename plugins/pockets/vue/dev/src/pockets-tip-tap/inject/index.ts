import { InjectionKey, inject } from "vue"

export let injectEditorKey: InjectionKey<any> = Symbol('tip-tap-editor')

export let injectEditor = () => {
  const resolved = inject(injectEditorKey);
  if (!resolved) {
    throw new Error(`Could not resolve Injection`);
  }
  return resolved;
}