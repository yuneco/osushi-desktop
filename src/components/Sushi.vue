<template>
  <div
    class="SushiRoot"
    ref="el"
    @click="onClick"
    :style="{
      transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
    }"
  >
    <span class="name">
      MAGURO
    </span>
  </div>
</template>

<style lang="scss" scoped>
.SushiRoot {
  position: relative;
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 12px;
  filter: drop-shadow(0 2px 10px #00000088);
  &::before {
    content: "";
    position: absolute;
    width: 110%;
    height: 40%;
    background-color: salmon;
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
import { defineComponent, reactive, ref } from "vue";
import useClick from "../compositions/useClick";
import useDragMove from "../compositions/useDragMove";
export default defineComponent({
  setup() {
    const el = ref(null);
    useClick(el);
    const { dragPos } = useDragMove(el);
    const state = reactive({
      count: 0,
    });

    const onClick = () => {
      state.count++;
    };
    return { el, state, onClick, dragPos };
  },
});
</script>
