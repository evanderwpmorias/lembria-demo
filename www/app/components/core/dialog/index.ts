import dialogBase from "./base.vue";
import { baseDialog } from "./dialogHandler";

export const DialogBase = dialogBase;
export const DialogHelper = baseDialog;

export default [
  {
    name: "dialog",
    icon: "list",
    path: "src/components/core/lists/base.vue",
    component: DialogBase,
  },
];
