import { ref, type Ref, computed } from "vue";
import { useRuntimeConfig } from "#imports";

export interface Loadable {
  loaded: Ref<boolean>;
  loading: Ref<boolean>;
  failed: Ref<boolean>;
  saving: Ref<boolean>;
  saved: Ref<boolean>;
  error: Ref<Error | null>;
  startLoading: () => void;
  finishLoading: () => void;
  failLoading: (err: Error) => void;
}

export interface ListOptions {
  cache?: boolean;
  countMode?: 'count-only' | 'paralell' | 'none' | undefined ;
  orderby?: string[];
  select?: string[];
  expand?: string[];
}

const buildApiUrl = (endpoint: string) => {
  const runtimeConfig = useRuntimeConfig();
  const apiBase =
    runtimeConfig.public?.apiBaseUrl &&
    typeof runtimeConfig.public.apiBaseUrl === "string"
      ? runtimeConfig.public.apiBaseUrl
      : "";

  if (/^https?:\/\//i.test(endpoint) || !apiBase) {
    return endpoint;
  }

  const trimmedBase = apiBase.replace(/\/+$/, "");
  const trimmedEndpoint = endpoint.replace(/^\/+/, "");

  return trimmedEndpoint ? `${trimmedBase}/${trimmedEndpoint}` : trimmedBase;
};

export const useLoadable = () => {
  const loaded = ref(false);
  const loading = ref(false);
  const failed = ref(false);
  const saving = ref(false);
  const saved = ref(false);
  const error = ref<Error | null>(null);

  const startLoading = () => {
    loading.value = true;
    loaded.value = false;
    failed.value = false;
    error.value = null;
  };

  const finishLoading = () => {
    loading.value = false;
    loaded.value = true;
  };

  const failLoading = (err: Error) => {
    loading.value = false;
    failed.value = true;
    error.value = err;
  };

  return {
    loaded,
    loading,
    failed,
    saving,
    saved,
    error,
    startLoading,
    finishLoading,
    failLoading,
  } as Loadable;
};

export async function baseItem<T>(
  apiAddress: string,
  id: string,
  itemLoadable: Loadable,
  options?: any
) {
  const { startLoading, finishLoading, failLoading } = itemLoadable;
  const itemData = ref<T | null>(null);
  let response: Error | null | any = null;

  if (!id) return;
  startLoading();
  try {
    // Implement fetch logic here, e.g., using fetch API
    let queryParams = new URLSearchParams();
     if (options?.expand) {
      for (let i = 0; i < options.expand.length; i++) {
        queryParams.append('expand', options.expand[i]);
      }
    }

    const resourcePath = `${apiAddress}/${id}`;
    const resolvedUrl = buildApiUrl(resourcePath);
    const queryString = queryParams.toString();
    const url = queryString ? `${resolvedUrl}?${queryString}` : resolvedUrl;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('response', data);

    itemData.value = data.item;
    finishLoading();
  } catch (err) {
    console.log(err);
    failLoading(err as Error);
  }

  return { itemData: itemData.value ?? null };
}

export async function baseList<T>({
  apiAddress,
  listLoadable,
  filter,
  page = 1,
  pageSize = 30,
  sort,
  options = {}
}: {
  apiAddress: string;
  listLoadable: Loadable;
  filter?: string;
  page: number;
  pageSize: number;
  sort?: string;
  options?: ListOptions;
}) {
  const { loaded, loading, startLoading, finishLoading, failLoading } =
    listLoadable;
  const list = ref<T[]>([]);
  const totalItems = ref(0);
  let totalPages = 0;
  const response = ref<Error | null | any>(null);

  const { cache = false, countMode = 'none', expand, select } = options;



  startLoading();
  try {
    const params: any[] = [];
    if (filter && filter.length > 0) {
      params.push(["filter", filter]);
    }
    params.push(["skip", ((page - 1) * pageSize).toString()]);
    params.push(["top", pageSize.toString()]);
    if (sort) {
      params.push(["sort", sort]);
    }
    if (cache) {
      params.push(["cache", "true"]);
    } 
    if (countMode === 'paralell' && page === 1) {
      params.push(["count", 'true']);
    }
    if (expand) {
      for (let i = 0; i < expand.length; i++) {
        params.push(["expand", expand[i]]);
      }
    }
    const queryParams = new URLSearchParams(params);
    const endpoint = (countMode === 'count-only') ? `${apiAddress}/count` : apiAddress;
    const resolvedEndpoint = buildApiUrl(endpoint);
    const queryString = queryParams.toString();
    const path = queryString ? `${resolvedEndpoint}?${queryString}` : resolvedEndpoint;
    console.log(path);
    response.value = await fetch(path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.value.ok) {
      throw new Error(`Error: ${response.value.statusText}`);
    }

    const data = await response.value.json();
    console.log(data, 'q');

    list.value = data.items;
    totalItems.value = data.count || 0;
    totalPages = data.count ? Math.ceil(data.count / pageSize) : 0;
    finishLoading();
  } catch (err) {
    failLoading(err as Error);
  }

  const isEmpty = computed(
    () => list.value.length === 0 && loaded.value && !loading.value
  );

  return { list, totalItems, totalPages, isEmpty };
}

