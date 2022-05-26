import { runApp, IAppConfig } from 'ice';
import VConsole from 'vconsole';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'hash',
  },
};

new VConsole();

runApp(appConfig);
