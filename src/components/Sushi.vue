<template>
  <div
    class="SushiRoot"
    ref="el"
    :style="{
      transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)`,
      color: state.sushiAsset.color
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
  width: 80px;
  height: 40px;
  left: -40px;
  top: -20px;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 12px;
  filter: drop-shadow(0 2px 10px #00000088);
  &::before {
    content: '';
    position: absolute;
    width: 110%;
    height: 40%;
    background-color: currentColor;
    left: -5%;
    top: -5%;
    border-radius: 4px;
  }
  .name {
    display: block;
    position: relative;
    top: 20px;
    text-align: center;
    font-size: 11px;
    pointer-events: none;
    user-select: none;
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
