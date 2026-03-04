
import { createFilter  } from 'odata-v4-mongodb'
import sanitize from 'mongo-sanitize';
import { getQuery, setHeader, getRouterParam, readBody, createError, setResponseStatus } from 'h3';
import crypto from 'crypto';
export { families as families } from './families'
export { persons as persons } from './persons'
export { stories as stories } from './stories'
export { users as users } from './users'
export { memories as memories } from './memories'
export { sessions as sessions } from './sessions'
export { messages as messages } from './messages'


const CACHE_CONTROL_PUBLIC = 'public, max-age=300';
const CACHE_CONTROL_NO_CACHE = 'no-cache, no-store, must-revalidate';
const CACHE_CONTROL_ETAG = 'public, max-age=0, must-revalidate';

/**
 * Standard response handler for API errors
 * @param event The event to set status and headers on
 * @param statusCode HTTP status code to return
 * @param message User-friendly error message
 * @param errorDetails Technical error details (optional)
 * @returns Object with standardized error response format
 */
export const handleError = (event: any, statusCode: number, message: string, errorDetails?: any): object => {
  setResponseStatus(event, statusCode);
  return {
    success: false,
    message,
    error: errorDetails?.message || errorDetails,
    statusCode
  };
};

/**
 * Generates a strong ETag for the provided data
 * @param data The data to generate an ETag for
 * @returns Strong ETag string with quotes
 */
const generateETag = (data: any): string => {
  const jsonData = JSON.stringify(data);
  const hash = crypto.createHash('sha1').update(jsonData).digest('hex');
  return `"${hash}"`; // ETags are enclosed in quotes
};

/**
 * Checks if the provided ETag matches the If-None-Match header
 * @param event The event containing headers
 * @param etag The ETag to compare against
 * @returns True if the ETag matches any of the If-None-Match values
 */
const isETagMatch = (event: any, etag: string): boolean => {
  const ifNoneMatch = event.node.req.headers['if-none-match'];
  if (!ifNoneMatch) return false;
  
  // If-None-Match can be a comma-separated list of ETags
  const etags = ifNoneMatch.split(',').map(tag => tag.trim());
  return etags.includes(etag) || etags.includes('*');
};

/**
 * Sets ETag and Cache-Control headers for the response
 * @param event The event to modify headers on
 * @param etag The ETag value
 */
const setETagHeaders = (event: any, etag: string): void => {
  setHeader(event, 'ETag', etag);
  setHeader(event, 'Cache-Control', CACHE_CONTROL_ETAG);
};

/**
 * Returns a 304 Not Modified response with appropriate headers
 * @param event The event to respond to
 * @param etag The ETag to include
 * @returns Empty object (response body will be ignored)
 */
const respondNotModified = (event: any, etag: string): object => {
  setResponseStatus(event, 304);
  setETagHeaders(event, etag);
  return {};
};

