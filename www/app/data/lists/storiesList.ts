export const storiesList ={
    "_id": "69b1b5bf70b9ee08b91cb990",
    "name": "storiesList",
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
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "field": {
                "name": "title",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "field": {
                "name": "createdAt",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "field": {
                "name": "createdByUid",
                "type": "reference",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "field": {
                "name": "segments",
                "type": "mixedReference",
                "isArray": true,
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:39.563Z",
            "updatedAt": "2026-03-11T18:34:39.563Z"
        },
        {
            "field": {
                "name": "topics",
                "type": "string",
                "isArray": true,
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:39.564Z",
            "updatedAt": "2026-03-11T18:34:39.564Z"
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
            "name": "title",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "createdAt",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "createdByUid",
            "type": "reference",
            "isUnique": false
        },
        {
            "name": "segments",
            "type": "mixedReference",
            "isArray": true,
            "isUnique": false
        },
        {
            "name": "topics",
            "type": "string",
            "isArray": true,
            "isUnique": false
        }
    ],
    "listMainField": "name",
    "listMainValue": "_id",
    "entity": "699df18333503bfe0657bf8e",
    "type": "list",
    "projectId": "699de4a933503bfe0657bf66",
    "loadingStrategy": "default",
    "createdAt": "2026-03-11T18:34:39.564Z",
    "updatedAt": "2026-03-11T18:34:39.564Z",
    "__v": 0
}