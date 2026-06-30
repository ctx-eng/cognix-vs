let currentLogger: { debug: (msg: string, ...args: unknown[]) => void; error: (msg: string, ...args: unknown[]) => void } = {
  debug: (msg, ...args) => console.debug(msg, ...args),
  error: (msg, ...args) => console.error(msg, ...args),
};

export function setLogger(logger: {
  debug: (msg: string, ...args: unknown[]) => void;
  error: (msg: string, ...args: unknown[]) => void;
}): void {
  currentLogger = logger;
}

export function logDebug(msg: string, ...args: unknown[]): void {
  currentLogger.debug(msg, ...args);
}

export function logError(msg: string, ...args: unknown[]): void {
  currentLogger.error(msg, ...args);
}
