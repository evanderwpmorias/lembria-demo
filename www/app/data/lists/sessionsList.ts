export const sessionsList ={
    "_id": "69b1b5a070b9ee08b91cb978",
    "name": "sessionsList",
    "description": "",
    "filterSchema": [
        {
            "field": {
                "name": "_id",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "field": {
                "name": "status",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "field": {
                "name": "createdByUid",
                "type": "reference",
                "required": true,
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "field": {
                "name": "mode",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        },
        {
            "field": {
                "name": "memoryContext",
                "type": "string",
                "isArray": true,
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:08.775Z",
            "updatedAt": "2026-03-11T18:34:08.775Z"
        }
    ],
    "updateListOnChange": false,
    "listLayout": "default",
    "filterLayout": "default",
    "tableFields": [
        {
            "name": "_id",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "status",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "createdByUid",
            "type": "reference",
            "required": true,
            "isUnique": false
        },
        {
            "name": "mode",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "memoryContext",
            "type": "string",
            "isArray": true,
            "isUnique": false
        }
    ],
    "listMainField": "name",
    "listMainValue": "_id",
    "entity": "699df30933503bfe0657bfcb",
    "type": "list",
    "projectId": "699de4a933503bfe0657bf66",
    "loadingStrategy": "default",
    "createdAt": "2026-03-11T18:34:08.776Z",
    "updatedAt": "2026-03-11T18:34:08.776Z",
    "__v": 0
}