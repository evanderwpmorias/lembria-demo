import { mongooseFindManyAction } from './actions/mongooseFindMany';
import { mongooseCreateAction } from './actions/mongooseCreate';
import { newAccountData } from './data/newAccount';
import { HttpsError } from 'firebase-functions/v2/identity';
import { mongoose } from 'mongoose';

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

const actionHandlers: Record<string, (params?: any) => Promise<any>> = {
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


  const stepMeta1 = steps[0] || {};
  const stepName1 = toStepKey(stepMeta1?.name || stepMeta1?.id || 'step1');
  const stepInput1 = { ...context, ...(stepMeta1?.inputs || {}), ...(stepMeta1?.inputMap || {}) };
  const stepConfig1 = stepMeta1?.config || {};
  const stepActionKey1 = resolveTemplateKey(stepMeta1?.actionId);
  const stepActionHandler1 = actionHandlers[stepActionKey1];
  const stepResult1 = stepActionHandler1
  	? await stepActionHandler1({
  			input: stepInput1,
  			config: stepConfig1,
  			step: stepMeta1,
  			context: context,
  			flowMeta,
  		})
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey1 || 'unknown') };
  results[stepName1] = stepResult1;
  context = {
  	...context,
  	...(typeof stepResult1 === 'object' && stepResult1 !== null ? stepResult1 : { value: stepResult1 })
  };


  const stepMeta2 = steps[1] || {};
  const stepName2 = toStepKey(stepMeta2?.name || stepMeta2?.id || 'step2');
  const stepInput2 = { ...context, ...(stepMeta2?.inputs || {}), ...(stepMeta2?.inputMap || {}) };
  const stepConfig2 = stepMeta2?.config || {};
  const stepActionKey2 = resolveTemplateKey(stepMeta2?.actionId);
  const stepActionHandler2 = actionHandlers[stepActionKey2];
  const stepResult2 = stepActionHandler2
  	? await stepActionHandler2({
  			input: stepInput2,
  			config: stepConfig2,
  			step: stepMeta2,
  			context: context,
  			flowMeta,
  		})
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey2 || 'unknown') };
  results[stepName2] = stepResult2;
  context = {
  	...context,
  	...(typeof stepResult2 === 'object' && stepResult2 !== null ? stepResult2 : { value: stepResult2 })
  };


  const stepMeta3 = steps[2] || {};
  const stepName3 = toStepKey(stepMeta3?.name || stepMeta3?.id || 'step3');
  const stepInput3 = { ...context, ...(stepMeta3?.inputs || {}), ...(stepMeta3?.inputMap || {}) };
  const stepConfig3 = stepMeta3?.config || {};
  const stepActionKey3 = resolveTemplateKey(stepMeta3?.actionId);
  const stepActionHandler3 = actionHandlers[stepActionKey3];
  const stepResult3 = stepActionHandler3
  	? await stepActionHandler3({
  			input: stepInput3,
  			config: stepConfig3,
  			step: stepMeta3,
  			context: context,
  			flowMeta,
  		})
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey3 || 'unknown') };
  results[stepName3] = stepResult3;
  context = {
  	...context,
  	...(typeof stepResult3 === 'object' && stepResult3 !== null ? stepResult3 : { value: stepResult3 })
  };


  const stepMeta4 = steps[3] || {};
  const stepName4 = toStepKey(stepMeta4?.name || stepMeta4?.id || 'step4');
  const stepInput4 = { ...context, ...(stepMeta4?.inputs || {}), ...(stepMeta4?.inputMap || {}) };
  const stepConfig4 = stepMeta4?.config || {};
  const stepActionKey4 = resolveTemplateKey(stepMeta4?.actionId);
  const stepActionHandler4 = actionHandlers[stepActionKey4];
  const stepResult4 = stepActionHandler4
  	? await stepActionHandler4({
  			input: stepInput4,
  			config: stepConfig4,
  			step: stepMeta4,
  			context: context,
  			flowMeta,
  		})
  	: { skipped: true, reason: 'No action handler for ' + (stepActionKey4 || 'unknown') };
  results[stepName4] = stepResult4;
  context = {
  	...context,
  	...(typeof stepResult4 === 'object' && stepResult4 !== null ? stepResult4 : { value: stepResult4 })
  };

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
	if (payload && typeof payload === 'object') {
		return newAccountFlow({ ...payload, flowMeta: newAccountFlowMeta });
	}
	return newAccountFlow({ value: payload, flowMeta: newAccountFlowMeta });
};
