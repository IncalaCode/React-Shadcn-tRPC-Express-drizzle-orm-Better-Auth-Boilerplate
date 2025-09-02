/**
 * Utility function to resolve CORS origins with environment variable substitution
 */
export const resolveCorsOrigin = (originString: string): string[] => {
  let resolvedOrigin = originString;
  
  // Replace ${FRONTEND_URL} with actual FRONTEND_URL value
  if (process.env.FRONTEND_URL) {
    resolvedOrigin = resolvedOrigin.replace(/\$\{FRONTEND_URL\}/g, process.env.FRONTEND_URL);
  }
  
  // Split by comma, trim whitespace, and normalize URLs (remove trailing slashes)
  return resolvedOrigin
    .split(",")
    .map(origin => origin.trim())
    .map(origin => origin.replace(/\/$/, ''))
    .filter(origin => origin.length > 0);
};