export const requestHendler = async (Model: any, event: any) => {
    const {method} = event.node.req
    switch (method) {
        case 'GET': {
            const id = getRouterParam(event, 'id')
            if (id) {
                return await handleGetById(Model, event)
            }
            return await handleGet(Model, event)
        }
        case 'POST':
            return await handlePost(Model, event)
        case 'PUT':
            return await handlePut(Model, event)
        case 'PATCH':
            return await handlePatch(Model, event)
        case 'DELETE':
            return await handleDelete(Model, event)
        default:
            return {message: 'Method not allowed', method}
    }
}

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
  BaseModel,
  initialAggregationDefinition, 
  event, 
  countEndpoint = false
) => {
  try {
    let {
      filter, skip, limit, count, expand, select, sortby, order
    } = event;

    // Input sanitization
    filter = sanitize(filter) || {};
    skip = Number(sanitize(skip)) || 0;
    limit = Number(sanitize(limit)) || 20;
    count = Boolean(sanitize(count)) || false;
    expand = sanitize(expand) || [];
    select = sanitize(select) || "";
    sortby = sanitize(sortby);
    order = (sanitize(order) || "asc").toLowerCase();

    // Transform filters
    filter = transformFilter(filter);

    // Validation
    if (typeof filter !== "object" || Array.isArray(filter)) {
      throw new Error("Filter must be an object");
    }
    if (typeof skip !== "number" || skip < 0) {
      throw new Error("Skip must be a non-negative number");
    }
    if (typeof limit !== "number" || limit <= 0) {
      throw new Error("Limit must be a positive number");
    }

    // Base aggregation pipeline
    const pipeline = [...initialAggregationDefinition];

    // Apply filter
    if (Object.keys(filter).length > 0) {
      pipeline.push({ $match: filter });
    }

    // Apply sorting
    if (sortby) {
      const sortDirection = order === "desc" ? -1 : 1;
      pipeline.push({ $sort: { [sortby]: sortDirection } });
    }


    // Apply field selection
    if (select) {
      const projectFields = select.split(",").reduce((acc, field) => {
        acc[field.trim()] = 1;
        return acc;
      }, {});
      pipeline.push({ $project: projectFields });
    }

    // Count endpoint
    if (countEndpoint) {
      pipeline.push({ $count: "total" });
      const result = await BaseModel.aggregate(pipeline).exec();
      return { count: result[0]?.total || 0, message: "Count successfully" };
    }

    // Apply pagination
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Execute aggregation
    const aggregationResult = await BaseModel.aggregate(pipeline).exec();



    return {
      items: aggregationResult,
      message: "Aggregation successfully executed",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while executing aggregation",
      error: error.message,
    };
  }
};

  
export const handleGet = async (Model: any, event: any, countEndpoint: boolean = false) => {
  let { filter, skip = 0, top: limit = 20, count= false, expand = [], select = "", sort = "", order="asc", all = false } = getQuery(event);

  try {
    filter = sanitize(filter) as string;
    filter = (filter && filter.length > 0 && createFilter(filter)) || {};
    skip = Number(sanitize(skip)) || 0;
    limit = Number(sanitize(limit)) || 20;
    all = Boolean(sanitize(all)) || false;
    count = Boolean(sanitize(count)) || false;
    expand = sanitize(expand) || [];
    select = sanitize(select) || ""; // Sanitizing select to ensure safety
    sort = sanitize(sort);
    order = String(sanitize(order) || "asc").toLowerCase();
  } catch (error) {
    return handleError(event, 400, "Bad request parameter", error);
  }

  try {
    filter = transformFilter(filter)
    
    if (typeof filter !== "object" || Array.isArray(filter)) {
      return handleError(event, 400, "Filter must be an object");
    }
    if (typeof skip !== "number" || skip < 0) {
      return handleError(event, 400, "Skip must be a non-negative number");
    }
    if (typeof limit !== "number" || limit <= 0) {
      return handleError(event, 400, "Limit must be a positive number");
    }
    
    if (countEndpoint === true) { 
      const count = await countDocuments(Model, filter);
      return { count, message: "Count successfully" };
    } 

    const query = Model.find(filter).skip(skip)

    if (all == false) {
      query.limit(limit);
    }

    if (sort) {
      const sortDirection = order === "desc" ? -1 : 1;
      query.sort({ [sort]: sortDirection });
    }

    if (typeof expand === "string" && expand.length > 0) {
      expand = [expand];
    }

    if (Array.isArray(expand) && expand.length > 0) {
      applyPopulate(query, expand);
    }

    // Apply the select fields to the query
    if (select && typeof select === "string" && select.length > 0) {
      query.select(select.split(",").join(" "));
    }

    const AllItens = await query.exec();
    const properties = AllItens.map((singeleItem: any) => singeleItem.toJSON());

    const output = {
      success: true,
      expand,
      items: properties,
      message: "Resources retrieved successfully"
    }

    if (count && skip === 0) {
      const count = await countDocuments(Model, filter);
      output.count = count;
    }

    // Generate ETag from the response data before it's sent
    const etag = generateETag(output);

    // Check if the client already has this version (If-None-Match header)
    if (isETagMatch(event, etag)) {
      return respondNotModified(event, etag);
    }

    // Set ETag and cache control headers
    setETagHeaders(event, etag);
    setHeader(event, 'Cache-Control', CACHE_CONTROL_PUBLIC);

    return output;
    
  } catch (error) {
    console.error(error);
    return handleError(event, 500, "An error occurred while fetching resources", error);
  }
};

