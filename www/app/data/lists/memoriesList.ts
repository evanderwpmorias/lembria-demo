export const memoriesList ={
    "_id": "69b1b5a970b9ee08b91cb980",
    "name": "memoriesList",
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
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "field": {
                "name": "summary",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "field": {
                "name": "title",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "field": {
                "name": "personIds",
                "type": "reference",
                "source": "persons",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "field": {
                "name": "media",
                "type": "mixedReference",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.889Z",
            "updatedAt": "2026-03-11T18:34:17.889Z"
        },
        {
            "field": {
                "name": "createdByUid",
                "type": "reference",
                "source": "users",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.890Z",
            "updatedAt": "2026-03-11T18:34:17.890Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.890Z",
            "updatedAt": "2026-03-11T18:34:17.890Z"
        },
        {
            "field": {
                "name": "capturedAt",
                "type": "date",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.890Z",
            "updatedAt": "2026-03-11T18:34:17.890Z"
        },
        {
            "inputTypes": "input",
            "operator": "eq",
            "logicOperators": "or",
            "createdAt": "2026-03-11T18:34:17.890Z",
            "updatedAt": "2026-03-11T18:34:17.890Z"
        },
        {
            "field": {
                "name": "embeddings",
                "type": "string",
                "isUnique": false
            },
            "inputTypes": "input",
            "operator": "eq",
            "createdAt": "2026-03-11T18:34:17.890Z",
            "updatedAt": "2026-03-11T18:34:17.890Z"
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
            "name": "summary",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "title",
            "type": "string",
            "isUnique": false
        },
        {
            "name": "personIds",
            "type": "reference",
            "source": "persons",
            "isUnique": false
        },
        {
            "name": "media",
            "type": "mixedReference",
            "isUnique": false
        },
        {
            "name": "createdByUid",
            "type": "reference",
            "source": "users",
            "isUnique": false
        },
        {
            "name": "capturedAt",
            "type": "date",
            "isUnique": false
        },
        {
            "name": "embeddings",
            "type": "string",
            "isUnique": false
        }
    ],
    "listMainField": "name",
    "listMainValue": "_id",
    "entity": "699df2de33503bfe0657bfc1",
    "type": "list",
    "projectId": "699de4a933503bfe0657bf66",
    "loadingStrategy": "default",
    "createdAt": "2026-03-11T18:34:17.890Z",
    "updatedAt": "2026-03-11T18:34:17.890Z",
    "__v": 0
}