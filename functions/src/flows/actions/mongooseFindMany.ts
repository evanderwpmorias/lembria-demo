import { mongoose } from 'mongoose';

export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

export const mongooseFindManyAction = async (params: FlowActionHandlerParams = {}) => {
  const Model = mongoose.model(params.config.model);
  const filter = JSON.parse(params.config.filter || '{}');
  let query = Model.find({ ...filter, ...params.input.inputData });
  if (params.config.limit) {
      query = query.limit(params.config.limit);
  }
  if (params.config.skip) {
      query = query.skip(Number(params.config.skip));
  }
  if (params.config.scope) {
      query = query.select(params.config.scope);
  }
  const documents = await query.exec();
  const count = documents.length;
  return { documents, count };
};
