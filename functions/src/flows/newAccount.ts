import { mongooseFindManyAction } from './actions/mongooseFindMany';
import { mongooseCreateAction } from './actions/mongooseCreate';
import { newAccountData } from './data/newAccount';
import * as logger from "firebase-functions/logger";
import mongoose from 'mongoose';
import * as mongoModels from '../mongoSchema';

type PlainObject = Record<string, any>;

const FLOW_LOG_PREFIX = '[newAccountFlow]';

const isPlainObject = (value: unknown): value is PlainObject => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const removeEmptyValues = (obj: PlainObject = {}) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([, value]) => value !== '' && value !== undefined && value !== null)
	);
};

const toStepKey = (value: any, fallback: string = 'step') => {
	const normalized = String(value || fallback)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return normalized || fallback;
};

const resolveTemplateKey = (moduleRef?: any): string => {
	if (!moduleRef) return '';
	if (typeof moduleRef === 'string') return moduleRef;
	return moduleRef?.key || '';
};

const getStepInputMap = (stepMeta: unknown): Record<string, any> => {
	if (!stepMeta || typeof stepMeta !== 'object') return {};
	const inputMap = (stepMeta as { inputMap?: unknown }).inputMap;
	if (!inputMap || typeof inputMap !== 'object' || Array.isArray(inputMap)) return {};
	return inputMap as Record<string, any>;
};

const normalizeAuthPayload = (payload?: any): PlainObject => {
	const source = isPlainObject(payload?.data)
		? payload.data
		: isPlainObject(payload?.user)
			? payload.user
			: isPlainObject(payload)
				? payload
				: {};

	return removeEmptyValues({
		uid: source.uid,
		email: source.email,
		displayName: source.displayName,
		photoURL: source.photoURL,
		phoneNumber: source.phoneNumber,
		emailVerified: source.emailVerified,
		disabled: source.disabled,
	});
};

const getCreateUserPayload = (context: PlainObject) => {
	return removeEmptyValues({
		uid: context.uid,
		email: context.email,
		displayName: context.displayName,
		photoURL: context.photoURL,
		phoneNumber: context.phoneNumber,
		emailVerified: context.emailVerified,
		disabled: context.disabled,
	});
};

const buildStepInput = (stepMeta: any, actionKey: string, context: PlainObject): PlainObject => {
	const configuredInputs = isPlainObject(stepMeta?.inputs)
		? removeEmptyValues(stepMeta.inputs)
		: {};
	const mappedInputs = getStepInputMap(stepMeta);

	if (actionKey === 'mongoose.findMany') {
		return {
			...context,
			...configuredInputs,
			...mappedInputs,
			inputData: removeEmptyValues({ uid: context.uid, email: context.email }),
		};
	}

	if (actionKey === 'mongoose.create') {
		return {
			...context,
			...configuredInputs,
			...mappedInputs,
			data: getCreateUserPayload(context),
		};
	}

	return { ...context, ...configuredInputs, ...mappedInputs };
};

const resolveModelFromConfig = (config?: Record<string, any>) => {
	const modelName = config?.model;
	if (typeof modelName !== 'string' || !modelName) return undefined;
	return (mongoModels as Record<string, any>)[modelName] || (mongoose.models as Record<string, any>)[modelName];
};

const summarizeValue = (value: any) => {
	if (Array.isArray(value)) return { type: 'array', size: value.length };
	if (value && typeof value === 'object') return { type: 'object', keys: Object.keys(value) };
	if (value === null) return { type: 'null' };
	return { type: typeof value, value };
};

const actionHandlers: Record<string, (params?: any, model?: any) => Promise<any>> = {
	"mongoose.findMany": mongooseFindManyAction,
	"mongoose.create": mongooseCreateAction
};

