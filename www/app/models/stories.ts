
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
    import { type storiesType,  } from '@/data/types/index';
    import {  storiesSchema,  } from '@/data/schema/index'
    import { storiesZod,  } from '@/data/validation/index';
    

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const storiesHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(storiesSchema) as storiesType
        }

        
        const storiesData = ref<storiesType | null>(null);
        const storiesList = ref<storiesType[] | null>([]);

        const getStoriesData = () => {
            return baseItemValue(storiesSchema) as storiesType
        }
        
        const resetStories = (value?:  storiesType | undefined) => {
          const data = mergeDefaults(getStoriesData(), unref(value));
          storiesData.value =  data;
        }
        const setStoriesList = (list: storiesType[]) => {
            storiesList.value = unref(list)
        }
        const addStories = (itemData = getStoriesData()) => {
          const data = mergeDefaults(getStoriesData(), unref(itemData));
          storiesList.value?.push({ ...data })
        }
        const storiesDialog = (query:string) => {
            return baseDialog(query, getStoriesData)
        }
    

        if (_initData) {
          resetStories();
        }

        

        

        const apiURl = '/stories';

        const setstoriesValue = (value: storiesType | undefined) => {
          const baseData = mergeDefaults(getStoriesData(), (storiesData.value || {}) as storiesType);
          storiesData.value = mergeDefaults(baseData, value);
          
          
          return storiesData.value;
        }
        

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: storiesType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setstoriesValue(data);
            try {
                payload = storiesZod.parse(payload);
                return await baseSave<storiesType>({ apiAddress: apiURl, item: payload, itemLoadable })
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
        const update = async (data: storiesType, id: string) => {
            let payload  = setstoriesValue(data);
            try {
                payload = storiesZod.parse(payload);
                return baseUpdate<storiesType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
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
          const response = await baseList<storiesType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setStoriesList((response?.list as any) || []);
            } else {
              addListItem(storiesList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<storiesType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetStories(response?.itemData);
            
          }
          return response;
        };
        
        const schema = storiesSchema;
        const validators = {
            stories: storiesZod,
            
        };
        const _dependencyHelpers = {};

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, storiesData, storiesList,  getStoriesData,
        resetStories, setStoriesList, addStories, storiesDialog
    ,   };
    };

    export default storiesHelper;
    