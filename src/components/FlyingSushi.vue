<template>
  <div>
    <Sushi @move="onSushiDrag" :pos="state.sushiPos" />
  </div>
</template>

<style lang="scss" scoped>
.focused {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import Sushi from '@/components/Sushi.vue'
import Pos from '@/core/Pos'
import MatterWorld from '@/logics/MatterWorld'
import { r2a } from '@/core/MathUtil'

export default defineComponent({
  name: 'FlyingSushi',
  components: {
    Sushi
  },
  props: {
    pos: {
      type: Object as PropType<Pos>,
      default: () => new Pos()
    },
    world: Object as PropType<MatterWorld>
  },
  setup(props) {
    const state = reactive({
      dragPos: new Pos(),
      sushiPos: new Pos()
    })

    const onSushiDrag = (p: Pos) => {
      console.log('onSushiDrag', p)
    }

    console.log('Fly!')
    onMounted(() => {
      props.world?.addRect(50, 0, 80, 40, xyr => {
        state.sushiPos = new Pos(xyr.x, xyr.y, r2a(xyr.r))
      })
    })

    return { state, onSushiDrag }
  }
})
</script>