export const handleGetById = async (Model: any, event: any) => {
    const id = getRouterParam(event, "id");
    let { expand = [], select =""} = getQuery(event);
    try {
        expand = sanitize(expand) || [];
        select = sanitize(select) || ""; 
    } catch (error) {
        return handleError(event, 400, "Bad request parameter", error);
    }
    
    try {
        if (typeof id !== "string" || id.length === 0) {
            return handleError(event, 400, "Id must be a non-empty string");
        }
        
        if (typeof expand === "string" && expand.length > 0) {
            expand = [expand];
        }

        const query = Model.findById(id);

        if (Array.isArray(expand) && expand.length > 0) {
            applyPopulate(query, expand);
        }

        // Apply the select fields to the query
        if (select && typeof select === "string" && select.length > 0) {
            query.select(select.split(",").join(" "));
        }

        const property = await query.exec();
        if (!property) {
            return handleError(event, 404, "Resource not found");
        }
        
        const output = {
            item: property.toJSON(),
            message: "Resource successfully fetched",
            success: true,
        };
        
        // Generate ETag from the response data before it's sent
        const etag = generateETag(output);
        
        // Check if the client already has this version (If-None-Match header)
        if (isETagMatch(event, etag)) {
            return respondNotModified(event, etag);
        }
        
        // Set ETag and cache control headers
        setETagHeaders(event, etag);
        
        return output;
    } catch (error) {
        console.error(error);
        return handleError(event, 500, "An error occurred while fetching resource", error);
    }
};

export const handleDelete = async (Model: any, event: any) => {
    const id = getRouterParam(event, 'id');
    
    try {
        if (!id) {
            return handleError(event, 400, "ID parameter is required");
        }
        
        const existingItem = await Model.findById(id);
        if (!existingItem) {
            return handleError(event, 404, "Resource not found");
        }
        
        await Model.findByIdAndDelete(id);
        
        // Return 204 No Content for successful DELETE operations
        setResponseStatus(event, 204);
        setHeader(event, 'Cache-Control', CACHE_CONTROL_NO_CACHE);
        
        // Empty response body for 204 status code
        return {};
    } catch (error) {
        console.error(error);
        return handleError(event, 500, "An error occurred while deleting resource", error);
    }
}

export const handlePut = async (Model: any, event: any, dataOverride: any = {}) => {
    const id = getRouterParam(event, 'id');
    
    try {
        if (!id) {
            return handleError(event, 400, "ID parameter is required");
        }
        
        // First retrieve the current resource to check if it exists
        const existingItem = await Model.findById(id);
        if (!existingItem) {
            return handleError(event, 404, "Resource not found");
        }
        
        // Generate ETag for the current resource state
        const currentETag = generateETag({ item: existingItem.toJSON() });
        
        // Check If-Match header for concurrency control
        if (!checkIfMatch(event, currentETag)) {
            return handleError(event, 412, "Precondition failed - resource has been modified");
        }
        
        const data = await readBody(event);
        
        // Validate the request body
        if (!data || typeof data !== 'object') {
            return handleError(event, 400, "Invalid request body");
        }
        
        try {
            const updatedItem = await Model.findByIdAndUpdate(
                id, 
                {...data, ...dataOverride}, 
                { new: true, runValidators: true }
            );
            
            // Set cache control headers
            setHeader(event, 'Cache-Control', CACHE_CONTROL_NO_CACHE);
            
            const response = {
                item: updatedItem.toJSON(),
                message: "Resource successfully updated",
                success: true
            };
            
            // Generate new ETag for the updated resource
            const newETag = generateETag(response);
            setETagHeaders(event, newETag);
            
            return response;
        } catch (error) {
            // Check for validation errors
            if (error.name === 'ValidationError') {
                return handleError(event, 400, "Validation error", error);
            }
            
            // Check for conflict with unique constraints
            if (error.name === 'MongoError' && error.code === 11000) {
                return handleError(event, 409, "Resource update conflicts with existing data", error);
            }
            
            throw error; // Pass other errors to the outer catch block
        }
    } catch (error) {   
        console.error(error);
        return handleError(event, 500, "An error occurred while updating the resource", error);
    }
}

