import { IRouterConfig, lazy } from 'ice';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import NotFound from '@/components/NotFound';

// const Home = lazy(() => import('@/pages/Home'));
// const Detail = lazy(() => import('@/pages/Detail'));
// const NotFound = lazy(() => import('@/components/NotFound'));

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
