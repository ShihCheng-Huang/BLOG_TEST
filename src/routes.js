import RootApp from './RootApp';
import Home from './components/Home';
import CreatePage from './components/CreatePage';

const routes = [
  { component: RootApp,
    routes: [ 
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/home',
        component: Home
      },
      { path: '/New' ,
        component: CreatePage
      }
    ]
  }
];
export default routes;
