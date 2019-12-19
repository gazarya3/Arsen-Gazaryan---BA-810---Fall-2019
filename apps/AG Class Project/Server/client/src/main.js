// // regenerator-runtime is to support async/await syntax in ESNext.
// // If you don't use async/await, you can remove regenerator-runtime.
// import 'regenerator-runtime/runtime';
// // import * as environment from '../config/environment.json';
// // import {PLATFORM} from 'aurelia-pal';
// import config from './auth-config';
// import environment from './environment';

// export function configure(aurelia) {
//   aurelia.use
//     .standardConfiguration()
//     .plugin('aurelia-auth', (baseConfig) => {
//       baseConfig.configure(config);
//     })
//     .feature('resources');
//   //   .feature(PLATFORM.moduleName('resources/index'));

//   aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

//   if (environment.testing) {
//     aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
//   }

//   aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
// }

// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
