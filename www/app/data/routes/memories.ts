// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { memoriesSchema } from '@/data/schema';
import { memoriesZod } from '@/data/validation';
import { memoriesHelper } from '@/models';
import { memoriesFormSchema } from '@/data/forms';
import { memoriesConfig } from '@/data/lists';

export const memoriesRouteSchema = {
    path: '/memories',
    name: 'memoriesListView',
    schema: memoriesSchema,
    validation: memoriesZod,
    helper: memoriesHelper,
    formSchema: memoriesFormSchema,
    listSchema: memoriesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      memoriesid: {
    path: '/memories/:id',
    name: 'memoriesDetailView',
    schema: memoriesSchema,
    validation: memoriesZod,
    helper: memoriesHelper,
    formSchema: memoriesFormSchema,
    listSchema: memoriesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      memoriesnew: {
    path: '/memories/new',
    name: 'memoriesCreateForm',
    schema: memoriesSchema,
    validation: memoriesZod,
    helper: memoriesHelper,
    formSchema: memoriesFormSchema,
    listSchema: memoriesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default memoriesRouteSchema;
