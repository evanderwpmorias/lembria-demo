import { mongoose } from 'mongoose';

export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

export const mongooseFindManyAction = async (params: FlowActionHandlerParams = {}, Model) => {
  try {
    // Extract and validate configuration
    
    // Parse and validate filter
    let filter = {};
    try {
      filter = params.config.filter ? JSON.parse(params.config.filter) : {};
    } catch (parseError) {
      throw new Error("Invalid JSON in filter configuration");
    }
    
    // Merge with input data
    filter = { ...filter, ...params.input?.inputData };
    
    // Extract and validate pagination parameters
    const skip = Math.max(0, Number(params.config.skip) || 0);
    const limit = Math.max(1, Number(params.config.limit) || 20);
    
    // Build query
    let query = Model.find(filter).skip(skip).limit(limit);
    
    // Apply sorting if configured
    if (params.config.sort) {
      const sortDirection = params.config.order === "desc" ? -1 : 1;
      query = query.sort({ [params.config.sort]: sortDirection });
    }
    
    // Apply field selection if configured
    if (params.config.scope) {
      query = query.select(params.config.scope);
    }
    
    // Apply population for references if configured
    if (params.config.expand) {
      const expandFields = Array.isArray(params.config.expand) 
        ? params.config.expand 
        : [params.config.expand];
      expandFields.forEach(field => {
        if (field) query = query.populate(field);
      });
    }
    
    // Execute query
    const documents = await query.exec();
    
    return documents.map((doc: any) => doc.toJSON?.() || doc);
  } catch (error: any) {
    false
  }
};
