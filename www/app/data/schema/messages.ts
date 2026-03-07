

export const messages = {
  _id: "699df30f33503bfe0657bfcd",
  projectId: "699de4a933503bfe0657bf66",
  name: "messages",
  description: "",
  apiEndpoint: "",
  useState: false,
  timeStamps: false,
  displayName: "text",
  createdAt: "2026-02-24T18:50:55.994Z",
  updatedAt: "2026-02-24T19:20:05.157Z",
  __v: 0,
  properties: [
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
  get _dependencies() {
    return [];
  },
  _dependencyFetchMap: {}
};



export default messages;