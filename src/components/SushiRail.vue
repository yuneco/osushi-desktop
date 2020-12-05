<template>
  <div class="SushiRailRoot">
    <TurnDish @pick="onPick" neta="maguro" />
    <TurnDish @pick="onPick" neta="tamago" />
    <TurnDish @pick="onPick" neta="aji" />
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
import { defineComponent } from 'vue'
import TurnDish from './TurnDish.vue'
import { SushiNeta } from '@/logics/SushiAssets'
export default defineComponent({
  name: 'SushiRail',
  components: {
    TurnDish
  },
  setup(props, ctx) {
    const onPick = (neta: SushiNeta) => {
      ctx.emit('pick', neta)
    }
    return {
      onPick
    }
  }
})
</script>
