<template>
  <div
    class="TurnDishRoot"
    ref="el"
    @mousedown="onClick"
    :style="{
      transform: `translateX(${state.x})`
    }"
  >
    {{ asset.name }}
    <div
      class="Dish"
      :style="{
        backgroundImage: `url(/imgs/${color}.svg)`
      }"
    ></div>
    <div
      class="Sushi"
      v-show="!picked"
      :style="{
        backgroundImage: `url(/imgs/${neta}.svg)`
      }"
    ></div>
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
  color: white;
  font-weight: bold;
  .Dish {
    position: absolute;
    width: 100px;
    height: 40px;
    top: 36px;
    left: 0px;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
  }
  .Sushi {
    position: relative;
    display: block;
    width: 80px;
    height: 40px;
    left: 10px;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  computed,
  onMounted,
  nextTick
} from 'vue'
import { SushiNeta, sushiAssets, DishColor } from '@/logics/SushiAssets'

export default defineComponent({
  name: 'TurnDish',
  props: {
    neta: {
      type: String as PropType<SushiNeta>,
      default: 'tamago'
    },
    picked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String as PropType<DishColor>,
      default: 'dishAo'
    }
  },
  setup(props, ctx) {
    const el = ref<HTMLElement>()
    const onClick = () => {
      if (props.picked) {
        return
      }
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
