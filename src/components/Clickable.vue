<template>
  <div class="ClickableRoot" ref="el">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useClick from '../compositions/useClick'

export default defineComponent({
  setup() {
    const el = ref(null)
    useClick(el)
    return { el }
  }
})
</script>
