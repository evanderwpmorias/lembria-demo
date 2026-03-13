// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { personsSchema } from '@/data/schema';
import { personsZod } from '@/data/validation';
import { personsHelper } from '@/models';
import { personsFormSchema } from '@/data/forms';
import { personsListConfig } from '@/data/lists';

export const personsRouteSchema = {
    path: '/persons',
    name: 'personsListView',
    schema: personsSchema,
    validation: personsZod,
    helper: personsHelper,
    formSchema: personsFormSchema,
    listSchema: personsListConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      personsid: {
    path: '/persons/:id',
    name: 'personsDetailView',
    schema: personsSchema,
    validation: personsZod,
    helper: personsHelper,
    formSchema: personsFormSchema,
    listSchema: personsConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      personsnew: {
    path: '/persons/new',
    name: 'personsCreateForm',
    schema: personsSchema,
    validation: personsZod,
    helper: personsHelper,
    formSchema: personsFormSchema,
    listSchema: personsConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default personsRouteSchema;
