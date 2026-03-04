export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

export const ${action.name} = async (params: FlowActionHandlerParams = {}, model?: any) => {
  try {
    const doc = new model(params.input?.data);
    await doc.save();
    return doc.toJSON();
  } catch (error: any) {
    return false;
  }
};
