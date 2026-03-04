
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
    import { type familiesType,  } from '@/data/types/index';
    import {  familiesSchema,  } from '@/data/schema/index'
    import { familiesZod,  } from '@/data/validation/index';
    

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const familiesHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(familiesSchema) as familiesType
        }

        
        const familiesData = ref<familiesType | null>(null);
        const familiesList = ref<familiesType[] | null>([]);

        const getFamiliesData = () => {
            return baseItemValue(familiesSchema) as familiesType
        }
        
        const resetFamilies = (value?:  familiesType | undefined) => {
          const data = mergeDefaults(getFamiliesData(), unref(value));
          familiesData.value =  data;
        }
        const setFamiliesList = (list: familiesType[]) => {
            familiesList.value = unref(list)
        }
        const addFamilies = (itemData = getFamiliesData()) => {
          const data = mergeDefaults(getFamiliesData(), unref(itemData));
          familiesList.value?.push({ ...data })
        }
        const familiesDialog = (query:string) => {
            return baseDialog(query, getFamiliesData)
        }
    

        if (_initData) {
          resetFamilies();
        }

        

        

        const apiURl = 'families';

        const setfamiliesValue = (value: familiesType | undefined) => {
          const baseData = mergeDefaults(getFamiliesData(), (familiesData.value || {}) as familiesType);
          familiesData.value = mergeDefaults(baseData, value);
          
          
          return familiesData.value;
        }
        

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: familiesType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setfamiliesValue(data);
            try {
                payload = familiesZod.parse(payload);
                return await baseSave<familiesType>({ apiAddress: apiURl, item: payload, itemLoadable })
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
        const update = async (data: familiesType, id: string) => {
            let payload  = setfamiliesValue(data);
            try {
                payload = familiesZod.parse(payload);
                return baseUpdate<familiesType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
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
          const response = await baseList<familiesType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setFamiliesList((response?.list as any) || []);
            } else {
              addListItem(familiesList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<familiesType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetFamilies(response?.itemData);
            
          }
          return response;
        };
        
        const schema = familiesSchema;
        const validators = {
            families: familiesZod,
            
        };
        const _dependencyHelpers = {};

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, familiesData, familiesList,  getFamiliesData,
        resetFamilies, setFamiliesList, addFamilies, familiesDialog
    ,   };
    };

    export default familiesHelper;
    