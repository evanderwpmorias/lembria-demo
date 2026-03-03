export const newAccountData = {
	flowId: "69a1bf2d8133d208f30c9122",
	flowName: "New account",
	triggerKey: "auth.beforeCreate",
	triggerId: {
  "_id": "6996a3b882122847111a35f2",
  "moduleId": "69959081a136124cbe7ccb90",
  "key": "auth.beforeCreate",
  "name": "Before User Create",
  "description": "Triggered before a new Firebase Auth user account is created. Can block signup or modify custom claims.",
  "isRealtime": false,
  "retryable": false,
  "rateLimit": "",
  "visibility": "private",
  "domain": "functions",
  "__v": 0
},
	steps: [
  {
    "type": "action",
    "name": "action step",
    "actionId": {
      "_id": "699b509cfefabde46fa015ef",
      "moduleId": "6995f3d3a136124cbe7ccc10",
      "key": "mongoose.findMany",
      "name": "Find Many Documents",
      "description": "Finds multiple documents matching a filter.",
      "inputSchema": [
        {
          "name": "inputData",
          "type": "object",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        }
      ],
      "outputSchema": [
        {
          "name": "documents",
          "type": "object",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        },
        {
          "name": "count",
          "type": "number",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        }
      ],
      "supportsAsync": false,
      "supportsRollback": false,
      "config": [
        {
          "name": "model",
          "type": "string",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        },
        {
          "name": "filter",
          "type": "string",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        },
        {
          "name": "limit",
          "type": "number",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        },
        {
          "name": "skip",
          "type": "string",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        },
        {
          "name": "scope",
          "type": "string",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        }
      ],
      "__v": 0
    },
    "inputs": {
      "inputData": ""
    },
    "outputs": {
      "document": ""
    },
    "onError": "retry",
    "id": "step-1772300514104-rz379",
    "config": {
      "model": "users",
      "filter": "uid eq ${input.uid} or email eq ${input.email}",
      "Expand": "",
      "scope": ""
    }
  },
  {
    "type": "action",
    "name": "action step",
    "actionId": {
      "_id": "699b531efefabde46fa015f9",
      "moduleId": "6995f3d3a136124cbe7ccc10",
      "key": "mongoose.create",
      "name": "Create Document",
      "description": "Creates a new document in the specified model.",
      "inputSchema": [
        {
          "name": "data",
          "type": "string",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        }
      ],
      "outputSchema": [
        {
          "name": "document",
          "type": "object",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        }
      ],
      "supportsAsync": false,
      "supportsRollback": false,
      "config": [
        {
          "name": "model",
          "type": "string",
          "minLength": 0,
          "maxLength": 0,
          "min": 0,
          "max": 0,
          "enum": "",
          "required": false,
          "default": "",
          "validationPattern": "",
          "isArray": false,
          "description": "",
          "source": "",
          "isUnique": true
        }
      ],
      "__v": 0
    },
    "inputs": {
      "data": ""
    },
    "outputs": {
      "document": ""
    },
    "onError": "retry",
    "id": "step-1772341050723-3nn2j",
    "config": {
      "model": "users"
    }
  },
  {
    "type": "condition",
    "name": "condition step",
    "onError": "stop",
    "id": "step-1772535872125-y4edo"
  },
  {
    "type": "script",
    "name": "script step",
    "script": "throw new HttpsError('invalid-argument', \"Unauthorized email\");",
    "onError": "stop",
    "id": "step-1772535982638-moyvy",
    "imports": [
      {
        "type": "snippet",
        "snippet": "import { HttpsError } from \"firebase-functions/v2/identity\";",
        "variableName": "HttpsError",
        "resource": "firebase-functions/v2/identity",
        "editable": false
      }
    ]
  }
],
};
