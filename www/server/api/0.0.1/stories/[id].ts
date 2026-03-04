
    import {stories as storiesModel, handleGetById, handleDelete, handlePut, handlePatch, handleError } from '@/mongoSchema'
    import { corsHandler } from '@/helpers/0.0.1/cors'
   // import { authorizeRequest } from '@/helpers/0.0.1/auth-middleware'

        export default defineEventHandler(async (event) => {
            if(corsHandler(event)) return;
            try {
          // await authorizeRequest(event);
        } catch (authError: any) {
          console.error('Authorization error:', authError);
          return handleError(event, authError.statusCode || 403, authError.message || "Authorization failed", authError);
        }
        switch (event.node.req.method) {
            case 'GET':
                return await handleGetById(storiesModel, event)
            case 'DELETE':
                return await handleDelete(storiesModel, event)
            case 'PUT':
                return await handlePut(storiesModel, event)
            case 'PATCH':
                return await handlePatch(storiesModel, event)
            default:
                return handleError(event, 405, 'Method not allowed', { method: event.node.req.method });
        }
    })