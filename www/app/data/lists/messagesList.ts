export const messagesList ={
    "_id": "69b1b59670b9ee08b91cb970",
    "name": "messagesList",
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
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "field": {
                "name": "role",
                "type": "string",
                "enum": "user, agent",
                "isArray": false,
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "field": {
                "name": "text",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "field": {
                "name": "timestamp",
                "type": "date",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
        },
        {
            "field": {
                "name": "memoryIds",
                "type": "reference",
                "isArray": true,
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:33:58.917Z",
            "updatedAt": "2026-03-11T18:33:58.917Z"
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
            "name": "role",
            "type": "string",
            "enum": "user, agent",
            "isArray": false,
            "isUnique": false
        },
        {
            "name": "text",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "timestamp",
            "type": "date",
            "isUnique": false
        },
        {
            "name": "memoryIds",
            "type": "reference",
            "isArray": true,
            "isUnique": false
        }
    ],
    "listMainField": "name",
    "listMainValue": "_id",
    "entity": "699df30f33503bfe0657bfcd",
    "type": "list",
    "projectId": "699de4a933503bfe0657bf66",
    "loadingStrategy": "default",
    "createdAt": "2026-03-11T18:33:58.917Z",
    "updatedAt": "2026-03-11T18:33:58.917Z",
    "__v": 0
}