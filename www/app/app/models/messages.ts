
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
    import { type messagesType,  } from '@/data/types/index';
    import {  messagesSchema,  } from '@/data/schema/index'
    import { messagesZod,  } from '@/data/validation/index';
    

    export type HelperOptions = {
      _initData?: boolean;
      _initDependencies?: boolean;
      _setDataOnFetch?: boolean;
      _setListOnFetch?: boolean;
    };

    export const messagesHelper = (options?: HelperOptions) => {
        const { _initData, _initDependencies, _setDataOnFetch, _setListOnFetch } = options || {};

        const itemLoadable = reactive(useLoadable());
        const listLoadable = reactive(useLoadable());
        
        const getDefaultData = () => {
            return baseItemValue(messagesSchema) as messagesType
        }

        
        const messagesData = ref<messagesType | null>(null);
        const messagesList = ref<messagesType[] | null>([]);

        const getMessagesData = () => {
            return baseItemValue(messagesSchema) as messagesType
        }
        
        const resetMessages = (value?:  messagesType | undefined) => {
          const data = mergeDefaults(getMessagesData(), unref(value));
          messagesData.value =  data;
        }
        const setMessagesList = (list: messagesType[]) => {
            messagesList.value = unref(list)
        }
        const addMessages = (itemData = getMessagesData()) => {
          const data = mergeDefaults(getMessagesData(), unref(itemData));
          messagesList.value?.push({ ...data })
        }
        const messagesDialog = (query:string) => {
            return baseDialog(query, getMessagesData)
        }
    

        if (_initData) {
          resetMessages();
        }

        

        

        const apiURl = 'messages';

        const setmessagesValue = (value: messagesType | undefined) => {
          const baseData = mergeDefaults(getMessagesData(), (messagesData.value || {}) as messagesType);
          messagesData.value = mergeDefaults(baseData, value);
          
          
          return messagesData.value;
        }
        

        const addListItem = (list: any[] | null, itemData = {}) => {
            list?.push({...itemData})
        }

        const removeItem = (list: any[], index: number) => {
            list?.splice(index, 1)
        }

        const save = async (data: messagesType) => {
            if (data && '_id' in data && data._id) {
              return update(data, data._id)
            }
            let payload  = setmessagesValue(data);
            try {
                payload = messagesZod.parse(payload);
                return await baseSave<messagesType>({ apiAddress: apiURl, item: payload, itemLoadable })
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
        const update = async (data: messagesType, id: string) => {
            let payload  = setmessagesValue(data);
            try {
                payload = messagesZod.parse(payload);
                return baseUpdate<messagesType>({ apiAddress: apiURl, id, item: payload, itemLoadable });
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
          const response = await baseList<messagesType>({ apiAddress: apiURl, filter, listLoadable, page, pageSize: top, options });
          if (_setListOnFetch && response?.list) {
            if (page === 1) {
              setMessagesList((response?.list as any) || []);
            } else {
              addListItem(messagesList.value, (response?.list as any) || []);
            }
          }
          return response;
        };
        const fetchOne = async (id: string) => {
          const response = await baseItem<messagesType>(apiURl, id, itemLoadable);
          if (response?.itemData && _setDataOnFetch) {
            resetMessages(response?.itemData);
            
          }
          return response;
        };
        
        const schema = messagesSchema;
        const validators = {
            messages: messagesZod,
            
        };
        const _dependencyHelpers = {};

        return { schema, validators, save, remove, update, fetchAll, fetchOne, addListItem, removeItem, itemLoadable, listLoadable, _dependencyHelpers, getDefaultData, messagesData, messagesList,  getMessagesData,
        resetMessages, setMessagesList, addMessages, messagesDialog
    ,   };
    };

    export default messagesHelper;
    