export const newAccountFlow = async (input: any = {}) => {
	const steps = newAccountData?.steps || [];
	const flowMeta = {
		flowId: newAccountData?.flowId || '',
		flowName: newAccountData?.flowName || '',
		triggerKey: newAccountData?.triggerKey || '',
	};
	let context: Record<string, any> = { ...input };
	const results: Record<string, any> = {};

	logger.info(`${FLOW_LOG_PREFIX} started`, {
		flowMeta,
		stepsCount: steps.length,
		inputSummary: summarizeValue(input),
	});


  const stepMeta1 = steps[0] || {};
  const stepName1 = toStepKey(stepMeta1?.name || stepMeta1?.id || 'step1');
  const stepActionKey1 = resolveTemplateKey(stepMeta1?.actionId);
	const stepInput1 = buildStepInput(stepMeta1, stepActionKey1, context);
	const stepConfig1: Record<string, any> = stepMeta1?.config || {};
	const stepModel1 = resolveModelFromConfig(stepConfig1);
  const stepActionHandler1 = actionHandlers[stepActionKey1];
	logger.info(`${FLOW_LOG_PREFIX} step prepared`, {
		index: 1,
		stepName: stepName1,
		actionKey: stepActionKey1 || 'unknown',
		hasHandler: Boolean(stepActionHandler1),
		model: stepConfig1?.model || 'none',
		inputSummary: summarizeValue(stepInput1),
	});
  const stepResult1 = stepActionHandler1
  	? await stepActionHandler1({
  			input: stepInput1,
  			config: stepConfig1,
  			step: stepMeta1,
  			context: context,
  			flowMeta,
		}, stepModel1)
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey1 || 'unknown') };
  results[stepName1] = stepResult1;
	logger.info(`${FLOW_LOG_PREFIX} step completed`, {
		index: 1,
		stepName: stepName1,
		resultSummary: summarizeValue(stepResult1),
	});
  context = {
  	...context,
  	...(typeof stepResult1 === 'object' && stepResult1 !== null ? stepResult1 : { value: stepResult1 })
  };


  const stepMeta2 = steps[1] || {};
  const stepName2 = toStepKey(stepMeta2?.name || stepMeta2?.id || 'step2');
  const stepActionKey2 = resolveTemplateKey(stepMeta2?.actionId);
	const stepInput2 = buildStepInput(stepMeta2, stepActionKey2, context);
	const stepConfig2: Record<string, any> = stepMeta2?.config || {};
	const stepModel2 = resolveModelFromConfig(stepConfig2);
  const stepActionHandler2 = actionHandlers[stepActionKey2];
	logger.info(`${FLOW_LOG_PREFIX} step prepared`, {
		index: 2,
		stepName: stepName2,
		actionKey: stepActionKey2 || 'unknown',
		hasHandler: Boolean(stepActionHandler2),
		model: stepConfig2?.model || 'none',
		inputSummary: summarizeValue(stepInput2),
	});
  const stepResult2 = stepActionHandler2
  	? await stepActionHandler2({
  			input: stepInput2,
  			config: stepConfig2,
  			step: stepMeta2,
  			context: context,
  			flowMeta,
		}, stepModel2)
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey2 || 'unknown') };
  results[stepName2] = stepResult2;
	logger.info(`${FLOW_LOG_PREFIX} step completed`, {
		index: 2,
		stepName: stepName2,
		resultSummary: summarizeValue(stepResult2),
	});
  context = {
  	...context,
  	...(typeof stepResult2 === 'object' && stepResult2 !== null ? stepResult2 : { value: stepResult2 })
  };


  const stepMeta3 = steps[2] || {};
  const stepName3 = toStepKey(stepMeta3?.name || stepMeta3?.id || 'step3');
  const stepInput3 = { ...context, ...(stepMeta3?.inputs || {}), ...getStepInputMap(stepMeta3) };
	const stepConfig3: Record<string, any> = stepMeta3?.config || {};
  const stepModel3 = resolveModelFromConfig(stepConfig3);
  const stepActionKey3 = resolveTemplateKey(stepMeta3?.actionId);
  const stepActionHandler3 = actionHandlers[stepActionKey3];
	logger.info(`${FLOW_LOG_PREFIX} step prepared`, {
		index: 3,
		stepName: stepName3,
		actionKey: stepActionKey3 || 'unknown',
		hasHandler: Boolean(stepActionHandler3),
		model: stepConfig3?.model || 'none',
		inputSummary: summarizeValue(stepInput3),
	});
  const stepResult3 = stepActionHandler3
  	? await stepActionHandler3({
  			input: stepInput3,
  			config: stepConfig3,
  			step: stepMeta3,
  			context: context,
  			flowMeta,
		}, stepModel3)
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey3 || 'unknown') };
  results[stepName3] = stepResult3;
	logger.info(`${FLOW_LOG_PREFIX} step completed`, {
		index: 3,
		stepName: stepName3,
		resultSummary: summarizeValue(stepResult3),
	});
  context = {
  	...context,
  	...(typeof stepResult3 === 'object' && stepResult3 !== null ? stepResult3 : { value: stepResult3 })
  };


  const stepMeta4 = steps[3] || {};
  const stepName4 = toStepKey(stepMeta4?.name || stepMeta4?.id || 'step4');
  const stepInput4 = { ...context, ...(stepMeta4?.inputs || {}), ...getStepInputMap(stepMeta4) };
	const stepConfig4: Record<string, any> = stepMeta4?.config || {};
  const stepModel4 = resolveModelFromConfig(stepConfig4);
  const stepActionKey4 = resolveTemplateKey(stepMeta4?.actionId);
  const stepActionHandler4 = actionHandlers[stepActionKey4];
	logger.info(`${FLOW_LOG_PREFIX} step prepared`, {
		index: 4,
		stepName: stepName4,
		actionKey: stepActionKey4 || 'unknown',
		hasHandler: Boolean(stepActionHandler4),
		model: stepConfig4?.model || 'none',
		inputSummary: summarizeValue(stepInput4),
	});
  const stepResult4 = stepActionHandler4
  	? await stepActionHandler4({
  			input: stepInput4,
  			config: stepConfig4,
  			step: stepMeta4,
  			context: context,
  			flowMeta,
		}, stepModel4)
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey4 || 'unknown') };
  results[stepName4] = stepResult4;
	logger.info(`${FLOW_LOG_PREFIX} step completed`, {
		index: 4,
		stepName: stepName4,
		resultSummary: summarizeValue(stepResult4),
	});
  context = {
  	...context,
  	...(typeof stepResult4 === 'object' && stepResult4 !== null ? stepResult4 : { value: stepResult4 })
  };

	logger.info(`${FLOW_LOG_PREFIX} finished`, {
		flowId: flowMeta.flowId,
		resultSteps: Object.keys(results),
		contextSummary: summarizeValue(context),
	});

	return { context, results };
};

export const newAccountFlowMeta = {
	flowId: newAccountData?.flowId || '',
	flowName: newAccountData?.flowName || '',
	triggerKey: newAccountData?.triggerKey || '',
	actionKeys: ["mongoose.findMany","mongoose.create"],
	missingTemplates: [],
};

export const newAccountContextHandler = (payload?: any) => {
	const userPayload = normalizeAuthPayload(payload);
	logger.info(`${FLOW_LOG_PREFIX} context handler invoked`, {
		payloadSummary: summarizeValue(payload),
		normalizedUserKeys: Object.keys(userPayload),
	});
	if (isPlainObject(payload)) {
		return newAccountFlow({ ...payload, ...userPayload, flowMeta: newAccountFlowMeta });
	}
	return newAccountFlow({ ...userPayload, value: payload, flowMeta: newAccountFlowMeta });
};
