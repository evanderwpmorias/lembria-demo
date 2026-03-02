import { flowActionHandlers } from './actions';
import { newAccountData } from './data/newAccount';

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
  const stepActionHandler1 = flowActionHandlers[stepActionKey1];
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
  const stepActionHandler2 = flowActionHandlers[stepActionKey2];
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

	return { context, results };
};

export const newAccountFlowMeta = {
	flowId: newAccountData?.flowId || '',
	flowName: newAccountData?.flowName || '',
	triggerKey: newAccountData?.triggerKey || '',
	actionKeys: ["mongoose.findMany","mongoose.create"],
	missingTemplates: [],
};
