import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import LandingPage from '../pages/Landing';
import App from '../App';
import Drink from '../pages/Drink';
import Main from '../pages/App/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      }
    ],
  },
  {
    path: '/app',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: '/app/drink',
        children: [
          {
            index: true,
            element: <Drink />
          },
          {
            path: '/app/drink/:id',
            element: <Drink />
          }
        ]
      }
    ]
  }
]);
