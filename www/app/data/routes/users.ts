// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { usersSchema } from '@/data/schema';
import { usersZod } from '@/data/validation';
import { usersHelper } from '@/models';
import { usersFormSchema } from '@/data/forms';
import { usersListConfig } from '@/data/lists';

export const usersRouteSchema = {
    path: '/users',
    name: 'usersListView',
    schema: usersSchema,
    validation: usersZod,
    helper: usersHelper,
    formSchema: usersFormSchema,
    listSchema: usersListConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      usersid: {
    path: '/users/:id',
    name: 'usersDetailView',
    schema: usersSchema,
    validation: usersZod,
    helper: usersHelper,
    formSchema: usersFormSchema,
    listSchema: usersConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      usersnew: {
    path: '/users/new',
    name: 'usersCreateForm',
    schema: usersSchema,
    validation: usersZod,
    helper: usersHelper,
    formSchema: usersFormSchema,
    listSchema: usersConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default usersRouteSchema;
