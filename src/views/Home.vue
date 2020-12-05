<template>
  <div>
    <div class="sushiStage">
      <Clickable>
        <SushiRail @pick="addSushi" />
      </Clickable>
      <FlyingSushi
        v-for="model in state.sushiModels"
        :key="model.id"
        :world="world"
        :initialPos="model.initialPos"
      />
    </div>
    <div class="matterStage" ref="matterStage"></div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import Clickable from '@/components/Clickable.vue'
import FlyingSushi from '@/components/FlyingSushi.vue'
import SushiRail from '@/components/SushiRail.vue'
import MatterWorld from '@/logics/MatterWorld'
import SushiModel from '@/logics/SushiModel'
import userMousePos from '@/compositions/useMouePos'
import Pos from '@/core/Pos'

type State = {
  sushiModels: SushiModel[]
}

export default defineComponent({
  name: 'Home',
  components: {
    Clickable,
    FlyingSushi,
    SushiRail
  },
  setup() {
    const world = ref<MatterWorld | undefined>()
    const { mousePos } = userMousePos()
    const state: State = reactive({
      sushiModels: []
    })

    const addSushi = () => {
      state.sushiModels.push(new SushiModel(new Pos(mousePos.x, mousePos.y)))
    }

    onMounted(() => {
      world.value = new MatterWorld('.matterStage', '.sushiStage')
    })

    return {
      world,
      state,
      addSushi
    }
  }
})
</script>

<style lang="scss" scoped>
.sushiStage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.matterStage {
  position: absolute;
  width: 100%;
  height: calc(100% - 30px);
  left: 100%;
  top: 0;
  visibility: hidden;
}
</style>
