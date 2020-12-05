import { onMounted, onBeforeUnmount, Ref, reactive } from 'vue'

type PosHandler = (x: number, y: number) => void

const resolveRef = (elRef: Ref) => {
  const value = elRef.value
  if (!value) {
    return null
  }
  return value as HTMLElement
}

const useDragMove = (elRef: Ref, onMoveHandler?: PosHandler) => {
  let targetDom: HTMLElement | null = null
  const lastPos = {
    x: 0,
    y: 0
  }
  const dragPos = reactive({
    x: 0,
    y: 0
  })

  const onMove = (ev: MouseEvent) => {
    const dx = ev.clientX - lastPos.x
    const dy = ev.clientY - lastPos.y
    dragPos.x += dx
    dragPos.y += dy
    lastPos.x = ev.clientX
    lastPos.y = ev.clientY
    if (onMoveHandler) {
      onMoveHandler(dx, dy)
    }
  }

  const onUp = (ev: MouseEvent) => {
    window.removeEventListener('mousemove', onMove)
  }

  const onDown = (ev: MouseEvent) => {
    lastPos.x = ev.clientX
    lastPos.y = ev.clientY
    window.addEventListener('mousemove', onMove)
  }

  onMounted(() => {
    targetDom = resolveRef(elRef)
    targetDom?.addEventListener('mousedown', onDown)
    targetDom?.addEventListener('mouseup', onUp)
  })
  onBeforeUnmount(() => {
    targetDom?.removeEventListener('mousedown', onDown)
    targetDom?.removeEventListener('mouseup', onUp)
  })

  return { dragPos }
}

export default useDragMove
