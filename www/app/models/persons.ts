
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
    import { type personsType,  } from '@/data/types/index';
    import {  personsSchema,  } from '@/data/schema/index'
    import { personsZod,  } from '@/data/validation/index';
    

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const personsHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(personsSchema) as personsType
        }

        
        const personsData = ref<personsType | null>(null);
        const personsList = ref<personsType[] | null>([]);

        const getPersonsData = () => {
            return baseItemValue(personsSchema) as personsType
        }
        
        const resetPersons = (value?:  personsType | undefined) => {
          const data = mergeDefaults(getPersonsData(), unref(value));
          personsData.value =  data;
        }
        const setPersonsList = (list: personsType[]) => {
            personsList.value = unref(list)
        }
        const addPersons = (itemData = getPersonsData()) => {
          const data = mergeDefaults(getPersonsData(), unref(itemData));
          personsList.value?.push({ ...data })
        }
        const personsDialog = (query:string) => {
            return baseDialog(query, getPersonsData)
        }
    

        if (_initData) {
          resetPersons();
        }

        

        

        const apiURl = '/persons';

        const setpersonsValue = (value: personsType | undefined) => {
          const baseData = mergeDefaults(getPersonsData(), (personsData.value || {}) as personsType);
          personsData.value = mergeDefaults(baseData, value);
          
          
          return personsData.value;
        }
        

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: personsType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setpersonsValue(data);
            try {
                payload = personsZod.parse(payload);
                return await baseSave<personsType>({ apiAddress: apiURl, item: payload, itemLoadable })
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
        const update = async (data: personsType, id: string) => {
            let payload  = setpersonsValue(data);
            try {
                payload = personsZod.parse(payload);
                return baseUpdate<personsType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
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
          const response = await baseList<personsType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setPersonsList((response?.list as any) || []);
            } else {
              addListItem(personsList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<personsType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetPersons(response?.itemData);
            
          }
          return response;
        };
        
        const schema = personsSchema;
        const validators = {
            persons: personsZod,
            
        };
        const _dependencyHelpers = {};

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, personsData, personsList,  getPersonsData,
        resetPersons, setPersonsList, addPersons, personsDialog
    ,   };
    };

    export default personsHelper;
    