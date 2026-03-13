
import { createFilter } from 'odata-v4-mongodb'
export { families as families } from './families'
export { persons as persons } from './persons'
export { stories as stories } from './stories'
export { users as users } from './users'
export { memories as memories } from './memories'
export { sessions as sessions } from './sessions'
export { messages as messages } from './messages'

const countDocuments = async (Model: any, filter: any) => {
  return await Model.find(filter).countDocuments();
}

type Filter = { [key: string]: any };
function transformFilter(filter: any) {
  const transformed: Filter = {};

  for (const key in filter) {
    if (!filter.hasOwnProperty(key)) continue;

    const value = filter[key];

    if (typeof value === 'object' && !Array.isArray(value)) {
      // Recursively transform nested filters
      transformed[key] = transformFilter(value);
    } else if (key.endsWith('_contains')) {
      // Replace '_contains' suffix with a regex operator
      const newKey = key.replace('_contains', '');
      transformed[newKey] = { '$regex': value, '$options': 'i' };
    } else if (key.endsWith('_includes')) {
      // Check if value(s) exist in an array field
      // Supports comma-separated values: "value1,value2,value3"
      const newKey = key.replace('_includes', '');
      const values = typeof value === 'string' 
        ? value.split(',').map((v: string) => v.trim()).filter(Boolean)
        : Array.isArray(value) ? value : [value];
      transformed[newKey] = { '$in': values };
    } else if (Array.isArray(value)) {
      // Handle array values (e.g., '$or' or '$and')
      transformed[key] = value.map((item) =>
        typeof item === 'object' ? transformFilter(item) : item
      );
    } else {
      // Keep other key-value pairs unchanged
      transformed[key] = value;
    }
  }

  return transformed;
}


const buildNestedPopulate = (path: string) => {
  const parts = path.split('.').filter(Boolean);
  if (parts.length <= 1) {
    return parts[0] || '';
  }

  let populate: any = { path: parts.pop() };
  while (parts.length > 1) {
    populate = { path: parts.pop(), populate };
  }

  return { path: parts[0], populate };
};

const applyPopulate = (query: any, expand: any[]) => {
  expand.forEach((field: string) => {
    if (typeof field !== "string" || field.length === 0) return;
    if (field.includes(".")) {
      const populate = buildNestedPopulate(field);
      if (populate) {
        query.populate(populate as any);
      }
      return;
    }
    query.populate(field);
  });
};

export const handleAggregation = async (
  BaseModel: any,
  initialAggregationDefinition: any[],
  params: {
    filter?: any;
    skip?: number;
    limit?: number;
    count?: boolean;
    expand?: string | string[];
    select?: string;
    sortby?: string;
    order?: string;
  },
  countEndpoint = false
) => {
  let {
    filter = {}, skip = 0, limit = 20, select = "", sortby, order = "asc"
  } = params;

  filter = transformFilter(filter);

  if (typeof filter !== "object" || Array.isArray(filter)) {
    throw new Error("Filter must be an object");
  }
  if (typeof skip !== "number" || skip < 0) {
    throw new Error("Skip must be a non-negative number");
  }
  if (typeof limit !== "number" || limit <= 0) {
    throw new Error("Limit must be a positive number");
  }

  const pipeline = [...initialAggregationDefinition];

  if (Object.keys(filter).length > 0) {
    pipeline.push({ $match: filter });
  }

  if (sortby) {
    const sortDirection = order === "desc" ? -1 : 1;
    pipeline.push({ $sort: { [sortby as string]: sortDirection } });
  }

  if (select) {
    const projectFields = (select as string).split(",").reduce((acc: Record<string, number>, field: string) => {
      acc[field.trim()] = 1;
      return acc;
    }, {});
    pipeline.push({ $project: projectFields });
  }

  if (countEndpoint) {
    pipeline.push({ $count: "total" });
    const result = await BaseModel.aggregate(pipeline).exec();
    return { count: result[0]?.total || 0, message: "Count successfully" };
  }

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  const aggregationResult = await BaseModel.aggregate(pipeline).exec();

  return {
    items: aggregationResult,
    message: "Aggregation successfully executed",
  };
};

export interface GetParams {
  filter?: string | Record<string, any>;
  skip?: number;
  limit?: number;
  count?: boolean;
  expand?: string | string[];
  select?: string;
  sort?: string;
  order?: string;
  all?: boolean;
}

