import { onMounted, onBeforeUnmount, Ref, reactive } from "vue";

const resolveRef = (elRef: Ref) => {
  const value = elRef.value;
  if (!value) {
    return null;
  }
  return value as HTMLElement;
};

const useDragMove = (elRef: Ref) => {
  let targetDom: HTMLElement | null = null;
  const lastPos = {
    x: 0,
    y: 0,
  };
  const dragPos = reactive({
    x: 0,
    y: 0,
  });

  const onMove = (ev: MouseEvent) => {
    dragPos.x += ev.clientX - lastPos.x;
    dragPos.y += ev.clientY - lastPos.y;
    lastPos.x = ev.clientX;
    lastPos.y = ev.clientY;
  };

  const onUp = (ev: MouseEvent) => {
    window.removeEventListener("mousemove", onMove);
  };

  const onDown = (ev: MouseEvent) => {
    lastPos.x = ev.clientX;
    lastPos.y = ev.clientY;
    window.addEventListener("mousemove", onMove);
  };

  onMounted(() => {
    targetDom = resolveRef(elRef);
    targetDom?.addEventListener("mousedown", onDown);
    targetDom?.addEventListener("mouseup", onUp);
  });
  onBeforeUnmount(() => {
    targetDom?.removeEventListener("mousedown", onDown);
    targetDom?.removeEventListener("mouseup", onUp);
  });

  return { dragPos };
};

export default useDragMove;
