const isDev = import.meta.env.DEV;

const logger = {
  log: (...args) => isDev && console.log("[APP]:", ...args),
  error: (...args) => console.error("[ERROR]:", ...args),
  warn: (...args) => isDev && console.warn("[WARN]:", ...args),
  info: (...args) => isDev && console.info("[INFO]:", ...args),
};

export default logger;
