export type RgbType = [number, number, number] | string;

export function validateRGB(rgbValues: RgbType): string {
  if (typeof rgbValues === 'string') {
    return rgbValues;
  } 

  const minRGB = 0;
  const maxRGB = 255;
  const [r, g, b] = rgbValues.map(value => Math.max(minRGB, Math.min(value, maxRGB)));

  return `rgb(${r}, ${g}, ${b})`;
}
