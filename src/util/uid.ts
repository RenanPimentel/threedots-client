export function uid(): string {
  return String(Date.now() + Math.random());
}
