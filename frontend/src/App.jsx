import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import * as sessionActions from './store/session';




// Remove <APIProvider> wrapper entirely in App.jsx



import Header from "./components/Header/Header";
import Splash from "./screens/Splash/components/Splash";
import Spot from "./screens/Spot/components/Spot/Spot";
import SpotForm from "./screens/CreateSpot/components/main/SpotForm";
import ManageSpots from "./screens/ManageSpots/Components/ManageSpots";

import CurrentUserBookings from "./screens/CurrentUserBookings/Components/UserBookings";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/csrf/restore", { credentials: "include" })
      .then(() => dispatch(sessionActions.restoreUser()))
      .then(() => setIsLoaded(true));
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
        path: '/spots/:id/update',
        element: <SpotForm />
      },
      {
        path: '/spots/manage',
        element: <ManageSpots />
      },
      {
        path: '/bookings/manage',
        element: <CurrentUserBookings />
      },
      
      {
        path: '*',
        element: <h1 className="not-found">Sorry this page does not exist!</h1>
      }

    ]

  },

]);


function App() {
  return (
  
   
      <RouterProvider router={router} />
    


  )
}

export default App;
