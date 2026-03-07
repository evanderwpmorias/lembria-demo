
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
    import { type sessionsType,  } from '@/data/types/index';
    import {  sessionsSchema,  } from '@/data/schema/index'
    import { sessionsZod,  } from '@/data/validation/index';
    

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const sessionsHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(sessionsSchema) as sessionsType
        }

        
        const sessionsData = ref<sessionsType | null>(null);
        const sessionsList = ref<sessionsType[] | null>([]);

        const getSessionsData = () => {
            return baseItemValue(sessionsSchema) as sessionsType
        }
        
        const resetSessions = (value?:  sessionsType | undefined) => {
          const data = mergeDefaults(getSessionsData(), unref(value));
          sessionsData.value =  data;
        }
        const setSessionsList = (list: sessionsType[]) => {
            sessionsList.value = unref(list)
        }
        const addSessions = (itemData = getSessionsData()) => {
          const data = mergeDefaults(getSessionsData(), unref(itemData));
          sessionsList.value?.push({ ...data })
        }
        const sessionsDialog = (query:string) => {
            return baseDialog(query, getSessionsData)
        }
    

        if (_initData) {
          resetSessions();
        }

        

        

        const apiURl = 'sessions';

        const setsessionsValue = (value: sessionsType | undefined) => {
          const baseData = mergeDefaults(getSessionsData(), (sessionsData.value || {}) as sessionsType);
          sessionsData.value = mergeDefaults(baseData, value);
          
          
          return sessionsData.value;
        }
        

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: sessionsType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setsessionsValue(data);
            try {
                payload = sessionsZod.parse(payload);
                return await baseSave<sessionsType>({ apiAddress: apiURl, item: payload, itemLoadable })
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
        const update = async (data: sessionsType, id: string) => {
            let payload  = setsessionsValue(data);
            try {
                payload = sessionsZod.parse(payload);
                return baseUpdate<sessionsType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
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
          const response = await baseList<sessionsType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setSessionsList((response?.list as any) || []);
            } else {
              addListItem(sessionsList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<sessionsType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetSessions(response?.itemData);
            
          }
          return response;
        };
        
        const schema = sessionsSchema;
        const validators = {
            sessions: sessionsZod,
            
        };
        const _dependencyHelpers = {};

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, sessionsData, sessionsList,  getSessionsData,
        resetSessions, setSessionsList, addSessions, sessionsDialog
    ,   };
    };

    export default sessionsHelper;
    