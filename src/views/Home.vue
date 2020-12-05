<template>
  <div>
    <Sushi @move="onSushiDrag" :pos="state.pos" />
  </div>
</template>

<style lang="scss" scoped>
.focused {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Sushi from '@/components/Sushi.vue'
import Pos from '@/core/Pos'

export default defineComponent({
  name: 'Home',
  components: {
    Sushi
  },
  setup() {
    const state = reactive({
      pos: new Pos()
    })

    const onSushiDrag = (p: Pos) => {
      console.log('onSushiDrag', p)
      state.pos = state.pos.add(p)
    }

    return { state, onSushiDrag }
  }
})
</script>
