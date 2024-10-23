import { Data } from "./signals/types/data.type";

export function updateAndReturnMap(dataMap: Map<string, number>, { name, count }: Data) {
  const newCount = (dataMap.get(name) || 0) + count;

  if (newCount <= 0) {
    dataMap.delete(name);
  } else {
    dataMap.set(name, newCount);
  }
  return dataMap;
}
