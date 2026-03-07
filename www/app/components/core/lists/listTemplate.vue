<script lang="ts">
export default {
  name: "listTemplate",
};
</script>
<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from "vue";

const props = defineProps({
  entityRef: {
    type: Object,
    required: true,
  },
  list: {
    type: Array,
    required: true,
    default:()=>{[]},
  },
  propertyMap:{
    type: Object,
    required: true,
  },
  actions:{
        type: Array,
        required: false,
        default:()=>[] as any[],
},
});

const loadable = computed(() => {
    return props.entityRef.itemLoadable;
});

const mappedList = computed(() => {
    console.log(props.list);
    const list = props.list.value || [];
    if (!list) return [];
    return list.map((item: any) => {
      const mappedItem: any = {};
      for (const key in props.propertyMap) {
        mappedItem[key] = item[props.propertyMap[key]] ?? '';
      }
      if (props.actions && (item._id || item.id)){
        const id = item._id || item.id;
        const mappedActions: any = []
        props.actions.forEach((action: any) => {
          
            if (action.action === 'delete') {
                mappedActions.push({...action, action: ()=>handleDelition(id)});
              return 
            }
          const path = action.link.replace(':id', id);
          if (action.type === 'mainLink') {
              mappedItem['_itemLink'] = path; 
              return ;
            }
            mappedActions.push({...action , path, id});
        })
        mappedItem['_actions'] = mappedActions;
      }

      return mappedItem;
    });

});
const disabledItem = ref<string |null>(null)
const handleDelition = async (id: string) => {
  if (props.entityRef) {
    disabledItem.value = id;
    const deleteAction = await props.entityRef.delete(id);
    console.log(deleteAction);
    disabledItem.value = null;
  }
};

onMounted(() => {
    if (props.entityRef) {
      props.entityRef.fetchAll();
    }
  // Implement the logic to load data here
});

const loadMore = () => {
  // Implement the logic to load more data here
};
</script>

<template>
  <div>
    {{ propertyMap }} {{ loadable }}
    <ul>
      <!-- Display the item here -->
      <li class="py-2 border-b flex"  v-for="(item, index) in mappedList" :key="index">
        <router-link class="flex-1"  :to="item._itemLink">
            <span class="text-xl block">{{ item.title }} </span>
            <small>{{ item.supportingText }} </small>
        </router-link>


        <template v-for="(action, actionIndex) in item._actions" :key="actionIndex">
             <router-link v-if="action.path" :to="action.path"> {{action.label}} </router-link>
            <button 
                v-else-if="action.action"
                @click="action.action"
                :disabled="disabledItem === item.id"
                class="px-2 py-1 bg-blue-500 text-white rounded-md ml-2"
            >
                {{ action.label }}
            </button>
        </template>
      </li>
    </ul>
    <button @click="loadMore">Load More</button>
  </div>
</template>