export const handleGet = async (Model: any, params: GetParams = {}, countEndpoint: boolean = false) => {
  let {
    filter = {}, skip = 0, limit = 20, count = false, expand = [],
    select = "", sort = "", order = "asc", all = false
  } = params;

  if (typeof filter === 'string' && filter.length > 0) {
    filter = createFilter(filter);
  }

  filter = transformFilter(filter);

  if (typeof filter !== "object" || Array.isArray(filter)) {
    throw new Error("Filter must be an object");
  }
  if (typeof skip !== "number" || skip < 0) {
    throw new Error("Skip must be a non-negative number");
  }
  if (typeof limit !== "number" || limit <= 0) {
    throw new Error("Limit must be a positive number");
  }

  if (countEndpoint === true) {
    const totalCount = await countDocuments(Model, filter);
    return { count: totalCount, message: "Count successfully" };
  }

  const query = Model.find(filter).skip(skip);

  if (all === false) {
    query.limit(limit);
  }

  if (sort) {
    const sortDirection = order === "desc" ? -1 : 1;
    query.sort({ [sort as string]: sortDirection });
  }

  if (typeof expand === "string" && expand.length > 0) {
    expand = [expand];
  }

  if (Array.isArray(expand) && expand.length > 0) {
    applyPopulate(query, expand);
  }

  if (select && typeof select === "string" && select.length > 0) {
    query.select(select.split(",").join(" "));
  }

  const allItems = await query.exec();
  const properties = allItems.map((item: any) => item.toJSON());

  const output: any = {
    success: true,
    expand,
    items: properties,
    message: "Resources retrieved successfully"
  };

  if (count && skip === 0) {
    output.count = await countDocuments(Model, filter);
  }

  return output;
};

export const handleGetById = async (
  Model: any,
  id: string,
  params: { expand?: string | string[]; select?: string } = {}
) => {
  const { expand: expandParam = [], select = "" } = params;
  let expand: string | string[] = expandParam;

  if (typeof id !== "string" || id.length === 0) {
    throw new Error("Id must be a non-empty string");
  }

  if (typeof expand === "string" && expand.length > 0) {
    expand = [expand];
  }

  const query = Model.findById(id);

  if (Array.isArray(expand) && expand.length > 0) {
    applyPopulate(query, expand);
  }

  if (select && typeof select === "string" && select.length > 0) {
    query.select(select.split(",").join(" "));
  }

  const property = await query.exec();
  if (!property) {
    throw Object.assign(new Error("Resource not found"), { statusCode: 404 });
  }

  return {
    item: property.toJSON(),
    message: "Resource successfully fetched",
    success: true,
  };
};

export const handleDelete = async (Model: any, id: string) => {
  if (!id) {
    throw new Error("ID parameter is required");
  }

  const existingItem = await Model.findById(id);
  if (!existingItem) {
    throw Object.assign(new Error("Resource not found"), { statusCode: 404 });
  }

  await Model.findByIdAndDelete(id);

  return { success: true, message: "Resource successfully deleted" };
};

export const handlePut = async (Model: any, id: string, data: any, dataOverride: any = {}) => {
  if (!id) {
    throw new Error("ID parameter is required");
  }

  if (!data || typeof data !== 'object') {
    throw new Error("Invalid request body");
  }

  const existingItem = await Model.findById(id);
  if (!existingItem) {
    throw Object.assign(new Error("Resource not found"), { statusCode: 404 });
  }

  try {
    const updatedItem = await Model.findByIdAndUpdate(
      id,
      { ...data, ...dataOverride },
      { new: true, runValidators: true }
    );
    return {
      item: updatedItem.toJSON(),
      message: "Resource successfully updated",
      success: true
    };
  } catch (error: unknown) {
    const err = error as any;
    if (err.name === 'ValidationError') {
      throw Object.assign(new Error(err.message), { statusCode: 400, details: err });
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      throw Object.assign(new Error("Resource update conflicts with existing data"), { statusCode: 409, details: err });
    }
    throw error;
  }
};

export const handlePost = async (Model: any, data: any, dataOverride: any = {}) => {
  if (!data || typeof data !== 'object') {
    throw new Error("Invalid request body");
  }

  try {
    const ref = new Model({ ...data, ...dataOverride });
    await ref.save();
    const item = ref.toJSON();
    const { _id } = item;
    return {
      item,
      id: _id,
      message: "Resource successfully created",
      success: true
    };
  } catch (error: unknown) {
    const err = error as any;
    if (err.name === 'ValidationError') {
      throw Object.assign(new Error(err.message), { statusCode: 400, details: err });
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      throw Object.assign(new Error("Resource already exists with the same unique field"), { statusCode: 409, details: err });
    }
    throw error;
  }
};

export const handlePatch = async (Model: any, id: string, patchData: any, dataOverride: any = {}) => {
  if (!id) {
    throw new Error("ID parameter is required");
  }

  if (!patchData || typeof patchData !== 'object') {
    throw new Error("Invalid request body");
  }

  const existingItem = await Model.findById(id);
  if (!existingItem) {
    throw Object.assign(new Error("Resource not found"), { statusCode: 404 });
  }

  try {
    const updatedItem = await Model.findByIdAndUpdate(
      id,
      { $set: { ...patchData, ...dataOverride } },
      { new: true, runValidators: true }
    );
    return {
      item: updatedItem.toJSON(),
      message: "Resource successfully updated",
      success: true
    };
  } catch (error: unknown) {
    const err = error as any;
    if (err.name === 'ValidationError') {
      throw Object.assign(new Error(err.message), { statusCode: 400, details: err });
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      throw Object.assign(new Error("Resource update conflicts with existing data"), { statusCode: 409, details: err });
    }
    throw error;
  }
};
