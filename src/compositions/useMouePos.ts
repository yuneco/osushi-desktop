import { onMounted, reactive, onUnmounted } from 'vue'

const useMousePos = () => {
  const mousePos = reactive({
    x: 0,
    y: 0
  })
  const onMove = (ev: PointerEvent): void => {
    mousePos.x = ev.clientX
    mousePos.y = ev.clientY
    console.log('moved', mousePos)
  }
  const onMoveTouch = (ev: TouchEvent): void => {
    mousePos.x = ev.touches[0].clientX
    mousePos.y = ev.touches[0].clientY
  }
  onMounted(() => {
    const target = window
    target.addEventListener('pointermove', onMove)
    target.addEventListener('touchmove', onMoveTouch)
  })
  onUnmounted(() => {
    const target = window
    target.removeEventListener('pointermove', onMove)
    target.removeEventListener('touchmove', onMoveTouch)
  })

  return {
    mousePos
  }
}

export default useMousePos
