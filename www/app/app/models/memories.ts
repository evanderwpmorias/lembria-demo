
    import { ref, unref, reactive } from 'vue';
    import {
        type ListOptions,
        useLoadable,
        baseItem,
        baseList,
        baseDelete,
        baseSave,
        baseUpdate,
        baseDialog,
        baseItemValue,
        mergeDefaults
    } from './base';
    import { type memoriesType,  } from '@/data/types/index';
    import {  memoriesSchema,  } from '@/data/schema/index'
    import { memoriesZod,  } from '@/data/validation/index';
    import { personsHelper,usersHelper } from './index';

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const memoriesHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(memoriesSchema) as memoriesType
        }

        
        const memoriesData = ref<memoriesType | null>(null);
        const memoriesList = ref<memoriesType[] | null>([]);

        const getMemoriesData = () => {
            return baseItemValue(memoriesSchema) as memoriesType
        }
        
        const resetMemories = (value?:  memoriesType | undefined) => {
          const data = mergeDefaults(getMemoriesData(), unref(value));
          memoriesData.value =  data;
        }
        const setMemoriesList = (list: memoriesType[]) => {
            memoriesList.value = unref(list)
        }
        const addMemories = (itemData = getMemoriesData()) => {
          const data = mergeDefaults(getMemoriesData(), unref(itemData));
          memoriesList.value?.push({ ...data })
        }
        const memoriesDialog = (query:string) => {
            return baseDialog(query, getMemoriesData)
        }
    

        if (_initData) {
          resetMemories();
        }

        

        
          if (_initDependencies) {
            
          }

        const apiURl = 'memories';

        const setmemoriesValue = (value: memoriesType | undefined) => {
          const baseData = mergeDefaults(getMemoriesData(), (memoriesData.value || {}) as memoriesType);
          memoriesData.value = mergeDefaults(baseData, value);
          
          
          return memoriesData.value;
        }
        
        const setDependentValues = (value: memoriesType | undefined) => {
          const baseData = {
            ...memoriesData.value,
            ...(value || {} as any),
          }
          
    const {  } = baseData;
    
  
        }

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: memoriesType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setmemoriesValue(data);
            try {
                payload = memoriesZod.parse(payload);
                return await baseSave<memoriesType>({ apiAddress: apiURl, item: payload, itemLoadable })
            } catch (error) {
                if (typeof error.format === 'function') {
                    itemLoadable.error = error.format();
                } else {
                    itemLoadable.error = error;
                }
                return itemLoadable.error;
            }
        };
        const remove = async (id: string) => {
            return baseDelete(apiURl, id, itemLoadable);
        };
        const update = async (data: memoriesType, id: string) => {
            let payload  = setmemoriesValue(data);
            try {
                payload = memoriesZod.parse(payload);
                return baseUpdate<memoriesType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
            } catch (error) {
              if (typeof error.format === 'function') {
                  itemLoadable.error = error.format();
              } else {
                  itemLoadable.error = error;
              }
          return itemLoadable.error;
      }
      
        };
        const fetchAll = async (filter: string | undefined, page = 1, top = 10, options: ListOptions) => {
          const response = await baseList<memoriesType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setMemoriesList((response?.list as any) || []);
            } else {
              addListItem(memoriesList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<memoriesType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetMemories(response?.itemData);
            setDependentValues(response?.itemData)
          }
          return response;
        };
        
        const schema = memoriesSchema;
        const validators = {
            memories: memoriesZod,
            
        };
        const _dependencyHelpers = { persons: personsHelper, users: usersHelper };

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, memoriesData, memoriesList,  getMemoriesData,
        resetMemories, setMemoriesList, addMemories, memoriesDialog
    ,   };
    };

    export default memoriesHelper;
    