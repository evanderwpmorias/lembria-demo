import { mongoose } from 'mongoose';

export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

export const mongooseCreateAction = async (params: FlowActionHandlerParams = {}) => {
  const Model = mongoose.model(params.config.model);
  const document = await Model.create(params.input.data);
  return { document };
};
