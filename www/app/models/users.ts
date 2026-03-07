
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
    import { type usersType,  } from '@/data/types/index';
    import {  usersSchema,  } from '@/data/schema/index'
    import { usersZod,  } from '@/data/validation/index';
    

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const usersHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(usersSchema) as usersType
        }

        
        const usersData = ref<usersType | null>(null);
        const usersList = ref<usersType[] | null>([]);

        const getUsersData = () => {
            return baseItemValue(usersSchema) as usersType
        }
        
        const resetUsers = (value?:  usersType | undefined) => {
          const data = mergeDefaults(getUsersData(), unref(value));
          usersData.value =  data;
        }
        const setUsersList = (list: usersType[]) => {
            usersList.value = unref(list)
        }
        const addUsers = (itemData = getUsersData()) => {
          const data = mergeDefaults(getUsersData(), unref(itemData));
          usersList.value?.push({ ...data })
        }
        const usersDialog = (query:string) => {
            return baseDialog(query, getUsersData)
        }
    

        if (_initData) {
          resetUsers();
        }

        

        

        const apiURl = '/users';

        const setusersValue = (value: usersType | undefined) => {
          const baseData = mergeDefaults(getUsersData(), (usersData.value || {}) as usersType);
          usersData.value = mergeDefaults(baseData, value);
          
          
          return usersData.value;
        }
        

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: usersType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setusersValue(data);
            try {
                payload = usersZod.parse(payload);
                return await baseSave<usersType>({ apiAddress: apiURl, item: payload, itemLoadable })
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
        const update = async (data: usersType, id: string) => {
            let payload  = setusersValue(data);
            try {
                payload = usersZod.parse(payload);
                return baseUpdate<usersType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
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
          const response = await baseList<usersType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setUsersList((response?.list as any) || []);
            } else {
              addListItem(usersList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<usersType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetUsers(response?.itemData);
            
          }
          return response;
        };
        
        const schema = usersSchema;
        const validators = {
            users: usersZod,
            
        };
        const _dependencyHelpers = {};

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, usersData, usersList,  getUsersData,
        resetUsers, setUsersList, addUsers, usersDialog
    ,   };
    };

    export default usersHelper;
    