import {persons} from './persons';
import {users} from './users';

export const memories = {
  _id: "699df2de33503bfe0657bfc1",
  projectId: "699de4a933503bfe0657bf66",
  name: "memories",
  description: "",
  apiEndpoint: "",
  useState: false,
  timeStamps: true,
  displayName: "",
  createdAt: "2026-02-24T18:50:06.472Z",
  updatedAt: "2026-02-24T19:24:15.337Z",
  __v: 0,
  properties: [
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
  get _dependencies() {
    return [persons, users];
  },
  _dependencyFetchMap: {
    "personIds": [
        {
            "entity": "persons",
            "fetchMap": "persons.id"
        }
    ],
    "createdByUid": [
        {
            "entity": "users",
            "fetchMap": "users.id"
        }
    ]
}
};



export default memories;