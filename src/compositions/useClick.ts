import { onMounted, onBeforeUnmount, Ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Electron = require("electron");

const onErnter = (ev: MouseEvent) => {
  ev.preventDefault();
  Electron.remote.getCurrentWindow().setIgnoreMouseEvents(false);
};

const onLeave = (ev: MouseEvent) => {
  ev.preventDefault();
  Electron.remote
    .getCurrentWindow()
    .setIgnoreMouseEvents(true, { forward: true });
};

const resolveRef = (elRef: Ref) => {
  const value = elRef.value;
  if (!value) {
    return null;
  }
  return value as HTMLElement;
};

const useClick = (elRef: Ref) => {
  onMounted(() => {
    const targetDom = resolveRef(elRef);
    targetDom?.addEventListener("mouseenter", onErnter);
    targetDom?.addEventListener("mouseleave", onLeave);
  });
  onBeforeUnmount(() => {
    const targetDom = resolveRef(elRef);
    targetDom?.removeEventListener("mouseenter", onErnter);
    targetDom?.removeEventListener("mouseleave", onLeave);
  });
};

export default useClick;
