import type { ComputedRef, Ref } from 'vue'

declare global {
  const computed: typeof import('vue')['computed']
  const nextTick: typeof import('vue')['nextTick']
  const onMounted: typeof import('vue')['onMounted']
  const ref: typeof import('vue')['ref']
  const useSlots: typeof import('vue')['useSlots']
  const watch: typeof import('vue')['watch']

  type ComputedRef<T> = import('vue').ComputedRef<T>
  type Ref<T = any> = import('vue').Ref<T>
}

export {}
