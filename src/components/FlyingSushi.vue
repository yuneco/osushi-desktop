<template>
  <div>
    <Sushi @move="onSushiDrag" :neta="neta" :pos="state.sushiPos" />
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
import { SushiNeta } from '@/logics/SushiAssets'

export default defineComponent({
  name: 'FlyingSushi',
  components: {
    Sushi
  },
  props: {
    initialPos: {
      type: Object as PropType<Pos>,
      default: () => new Pos()
    },
    neta: {
      type: String as PropType<SushiNeta>,
      default: 'maguro'
    },
    world: Object as PropType<MatterWorld>
  },
  setup(props) {
    const state = reactive({
      sushiPos: new Pos()
    })

    const onSushiDrag = (p: Pos) => {
      console.log('onSushiDrag', p)
    }

    console.log('Fly! --> ' + props.neta)
    onMounted(() => {
      state.sushiPos = new Pos(props.initialPos.x, props.initialPos.y)
      props.world?.addRect(
        props.initialPos.x,
        props.initialPos.y,
        90,
        35,
        xyr => {
          state.sushiPos = new Pos(xyr.x, xyr.y, r2a(xyr.r))
        }
      )
    })

    return { state, onSushiDrag }
  }
})
</script>
