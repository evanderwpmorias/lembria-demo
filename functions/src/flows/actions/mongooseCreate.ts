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

export const mongooseCreateAction = async (params: FlowActionHandlerParams = {}, model?: any) => {
  try {
    if (!model) {
      return false;
    }

    const inputData = isPlainObject(params.input?.data)
      ? params.input.data
      : isPlainObject(params.input)
        ? params.input
        : {};

    const doc = new model(inputData);
    await doc.save();
    return doc.toJSON();
  } catch (error: any) {
    return false;
  }
};
