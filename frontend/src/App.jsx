import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import * as sessionActions from './store/session';
// import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Splash from "./screens/Splash/components/Splash";
import Spot from "./screens/Spot/components/Spot/Spot";
import SpotForm from "./screens/CreateSpot/components/main/SpotForm";
import ManageSpots from "./screens/ManageSpots/Components/ManageSpots";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);
  return (
    <>
      <Header isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/spots/:id',
        element: <Spot />
      },
      {
        path: '/spots/new',
        element: <SpotForm />
      },
      {
        path: '/spots/manage',
        element: <ManageSpots />
      }

    ]

  },

]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
