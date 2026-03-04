import arrayInput from "./ArrayInput.vue";
import materialArrayInput from "./PerryMdArrayInput.vue";
import arrayInputHandler from "./ArrayInputHandler.vue";
import arraySelect from "./ArraySelect.vue";
import materialArraySelect from "./PerryMdArraySelect.vue";
import listSelector from "./ListSelector.vue";
import materialListSelector from "./PerryMdListSelector.vue";
import materialListSelectorWithCreate from "./PerryMdListSelectorWithCreate.vue";
import materialMapInput from "./PerryMdMapInput.vue";


export const ArrayInputHandler = arrayInputHandler;
export const ArrayInput = arrayInput;
export const PerryMdArrayInput = materialArrayInput;
export const ArraySelect = arraySelect;
export const PerryMdArraySelect = materialArraySelect;
export const ListSelector = listSelector;
export const PerryMdListSelector = materialListSelector;
export const PerryMdListSelectorWithCreate = materialListSelectorWithCreate;
export const PerryMdMapInput = materialMapInput;

export default [
  {
    name: "ArrayInput",
    icon: "input",
    path: "src/components/core/inputs/ArrayInput.vue",
    component: arrayInput,
  },
  {
    name: "MdArrayInput",
    icon: "input",
    path: "src/components/core/inputs/MdArrayInput.vue",
    component: materialArrayInput,
  },
  {
    name: 'ArraySelect',
    icon: 'select',
    path: 'src/components/core/inputs/ArraySelect.vue',
    component: ArraySelect
  },
  {
    name: 'MdArraySelect',
    icon: 'select',
    path: 'src/components/core/inputs/MdArraySelect.vue',
    component: materialArraySelect
  },
  {
    name: 'ListSelector',
    icon: 'list',
    path: 'src/components/core/inputs/ListSelector.vue',
    component: ListSelector
  },
  {
    name: 'MdListSelector',
    icon: 'list',
    path: 'src/components/core/inputs/MdListSelector.vue',
    component: materialListSelector
  },
  {
    name: 'MdListSelectorWithCreate',
    icon: 'list_add',
    path: 'src/components/core/inputs/MdListSelectorWithCreate.vue',
    component: materialListSelectorWithCreate
  },
  {
    name: 'MdMapInput',
    icon: 'map',
    path: 'src/components/core/inputs/MdMapInput.vue',
    component: materialMapInput
  }
];
