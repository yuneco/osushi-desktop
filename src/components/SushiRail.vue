<template>
  <div class="SushiRailRoot">
    <TurnDish
      v-for="model in state.dishes"
      :key="model.id"
      @pick="onPick(model)"
      :neta="model.neta"
      :color="model.color"
    />
  </div>
</template>

<style lang="scss" scoped>
.SushiRailRoot {
  position: relative;
  width: 100%;
  height: 100px;
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import TurnDish from './TurnDish.vue'
import { SushiNeta, sushiAssets, allNetas } from '@/logics/SushiAssets'
import DishModel from '@/logics/DishModel'
import { rundomFrom } from '@/core/MathUtil'

type State = {
  dishes: DishModel[]
}

export default defineComponent({
  name: 'SushiRail',
  components: {
    TurnDish
  },
  setup(props, ctx) {
    const state = reactive<State>({
      dishes: []
    })
    const onPick = (model: DishModel) => {
      ctx.emit('pick', model.neta)
      model.picked = true
    }
    const addDish = () => {
      const neta = rundomFrom(allNetas)
      const color = sushiAssets[neta].color
      const dish = new DishModel(neta, color)
      state.dishes.push(dish)
      setTimeout(() => {
        state.dishes.shift()
      }, 3000)
    }
    onMounted(() => {
      setInterval(addDish, 1000)
    })
    return {
      state,
      onPick
    }
  }
})
</script>
