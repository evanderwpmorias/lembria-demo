import { toCamelCase } from "./stringHelpers";

export const getSchemaDependencies = (
  jsonEntity: any,
  entities: any[],
  visited: Set<string> = new Set()
) => {
  const depedencyList: any[] = [];

  for (const prop of jsonEntity.properties) {
    if (prop.type === "reference" && prop.source) {
      let dependency: any = {
        property: prop.name,
        isArray: prop.isArray,
        hasId: false,
        _dependencies: [],
        _dependencyFetchMap: {}
      };
      if (entities.length > 0) {
        const { entity, hasId } = getEntityByName(entities, prop.source);
        dependency = {
          ...entity,
          hasId,
          // Allow self-referencing entities to appear once, but prevent deeper recursion
          _dependencies: visited.has(jsonEntity.name) && prop.source === jsonEntity.name 
            ? [] 
            : getSchemaDependencies(entity, entities, new Set([...visited, jsonEntity.name])),
          _dependencyFetchMap: getDependencyFetchMap(entity, entities)
        };
      }
      depedencyList.push(dependency);
    }
  }

  return depedencyList;
};

export const getDependencyFetchMap = (
  jsonEntity: any,
  entities: any[]
) => {
  const fetchMapResult: Record<string, any[]> = {};

  for (const prop of jsonEntity.properties) {
    if (prop.type === "reference" && prop.source) {
      const dependencyName = toCamelCase(prop.source);
      if (!fetchMapResult[prop.name]) {
        fetchMapResult[prop.name] = [];
      }
      // Prevent duplicate entries for the same dependencyName
      if (fetchMapResult[prop.name].some((entry) => entry.entity === dependencyName)) continue;
      
      const { entity, hasId } = getEntityByName(entities, prop.source);
      if (hasId) {
        const mapValue = dependencyName + ".id" + (prop.isArray ? "[]" : "");
        fetchMapResult[prop.name].push({
          entity: dependencyName,
          fetchMap: mapValue,
        });
      } else {
        const parentMappings: { entity: string; fetchMap: string }[] = [];
        for (const ent of entities) {
          const matchingProp = ent.properties.find(
            (p:any) => p.type === "reference" && p.source === prop.source
          );
          if (
            ent.properties &&
            matchingProp
          ) {
            
            const parentEntityName = toCamelCase(ent.name);
            const fetchValue = parentEntityName + ".id."+ matchingProp.name + (prop.isArray ? "[]" : "");
            parentMappings.push({
              entity: parentEntityName,
              fetchMap: fetchValue,
            });
          }
        }
        fetchMapResult[prop.name].push({
          entity: dependencyName,
          fetchMap: parentMappings.map((pm) => pm.fetchMap),
          parentEntities: parentMappings.map((pm) => pm.entity)
        });
      }
    }
  }

  return fetchMapResult;
};

export const getEntityByName = (entities: any, name: string) => {
  const entity = entities.find((entity) => entity.name === name);
  let hasId = false;
  if (entity) {
    hasId = entity.properties.find((prop: any) => prop.name === "_id")
      ? true
      : false;
  }

  return { entity, hasId };
};
