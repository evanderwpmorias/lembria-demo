// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { storiesSchema } from '@/data/schema';
import { storiesZod } from '@/data/validation';
import { storiesHelper } from '@/models';
import { storiesFormSchema } from '@/data/forms';
import { storiesConfig } from '@/data/lists';

export const storiesRouteSchema = {
    path: '/stories',
    name: 'storiesListView',
    schema: storiesSchema,
    validation: storiesZod,
    helper: storiesHelper,
    formSchema: storiesFormSchema,
    listSchema: storiesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      storiesid: {
    path: '/stories/:id',
    name: 'storiesDetailView',
    schema: storiesSchema,
    validation: storiesZod,
    helper: storiesHelper,
    formSchema: storiesFormSchema,
    listSchema: storiesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      storiesnew: {
    path: '/stories/new',
    name: 'storiesCreateForm',
    schema: storiesSchema,
    validation: storiesZod,
    helper: storiesHelper,
    formSchema: storiesFormSchema,
    listSchema: storiesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default storiesRouteSchema;
