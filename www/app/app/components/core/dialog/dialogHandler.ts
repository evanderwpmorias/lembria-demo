import { ref } from "vue";
import { type Ref } from "vue";
export function baseDialog<T>(querySelector, startOpen = false) {
  const element: Ref<HTMLDialogElement | null> = ref(null);
  const isOpen: Ref<Boolean> = ref(startOpen);

  element.value = document.querySelector(querySelector) as HTMLDialogElement;

  const open = () => {
    element.value?.showModal();
    isOpen.value = true;
  };
  const close = () => {
    element.value?.close();
    isOpen.value = false;
  };
  const toggle = () => {
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  };

  return { open, close, toggle, isOpen, element };
}