export const handlePost = async (Model: any, event: any, dataOverride: any = {}) => {
    try {
        const data = await readBody(event);
        
        // Validate the request body
        if (!data || typeof data !== 'object') {
            return handleError(event, 400, "Invalid request body");
        }
        
        // Create the new resource
        const ref = new Model({...data, ...dataOverride});
        await ref.save();
        const item = ref.toJSON();
        const { _id } = item;
        
        // Set status code to 201 Created
        setResponseStatus(event, 201);
        
        // Set Location header pointing to the newly created resource
        const requestUrl = event.node.req.url;
        const baseUrl = requestUrl.split('?')[0]; // Remove query parameters if any
        const locationUrl = baseUrl.endsWith('/') ? `${baseUrl}${_id}` : `${baseUrl}/${_id}`;
        setHeader(event, 'Location', locationUrl);
        
        // Set cache control headers
        setHeader(event, 'Cache-Control', CACHE_CONTROL_NO_CACHE);
        
        return {
            item,
            id: _id,
            message: "Resource successfully created",
            success: true
        };
    } catch (error) {
        console.error(error);
        // Check for specific error types to return appropriate status codes
        if (error.name === 'ValidationError') {
            return handleError(event, 400, "Validation error", error);
        }
        if (error.name === 'MongoError' && error.code === 11000) {
            return handleError(event, 409, "Resource already exists with the same unique field", error);
        }
        return handleError(event, 500, "An error occurred while creating the resource", error);
    }
}

/**
 * Checks if the provided ETag matches the If-Match header
 * Used for concurrency control in write operations
 * @param event The event containing headers
 * @param currentETag The current ETag of the resource
 * @returns True if the ETag matches the If-Match value or If-Match is not present
 */
const checkIfMatch = (event: any, currentETag: string): boolean => {
  const ifMatch = event.node.req.headers['if-match'];
  if (!ifMatch) return true; // If If-Match is not provided, allow the operation
  
  // If-Match can be a comma-separated list of ETags or '*'
  const etags = ifMatch.split(',').map(tag => tag.trim());
  return etags.includes(currentETag) || etags.includes('*');
};

/**
 * Handles PATCH requests for partial updates with concurrency control
 */
export const handlePatch = async (Model: any, event: any, dataOverride: any = {}) => {
    // Check if user is authorized to perform this request
    try {
        await authorizeRequest(event);
    } catch (authError: any) {
        return handleError(event, authError.statusCode || 403, authError.message || "Authorization failed", authError);
    }
    
    const id = getRouterParam(event, 'id');
    
    try {
        if (!id) {
            return handleError(event, 400, "ID parameter is required");
        }
        
        // First retrieve the current resource to check if it exists
        const existingItem = await Model.findById(id);
        if (!existingItem) {
            return handleError(event, 404, "Resource not found");
        }
        
        // Generate ETag for the current resource state
        const currentETag = generateETag({ item: existingItem.toJSON() });
        
        // Check If-Match header for concurrency control
        if (!checkIfMatch(event, currentETag)) {
            return handleError(event, 412, "Precondition failed - resource has been modified");
        }
        
        // Get the partial data to update
        const patchData = await readBody(event);
        
        // Validate the request body
        if (!patchData || typeof patchData !== 'object') {
            return handleError(event, 400, "Invalid request body");
        }
        
        try {
            // Apply the patch (only updating specified fields)
            const updatedItem = await Model.findByIdAndUpdate(
                id, 
                { $set: {...patchData, ...dataOverride} }, 
                { new: true, runValidators: true }
            );
            
            // Set cache control headers
            setHeader(event, 'Cache-Control', CACHE_CONTROL_NO_CACHE);
            
            const response = {
                item: updatedItem.toJSON(),
                message: "Resource successfully updated",
                success: true
            };
            
            // Generate new ETag for the updated resource
            const newETag = generateETag(response);
            setETagHeaders(event, newETag);
            
            return response;
        } catch (error) {
            // Check for validation errors
            if (error.name === 'ValidationError') {
                return handleError(event, 400, "Validation error", error);
            }
            
            // Check for conflict with unique constraints
            if (error.name === 'MongoError' && error.code === 11000) {
                return handleError(event, 409, "Resource update conflicts with existing data", error);
            }
            
            throw error; // Pass other errors to the outer catch block
        }
    } catch (error) {   
        console.error(error);
        return handleError(event, 500, "An error occurred while updating the resource", error);
    }
}
