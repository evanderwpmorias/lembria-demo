import listGroup from "./list-group.vue";
import dragable from "./dragable.vue";
import listTemplate from "./listTemplate.vue";

export const ListGroup = listGroup;
export const Dragable = dragable;
export const ListTemplate = listTemplate;

export default [
  {
    name: "accordion",
    icon: "list",
    path: "src/components/core/lists/list-group.vue",
    component: ListGroup,
  },
];
