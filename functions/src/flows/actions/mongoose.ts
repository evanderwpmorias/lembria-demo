import { mongoose } from 'mongoose';

export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

export const mongooseActionHandlers: Record<string, (params?: FlowActionHandlerParams) => Promise<any>> = {
  'mongoose.aggregate': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const pipeline = params.input.pipeline || [];
    const results = await Model.aggregate(pipeline);
    return { results };
  },

  'mongoose.create': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const document = await Model.create(params.input.data);
    return { document };
  },

  'mongoose.deleteOne': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    if (params.config.softDelete) {
        const result = await Model.updateOne({ _id: params.input.id }, { $set: { deletedAt: new Date() } });
        return { deletedCount: result.modifiedCount };
    } else {
        const result = await Model.deleteOne({ _id: params.input.id });
        return { deletedCount: result.deletedCount };
    }
  },

  'mongoose.findMany': async (params: FlowActionHandlerParams = {}) => {
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
  },

  'mongoose.findOne': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const filter = JSON.parse(params.config.filter || '{}');
    const query = Model.findOne({ ...filter, ...params.input.inputData });
    if (params.config.Expand) {
        query.populate(params.config.Expand);
    }
    if (params.config.scope) {
        query.select(params.config.scope);
    }
    const document = await query.exec();
    return { document };
  },

  'mongoose.increment': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const filter = JSON.parse(params.config.filter || '{}');
    const result = await Model.updateOne(filter, { $inc: { [params.input.field]: params.input.amount } });
    return { modifiedCount: result.modifiedCount };
  },

  'mongoose.patch': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const filter = JSON.parse(params.config.filter || '{}');
    const result = await Model.updateOne(filter, { $set: params.input.data }, { upsert: params.config.upsert || false });
    return { matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
  },

  'mongoose.updateOne': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const filter = JSON.parse(params.config.filter || '{}');
    const updateData = params.config.dataOverride || params.input.inputData;
    const result = await Model.updateOne(filter, updateData);
    return { matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
  },

  'mongoose.upsert': async (params: FlowActionHandlerParams = {}) => {
    const Model = mongoose.model(params.config.model);
    const filter = params.config.filter ? JSON.parse(params.config.filter) : { _id: params.input.id };
    const document = await Model.findOneAndUpdate(filter, params.input.data, { upsert: true, new: true, setDefaultsOnInsert: true });
    return { document };
  }
};
