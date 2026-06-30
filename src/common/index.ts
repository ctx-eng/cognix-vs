export function createLogger(name: string) {
  return { log: (message: string) => console.log(`[${name}] ${message}`) };
}
