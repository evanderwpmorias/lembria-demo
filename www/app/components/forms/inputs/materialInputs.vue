<script lang="ts">
export default {
  name: "materialInputs",
};
</script>
<script setup lang="ts">
import { defineProps } from "vue";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/select/outlined-select.js";
import "@material/web/select/select-option.js";
import "@material/web/button/elevated-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-button.js";
import "@material/web/button/text-button.js";
import "@material/web/progress/circular-progress.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/iconbutton/outlined-icon-button";
import "@material/web/icon/icon.js";

import "@material/web/divider/divider.js";
import "@material/web/icon/icon.js";
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import "@material/web/menu/sub-menu.js";

import "@material/web/checkbox/checkbox";
import "@material/web/radio/radio";

import "@material/web/tabs/primary-tab.js";
import "@material/web/tabs/secondary-tab.js";
import "@material/web/tabs/tabs.js";

import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/chips/input-chip.js";

import { PerryMdArrayInput, PerryMdArraySelect, PerryMdListSelector, PerryMdListSelectorWithCreate, PerryMdMapInput } from "@/components/core/inputs";


const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  error: {
    type: Boolean,
    required: false,
    default: () => {},
  },
  errorText: {
    type: String,
    required: false,
    default: "",
  },
  helpers: {
    type: Object,
    required: false,
    default: () => {},
  },
  filters: {
    type: Object,
    required: false,
    default: () => {},
  },
});
const value = defineModel();
</script>

<template>
  <input type="hidden" v-if="field.isVisible == false" v-model="value" />
  <template v-else-if="field.component?.type === 'textarea'">
    <md-outlined-text-field
      class="w-full"
      :label="field.label"
      :placeholder="field.placeholder"
      :value="value"
      @input="value = $event.target.value"
      :error="error"
      :error-text="errorText"
      type="textarea"
      rows="4"
      :supporting-text="field.supportingText"
    ></md-outlined-text-field>
  </template>
  <PerryMdArraySelect
    v-else-if="field.isArray && (field.component?.type === 'select' || field.type === 'enum')"
    v-model="value"
    :label="field.label"
    inputClass="w-full"
    :placeholder="field.placeholder"
    :error="error"
    :error-text="errorText"
    :supporting-text="field.supportingText"
    :options="field.options"
  />
  <md-outlined-select
    v-else-if="field.component?.type === 'select' || field.type === 'enum'"
    class="w-full"
    :label="field.label"
    :error="error"
    :error-text="errorText"
    :supporting-text="field.supportingText"
    :value="value"
    @input="value = $event.target.value"
    :required="field.required"
  >
    <md-select-option
      v-for="(item, index) in field.options"
      :key="index"
      :value="item.value"
    >
      <div slot="headline">{{ item.label }}</div>
    </md-select-option>
  </md-outlined-select>

  <div v-else-if="field.component?.type === 'checkbox' || field.type === 'boolean'">
    <label class="w-full flex items-center gap-2">
      <md-checkbox
        :error="error"
        :error-text="errorText"
        :checked="value"
        @change="value = $event.target.checked"
        :required="field.required"
      ></md-checkbox>
      <span>{{ field.label }}</span>
    </label>
    <span class="block">{{ field.supportingText }}</span>
  </div>



  <PerryMdArrayInput
    v-model="value"
    :label="field.label"
    inputClass="w-full"
    :placeholder="field.placeholder"
    :error="error"
    :error-text="errorText"
    :type="
      field.type === 'text' ||
      field.type === 'password' ||
      field.type === 'email'
        ? field.type
        : 'text'
    "
    :supporting-text="field.supportingText"
    v-else-if="field.isArray && field.type !== 'reference'"
  />

  <div v-else-if="field.component?.type === 'radio'" class="w-full">
    <label
      v-for="(item, index) in field.options"
      :key="index"
      class="flex items-center gap-2"
    >
      <md-radio
        :checked="value === item.value"
        :value="item.value"
        :name="field.schemaProperty"
        :error="error"
        :error-text="errorText"
        :required="field.required"
        @change="value = item.value"
      >
      </md-radio>
      <span>{{ item.label }}</span>
    </label>
  </div>
  <template v-else-if="field.component?.type === 'refListSelect'">
    <PerryMdArrayInput
      v-model="value"
      :label="field.label"
      :handler="field._helper"
      :filter="filters?.[field.schemaProperty]"
      :field="field"
      inputClass="w-full"
      :placeholder="field.placeholder"
      :error="error"
      :error-text="errorText"
      :type="
        field.type === 'text' ||
        field.type === 'password' ||
        field.type === 'email'
          ? field.type
          : 'text'
      "
      :supporting-text="field.supportingText"
    />
  </template>

  <PerryMdMapInput
    v-else-if="field.component?.type === 'map' || field.type === 'map'"
    v-model="value"
    :label="field.label"
    inputClass="w-full"
    :placeholder="field.placeholder"
    :error="error"
    :error-text="errorText"
    :supporting-text="field.supportingText"
    :readonly="field.readonly"
  />  <template v-else-if="field.component?.type === 'refListSelectWithCreate'">
    <PerryMdListSelectorWithCreate
      :model-value="(value as string | string[])"
      @update:model-value="(newValue) => value = newValue"
      :label="field.label"
      :handler="field._helper"
      :filter="filters?.[field.schemaProperty]"
      :field="field"
      inputClass="w-full"
      :placeholder="field.placeholder"
      :error="error"
      :error-text="errorText"
      :supporting-text="field.supportingText"
      :allow-create="true"
      :create-schema="field._schema"
    />
  </template>

  <template v-else>
    <md-outlined-text-field
      class="w-full"
      :label="field.label"
      :placeholder="field.placeholder"
      :value="value"
      @input="value = $event.target.value"
      :error="error"
      :error-text="errorText"
      :type="
        field.type === 'text' ||
        field.type === 'date' ||
        field.type === 'number' ||
        field.type === 'password' ||
        field.type === 'email'
          ? field.type
          : 'text'
      "
      prefix-text=""
      suffix-text=""
      :supporting-text="field.supportingText"
    ></md-outlined-text-field>
  </template>
</template>

<style scoped></style>
