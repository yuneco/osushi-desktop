<template>
  <div class="TurnDishRoot" @mousedown="onClick">
  </div>
</template>

<style lang="scss" scoped>
.TurnDishRoot {
  position: absolute;
  width: 100px;
  height: 60px;
  background-color: powderblue;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TurnDish',
  setup(props, ctx) {
    const onClick = () => {
      ctx.emit('pick')
    }
    return {
      onClick
    }
  }
})
</script>
