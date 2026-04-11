import { debugNamespace, debugModule } from '@constellation4sitecore-content-sdk/content';

/**
 * Default Sitecore JSS 'debug' module debuggers. Uses namespace prefix 'sitecore-jss:'.
 * See {@link https://www.npmjs.com/package/debug} for details.
 */
export default {
  common: debugModule(`${debugNamespace}:common`),
  labels: debugModule(`${debugNamespace}:labels`),
  navigation: debugModule(`${debugNamespace}:navigation`),
  data: debugModule(`${debugNamespace}:data`),
  analytics: debugModule(`${debugNamespace}:analytics`),
  security: debugModule(`${debugNamespace}:security`),
  http: debugModule(`${debugNamespace}:http`),
};