export function baseItemValue<T>(schema: any): T {
  const result: Partial<T> = {};

  const getDependncyValues = (entityName: string) => {
    const DependencySchema = schema._dependencies?.find(
      (prop: any) => prop.name === entityName
    );
    if (DependencySchema) {
      if(DependencySchema.hasId) {
        return ''
      }
      return baseItemValue(DependencySchema);
    }
  };

  schema.properties.forEach((prop: any) => {
    const key = prop.name as keyof T;
    const property = prop;

    if (property.type === "reference" && property.source) {
      result[key] = property.isArray ? [] as T[keyof T] : getDependncyValues(property.source) as T[keyof T];
      return;
    }

    switch ((property.type ?? "").toLowerCase()) {
      case "string":
        result[key] = (
          property.default ? String(property.default) : ""
        ) as T[keyof T];
        break;
      case "number":
      case "integer":
        result[key] = (
          property.default ? Number(property.default) : 0
        ) as T[keyof T];
        break;
      case "boolean":
        result[key] = (
          property.default !== undefined ? Boolean(property.default) : false
        ) as T[keyof T];
        break;
      case "object":
        // Handle nested objects or provide a default empty object
        result[key] = (property.default ?? {}) as T[keyof T];
        break;
      case "array":
        // Provide a default empty array
        result[key] = (property.default ?? []) as T[keyof T];
        break;
      case "null":
        result[key] = null as T[keyof T];
        break;
      // Add more cases as needed for your application
      default: {
        result[key] = (
          property.default ? String(property.default) : ""
        ) as T[keyof T];
      }
    }
    if (property.isArray) {
      result[key] = [] as T[keyof T];
    }
  });
  return result as T;
}

export async function baseSave<T>({
  apiAddress,
  item,
  itemLoadable,
}: {
  apiAddress: string;
  item: T;
  itemLoadable: Loadable;
}) {
  const { startLoading, finishLoading, failLoading } = itemLoadable;
  const itemData = ref<T | null>(null);
  const response = ref<Error | null | any>(null);

  startLoading();
  try {
    const url = buildApiUrl(apiAddress);

    response.value = await useFetch(url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });



  itemData.value = response.value?.data;
  finishLoading();
} catch (err) {
  failLoading(err as Error);
}

return {  ...(itemData.value ? itemData.value : {}) };
}

export async function baseDelete(
  apiAddress: string,
  id: string,
  itemLoadable: Loadable
) {
  const { startLoading, finishLoading, failLoading } = itemLoadable;
  const response = ref<Error | null | any>(null);

  startLoading();
  try {
    const url = buildApiUrl(`${apiAddress}/${id}`);

    response.value = await useFetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    failLoading(err as Error);
  }
  finishLoading();

  return { response };
}

export async function baseUpdate<T>({
  apiAddress,
  id,
  item,
  itemLoadable,
}: {
  apiAddress: string;
  id: string;
  item: T;
  itemLoadable: Loadable;
}) {
  const { startLoading, finishLoading, failLoading } = itemLoadable;
  const itemData = ref<T | null>(null);
  const response = ref<Error | null | any>(null);

  startLoading();
  try {
    const url = buildApiUrl(`${apiAddress}/${id}`);

    response.value = await useFetch(url, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    itemData.value = response.value?.data;
    finishLoading();
  } catch (err) {
    failLoading(err as Error);
  }

  return { itemData, response };
}

export function baseDialog<T>(querySelector: string, itemData: any) {
  const element: Ref<HTMLDialogElement | null> = ref(null);

  element.value = document.querySelector(querySelector) as HTMLDialogElement;

  const modal = ref<{ open: boolean; item: T | any; index?: number | null }>({
    open: false,
    item: itemData(),
    index: null,
  });

  const set = ({
    open,
    item: formData,
    index,
  }: {
    open: boolean;
    item: T | any;
    index?: number | null;
  }) => {
    if (formData) {
      modal.value.item = formData;
    } else {
      modal.value.item = itemData();
    }

    modal.value.open = open;
    modal.value.index = index;
    if (!open) {
      element.value?.close();
    } else {
      element.value?.showModal();
    }
  };

  return { set, modal, element };
}

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export const mergeDefaults = <T>(defaults: T, value: Partial<T> | undefined): T => {
  if (value === undefined) {
    return defaults;
  }
  if (value === null) {
    return value as T;
  }
  if (Array.isArray(defaults)) {
    return (value as T) ?? defaults;
  }
  if (isPlainObject(defaults) && isPlainObject(value)) {
    const result: Record<string, unknown> = { ...defaults };
    for (const key of Object.keys(value)) {
      const nextValue = (value as Record<string, unknown>)[key];
      const nextDefault = (defaults as Record<string, unknown>)[key];
      if (nextValue === undefined) {
        continue;
      }
      if (isPlainObject(nextDefault) && isPlainObject(nextValue)) {
        result[key] = mergeDefaults(nextDefault, nextValue as Record<string, unknown>);
      } else if (Array.isArray(nextDefault) && Array.isArray(nextValue)) {
        result[key] = nextValue;
      } else {
        result[key] = nextValue;
      }
    }
    return result as T;
  }
  return (value as T) ?? defaults;
};