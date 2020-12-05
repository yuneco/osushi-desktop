<template>
  <div>
    <Sushi></Sushi>
  </div>
</template>

<style lang="scss" scoped>
.focused {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Sushi from "@/components/Sushi.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sushi,
  },
  data() {
    return {
      focused: false,
    };
  },
});
</script>
