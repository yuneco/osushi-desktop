<template>
  <div
    class="SushiRoot"
    ref="el"
    :style="{
      transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)`,
      backgroundImage: `url(/imgs/${neta}.svg)`
    }"
  >
    <span class="name">
      {{ state.sushiAsset.name }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.SushiRoot {
  position: absolute;
  width: 90px;
  height: 40px;
  left: -40px;
  top: -20px;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  filter: drop-shadow(0 2px 10px #00000088);
  .name {
    display: block;
    position: relative;
    top: 24px;
    left: 55%;
    text-align: center;
    font-size: 8px;
    pointer-events: none;
    user-select: none;
    color: #aaa;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, ref, PropType } from 'vue'
import useClick from '../compositions/useClick'
import useDragMove from '../compositions/useDragMove'
import Pos from '../core/Pos'
import { SushiNeta, sushiAssets } from '@/logics/SushiAssets'

export default defineComponent({
  props: {
    pos: {
      type: Object as PropType<Pos>,
      default: () => new Pos()
    },
    neta: {
      type: String as PropType<SushiNeta>,
      default: 'maguro'
    }
  },
  setup(props, ctx) {
    const el = ref(null)
    useClick(el)
    useDragMove(el, (dx, dy, x, y) => {
      ctx.emit('move', new Pos(dx, dy), new Pos(x, y))
    })
    const state = reactive({
      sushiAsset: sushiAssets[props.neta]
    })
    return { el, state }
  }
})
</script>
