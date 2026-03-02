

export const stories = {
  _id: "699df18333503bfe0657bf8e",
  projectId: "699de4a933503bfe0657bf66",
  name: "stories",
  description: "",
  apiEndpoint: "/stories",
  useState: false,
  timeStamps: true,
  displayName: "",
  createdAt: "2026-02-24T18:44:19.140Z",
  updatedAt: "2026-02-24T19:24:55.917Z",
  __v: 0,
  properties: [
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
  get _dependencies() {
    return [];
  },
  _dependencyFetchMap: {}
};



export default stories;