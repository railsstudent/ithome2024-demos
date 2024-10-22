export const findMax = (map: Map<string, number>) => {
  let curr: [string, number] | undefined = undefined;
  for (const entry of map) {
    if (!curr || curr[1] < entry[1]) {
      curr = entry;
    }
  }
  return curr;
}