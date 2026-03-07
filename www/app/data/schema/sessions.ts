

export const sessions = {
  _id: "699df30933503bfe0657bfcb",
  projectId: "699de4a933503bfe0657bf66",
  name: "sessions",
  description: "",
  apiEndpoint: "",
  useState: false,
  timeStamps: false,
  displayName: "",
  createdAt: "2026-02-24T18:50:49.146Z",
  updatedAt: "2026-02-24T19:23:00.921Z",
  __v: 0,
  properties: [
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
  get _dependencies() {
    return [];
  },
  _dependencyFetchMap: {}
};



export default sessions;