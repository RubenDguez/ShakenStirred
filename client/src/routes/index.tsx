import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import LandingPage from '../pages/Landing';
import App from '../App';
import Drink from '../pages/Drink';
import Main from '../pages/App/Main';
import NewDrink from '../pages/App/NewDrink';
import MyDrinks from '../pages/App/MyDrinks';
import SearchDrinks from '../pages/App/SearchDrinks';
import User from '../pages/App/User';

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
        path: '/app/new',
        element: <NewDrink />,
      },
      {
        path: '/app/my-drinks',
        element: <MyDrinks />,
      },
      {
        path: '/app/search',
        element: <SearchDrinks />,
      },
      {
        path: '/app/inspiration',
        element: <SearchDrinks />,
      },
      {
        path: '/app/user',
        element: <User />,
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
