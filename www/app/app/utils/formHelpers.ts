import { selectComponent } from "@/components/core/inputs/baseComponents";
import { toCamelCase } from "./";



export const getDependencySchema = (property, schema) => {
  const inputProp = schema.properties.find(p => p.name === property);
  if (!inputProp || inputProp.type !== "reference" || !inputProp.source) {
    return {};
  }
  
  // Check if it's a self-reference
  if (inputProp.source === schema.name) {
    return schema; // Return the same schema for self-reference
  }
  
  return schema._dependencies?.find(dep => dep.name === inputProp.source) || {};
};

export const getInputMap = (propertyName, Schema:any) => {
  const input = Schema.properties.find((property: any) => property.name === propertyName);
  const { _dependencyFetchMap } = Schema;
  console.log(Schema, propertyName);
  console.log(_dependencyFetchMap);
  const inputMap = _dependencyFetchMap?.[propertyName] || [];
  console.log(inputMap);
  if (!input || !inputMap.length) {
    return {};
  }


  return inputMap;
}

export const buildFormSchema = (schema?: any, form?: any, helpers?: any) => {
  if (!schema || !form) {
    return [];
  }
  const inputs = form.inputs || [];
  return inputs.map((input) => {
    const inputSchema =
      schema.properties.find(
        (property: any) => property.name === input.schemaProperty
      ) || {};
    if (inputSchema && inputSchema.type === "enum") {
      const enumValues = String(inputSchema.enum || "")
        .split(",")
        .map((option: string) => option.trim());
      input.component = selectComponent;
      const options = enumValues.map((option: any) => ({
        value: option,
        label: option,
      }));
      inputSchema.options = options;
    }
    if (inputSchema.type === "reference" && inputSchema.source) {
      const DependencySchema = getDependencySchema(input.schemaProperty, schema);
      let helper = null 
      if (
        helpers &&
        inputSchema.source &&
        Object.prototype.hasOwnProperty.call(helpers, toCamelCase(inputSchema.source))
      ) {
        helper = helpers[toCamelCase(inputSchema.source)];
      }
      if (Object.keys(DependencySchema).length) {
        return {
          ...input,
          ...inputSchema,
          _schema: DependencySchema,
          _isReference: true,
          _helper: helper,
        };
      }
    }
    if (inputSchema.type === "object" && input.component?.type === "map") {
      // This is a map input for key-value pairs
      return {
        ...input,
        ...inputSchema,
        type: "map"
      };
    }
    return {
      ...input,
      ...inputSchema,
    };
  });
};


export const hasIdProperty = (schema: any): boolean => {
  if (!schema || !schema.properties) {
    return false;
  }
  return schema.properties.some((property: any) => property.name === "_id");
};

export function baseItemValue<T>(schema: any): T {
  const result: Partial<T> = {};

  const getDependncyValues = (entityName: string) => {
    const DependencySchema = schema._dependencies?.find(
      (prop: any) => prop.name === entityName
    );
    if (DependencySchema) {
      if(hasIdProperty(DependencySchema)) {
        return ''
      }
      return baseItemValue(DependencySchema);
    }
  };

  schema.properties.forEach((property) => {
    const key = property.name;

    if (property.type === "reference" && property.source) {
      result[key] = property.isArray ? [] as T[keyof T] : getDependncyValues(property.source) as T[keyof T];
      return;
    }

    if (property) {
      // if (excludedEntities.includes(property.name)) {
      //   return;
      // }
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
          // Special case for map inputs
          if (property.component?.type === "map") {
            result[key] = {} as T[keyof T];
          } else {
            result[key] = (property.default ?? {}) as T[keyof T];
          }
          break;
        case "map":
          result[key] = {} as T[keyof T];
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
    }
  });
  return result as T;
}
export function baseItemValue2(schema: any) {
  const result = {};

  schema.properties.forEach((prop) => {
    const key = prop.name;
    const property = prop;
    if (prop) {
      switch ((property.type ?? "").toLowerCase()) {
        case "string":
          result[key] = property.default ? String(property.default) : "";
          break;
        case "number":
        case "integer":
          result[key] = property.default ? Number(property.default) : 0;
          break;
        case "boolean":
          result[key] = property.default ? Boolean(property.default) : false;
          break;
        case "object":
          // Handle nested objects or provide a default empty object
          result[key] = property.default ? Object(property.default) : {};
          break;
        case "array":
          // Provide a default empty array
          result[key] = property.default ? Array.from(property.default) : [];
          break;
        case "null":
          result[key] = null;
          break;
        // Add more cases as needed for your application
        default:
          result[key] = property.default ?? "";
      }
      if (property.isArray) {
        result[key] = [];
      }
    }
  });
  return result;
}

export const setDefaultValues = (form: any) => {
  const inputs = form.inputs || [];
  const data = {};
  inputs.forEach((input) => {
    data[input.schemaProperty] = input.defaultValue || "";
  });
  return data;
};
