// Auto-generated route schema file
// This file aggregates all dependencies for the route and its children

import { messagesSchema } from '@/data/schema';
import { messagesZod } from '@/data/validation';
import { messagesHelper } from '@/models';
import { messagesFormSchema } from '@/data/forms';
import { messagesConfig } from '@/data/lists';

export const messagesRouteSchema = {
    path: '/messages',
    name: 'messagesListView',
    schema: messagesSchema,
    validation: messagesZod,
    helper: messagesHelper,
    formSchema: messagesFormSchema,
    listSchema: messagesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
    children: {
      messagesid: {
    path: '/messages/:id',
    name: 'messagesDetailView',
    schema: messagesSchema,
    validation: messagesZod,
    helper: messagesHelper,
    formSchema: messagesFormSchema,
    listSchema: messagesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
      messagesnew: {
    path: '/messages/new',
    name: 'messagesCreateForm',
    schema: messagesSchema,
    validation: messagesZod,
    helper: messagesHelper,
    formSchema: messagesFormSchema,
    listSchema: messagesConfig,
    meta: {
      isVisible: true,
      allowedRoleIds: ['69a077ce413340c596c6c799', '69a07962413340c596c6c7a1', '69a079fc413340c596c6c7a9'],
    },
    props: true,
  },
    },
  };

export default messagesRouteSchema;
