<template>
  <div class="SushiRailRoot">
    <TurnDish @pick="onPick" />
  </div>
</template>

<style lang="scss" scoped>
.SushiRailRoot {
  position: relative;
  width: 100%;
  height: 100px;
  border: 1px solid #fff;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import TurnDish from './TurnDish.vue'
export default defineComponent({
  name: 'SushiRail',
  components: {
    TurnDish
  },
  setup(props, ctx) {
    const onPick = () => {
      ctx.emit('pick')
    }
    return {
      onPick
    }
  }
})
</script>
