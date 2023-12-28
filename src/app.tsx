import loadable from '@loadable/component';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';

import Provider from 'provider';

const AuthLayout = loadable(() => import('layouts/AuthLayout'));
const MainLayout = loadable(() => import('layouts/MainLayout'));

const IndexPage = loadable(() => import('pages/index'));
const JoinPage = loadable(() => import('pages/join'));
const N10406Page = loadable(() => import('pages/n10406'));
const N20000511Page = loadable(() => import('pages/N20000511'));

const App = () => (
  <RouterProvider
    router={createBrowserRouter(
      createRoutesFromElements(
        <Route element={<Provider />}>
          <Route element={<MainLayout />} loader={MainLayout.load}>
            <Route path='/' element={<IndexPage />} loader={IndexPage.load} />
            <Route path='/join' element={<JoinPage />} loader={JoinPage.load} />
          </Route>
          ,
          <Route
            element={<AuthLayout />}
            loader={() => {
              if (!document.cookie.includes('access_token')) return redirect('/');
              return AuthLayout.load();
            }}
          >
            <Route path='/home' element={<>홈화면</>} />
            <Route path='/post' element={<>게시글화면</>} />
            <Route path='/N10406' element={<N10406Page />} loader={N10406Page.load} />
            <Route path='/N20000511' element={<N20000511Page />} loader={N20000511Page.load} />
          </Route>
        </Route>,
      ),
    )}
  />
);

export default App;
