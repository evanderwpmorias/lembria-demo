// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { sessionsSchema } from '@/data/schema';
import { sessionsZod } from '@/data/validation';
import { sessionsHelper } from '@/models';
import { sessionsFormSchema } from '@/data/forms';
import { sessionsListConfig } from '@/data/lists';

export const sessionsRouteSchema = {
    path: '/sessions',
    name: 'sessionsListView',
    schema: sessionsSchema,
    validation: sessionsZod,
    helper: sessionsHelper,
    formSchema: sessionsFormSchema,
    listSchema: sessionsListConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      sessionsid: {
    path: '/sessions/:id',
    name: 'sessionsDetailView',
    schema: sessionsSchema,
    validation: sessionsZod,
    helper: sessionsHelper,
    formSchema: sessionsFormSchema,
    listSchema: sessionsConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      sessionsnew: {
    path: '/sessions/new',
    name: 'sessionsCreateForm',
    schema: sessionsSchema,
    validation: sessionsZod,
    helper: sessionsHelper,
    formSchema: sessionsFormSchema,
    listSchema: sessionsConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default sessionsRouteSchema;
