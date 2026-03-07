<script lang="ts">
import  { mdTextFieldInput, mdTextField, mdTextFieldLabel, chip, chipFilled, chipOutlined,  button, filled} from '@/theme/md-theme'

export default {
  name: 'LsitSelector',
};
</script>
<script setup lang="ts">
import { defineProps, defineModel, watch, reactive } from 'vue';
const inputText = ref('');

const props = defineProps({
  handler: {
    type: Object,
    default: () => ({}),
  },
  filterAttr: {
    type: String,
    default: 'slug',
  },
  label: {
    type: String,
    default: 'Search',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hideInput: {
    type: Boolean,
    default: false,
  },
});

const outputList = defineModel('outputList', {
  type: Array,
  default: () => [],
});

const searchRef = reactive( props.handler );
let editTimeInterval:any = null

const checkInput = async (val) => {
  if (val === '') {
    return;
  }
  const { fetchAll } = searchRef;
  if (!fetchAll) {
    return;
  }
  if (editTimeInterval) {
    clearTimeout(editTimeInterval);
  }
  editTimeInterval = setTimeout(async() => {
    const res = await searchRef.fetchAll(`${props.filterAttr.trim()}_contains eq '${val}'`,1,5,{});
    if (res) {
      const resList = unref(res.list);
      outputList.value = resList;
    }
  }, 500);
};

watch(inputText, (val) => {
  checkInput(val);
});

</script>

<template>
  <div :class="mdTextField" class="relative">
    <label :class="mdTextFieldLabel">{{ label }}</label>
    <input
      type="text"
       :class="mdTextFieldInput"
      v-model="inputText"
      v-if="!hideInput"
      :readonly="readonly" />
      <template v-if="inputText.length > 0">
        <slot :outputList="outputList"></slot>
      </template>
  </div>
</template>

<style scoped>

</style>
