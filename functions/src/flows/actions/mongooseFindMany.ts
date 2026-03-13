import { createFilter } from 'odata-v4-mongodb';

export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

const isPlainObject = (value: unknown): value is Record<string, any> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const getValueByPath = (source: Record<string, any>, path: string) => {
	return path.split('.').reduce<any>((acc, key) => {
		if (acc === undefined || acc === null) return undefined;
		return acc[key];
	}, source);
};

const interpolateTemplate = (template: string, source: Record<string, any>) => {
	return template.replace(/\$\{([^}]+)\}/g, (_, path: string) => {
		const value = getValueByPath(source, path.trim());
		return value === undefined || value === null ? '' : String(value);
	});
};

const toFilterObject = (rawFilter: unknown, source: Record<string, any>) => {
	if (isPlainObject(rawFilter)) return rawFilter;
	if (typeof rawFilter !== 'string' || rawFilter.trim().length === 0) return {};

	const renderedFilter = interpolateTemplate(rawFilter, source).trim();
	if (!renderedFilter) return {};

	if (renderedFilter.startsWith('{') || renderedFilter.startsWith('[')) {
		return JSON.parse(renderedFilter);
	}

	return createFilter(renderedFilter);
};

export const mongooseFindManyAction = async (params: FlowActionHandlerParams = {}, model?: any) => {
  try {
    if (!model) {
      return [];
    }

    // Extract and validate configuration
     const config = params.config || {};

    const filterSource = {
      input: params.input || {},
      context: params.context || {},
      flowMeta: params.flowMeta || {},
    };

    const parsedFilter = toFilterObject(config.filter, filterSource);
    
    // Merge with input data
    const inputData = isPlainObject(params.input?.inputData) ? params.input.inputData : {};
    const filter = { ...parsedFilter, ...inputData };
    
    // Extract and validate pagination parameters
    const skip = Math.max(0, Number(config.skip) || 0);
    const limit = Math.max(1, Number(config.limit) || 20);
    
    // Build query
    let query = model.find(filter).skip(skip).limit(limit);
    
    // Apply sorting if configured
    if (config.sort) {
      const sortDirection = config.order === "desc" ? -1 : 1;
      query = query.sort({ [config.sort]: sortDirection });
    }
    
    // Apply field selection if configured
    if (config.scope) {
      query = query.select(config.scope);
    }
    
    // Apply population for references if configured
    if (config.expand) {
      const expandFields = Array.isArray(config.expand) 
        ? config.expand 
        : [config.expand];
      expandFields.forEach(field => {
        if (field) query = query.populate(field);
      });
    }
    
    // Execute query
    const documents = await query.exec();
    
    return documents.map((doc: any) => doc.toJSON?.() || doc);
  } catch (error: any) {
    return false;
  }
};
