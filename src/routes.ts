import { IRouterConfig, lazy } from 'ice';

const Home = lazy(() => import('@/pages/Home'));
const Detail = lazy(() => import('@/pages/Detail'));
const NotFound = lazy(() => import('@/components/NotFound'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  }, {
    path: '/detail',
    exact: true,
    component: Detail,
  }, {
    component: NotFound,
  }
];

export default routerConfig;
