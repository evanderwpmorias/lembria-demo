<script lang="ts">
export default {
  name: "dragable-List"
};
</script>
<script setup lang="ts">
import { ref, Ref, watch, onUnmounted } from "vue";

const list = defineModel({ type: Array, required: true, default: () => [] });
const target: Ref<HTMLElement | null> = ref(null);
const dragFrom = ref(-1);
const dragTo = ref(-1);
const hoverIndex = ref(-1);

const moveIndex = (index: number, direction: number) => {
  const inputs = list.value;
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= inputs.length) {
    return;
  }
  const input = inputs[index];
  inputs[index] = inputs[newIndex];
  inputs[newIndex] = input;
  list.value = inputs;
};

const moveListItem = (from: number, to: number) => {
  if (
    from >= 0 &&
    from < list.value.length &&
    to >= 0 &&
    to < list.value.length
  ) {
    const item = list.value[from];
    list.value.splice(from, 1);
    list.value.splice(to, 0, item);
  }
};

const dragStartHandler = (e: DragEvent) => {
  const closestItem = (e.target as HTMLElement).closest("[data-index]");
  dragFrom.value = Number((closestItem as HTMLElement)?.dataset.index || -1);
  console.log("dragStartHandler", e);
  console.log("dragFrom", dragFrom.value);
};
const dragOverHandler = (e: DragEvent) => {
  e.preventDefault();
  const closestItem = (e.target as HTMLElement).closest("[data-index]");
  hoverIndex.value = Number((closestItem as HTMLElement).dataset.index || -1);
};
const dropHandler = (e: DragEvent) => {
  e.preventDefault();
  console.log("dropHandler", e.target);
  const closestItem = (e.target as HTMLElement).closest("[data-index]");
  if (closestItem) {
    dragTo.value = Number((closestItem as HTMLElement).dataset.index || -1);
    console.log("dragStartHandler", e);
    console.log("dragTo", dragTo.value);
    console.log("dragFrom", dragFrom.value);
    moveListItem(dragFrom.value, dragTo.value);
  }
  hoverIndex.value = -1;
};

const setDragHandlers = (el: HTMLElement) => {
  el.addEventListener("dragstart", dragStartHandler);
  el.addEventListener("dragover", dragOverHandler);
  el.addEventListener("drop", dropHandler);
};

onUnmounted(() => {
  target.value?.removeEventListener("dragstart", dragStartHandler);
  target.value?.removeEventListener("dragover", dragOverHandler);
  target.value?.removeEventListener("drop", dropHandler);
});

watch(target, () => {
  if (target.value) {
    setDragHandlers(target.value);
  }
});

const setTarget = (el: HTMLElement | null) => {
  target.value = el;
};
</script>

<template>
  <slot :target="target" :move-index="moveIndex" :drag-From="dragFrom" :hover-index="hoverIndex" :set-target="setTarget">
  </slot>
</template>
