// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { familiesSchema } from '@/data/schema';
import { familiesZod } from '@/data/validation';
import { familiesHelper } from '@/models';
import { familiesFormSchema } from '@/data/forms';
import { familiesConfig } from '@/data/lists';

export const familiesRouteSchema = {
    path: '/families',
    name: 'familiesListView',
    schema: familiesSchema,
    validation: familiesZod,
    helper: familiesHelper,
    formSchema: familiesFormSchema,
    listSchema: familiesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      familiesid: {
    path: '/families/:id',
    name: 'familiesDetailView',
    schema: familiesSchema,
    validation: familiesZod,
    helper: familiesHelper,
    formSchema: familiesFormSchema,
    listSchema: familiesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      familiesnew: {
    path: '/families/new',
    name: 'familiesCreateForm',
    schema: familiesSchema,
    validation: familiesZod,
    helper: familiesHelper,
    formSchema: familiesFormSchema,
    listSchema: familiesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default familiesRouteSchema;
