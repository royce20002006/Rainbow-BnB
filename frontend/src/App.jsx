import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import * as sessionActions from './store/session';
// import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";

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
        element: <h1>Welcome</h1>
      }

    ]

  },

]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
