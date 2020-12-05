<template>
  <div
    class="TurnDishRoot"
    ref="el"
    @mousedown="onClick"
    :style="{
      color: asset.color,
      transform: `translateX(${state.x})`
    }"
  >
    {{ asset.name }}
    <div class="Dish"></div>
    <div class="Sushi"></div>
  </div>
</template>

<style lang="scss" scoped>
.TurnDishRoot {
  position: absolute;
  display: inline-block;
  width: 110px;
  height: 60px;
  left: 0;
  user-select: none;
  filter: drop-shadow(0 2px 10px #00000088);
  transition: transform 3s linear;
  .Dish {
    position: absolute;
    width: 100px;
    height: 40px;
    top: 40px;
    left: 0px;
    background-color: #aaa;
    border-radius: 100%;
  }
  .Sushi {
    position: relative;
    display: block;
    width: 80px;
    height: 40px;
    left: 10px;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 12px;
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
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed, onMounted, nextTick } from 'vue'
import { SushiNeta, sushiAssets } from '@/logics/SushiAssets'

export default defineComponent({
  name: 'TurnDish',
  props: {
    neta: {
      type: String as PropType<SushiNeta>,
      default: 'aji'
    }
  },
  setup(props, ctx) {
    const el = ref<HTMLElement>()
    const onClick = () => {
      ctx.emit('pick', props.neta)
    }
    const asset = computed(() => {
      return sushiAssets[props.neta]
    })
    const state = reactive({
      x: '-150px'
    })
    onMounted(() => {
      nextTick(() => {
        state.x = el.value?.parentElement?.offsetWidth + 'px'
      })
    })
    return {
      el,
      onClick,
      asset,
      state
    }
  }
})
</script>
