export function cleanFlavorText(value: string): string {
  return value.replace(/\n/g, ' ').replace(/\f/g, ' ').replace(/\s+/g, ' ');
}