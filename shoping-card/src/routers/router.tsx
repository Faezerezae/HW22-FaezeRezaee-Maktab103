import {
    createBrowserRouter,
    RouterProvider,
  }
   from "react-router-dom";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";

  
  export const routes = createBrowserRouter([
    {
      path: "",
      element: <Products />,
   
      errorElement: (<NotFound/>)
    }
  ])
  
  export const AppRoute = () => {
    return <RouterProvider router={routes} />
  }