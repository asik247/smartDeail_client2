import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import AuthLayout from "../Layout/AuthLayout";
import Registation from "../Pages/Registation";
import LogIn from "../Pages/LogIn";
import DetailsPages from "../Pages/DetailsPages";
import PrivateRoute from "./PrivateRoute";
import CreateAProduct from "../Pages/CreateAProduct/CreateAProduct";

const router = createBrowserRouter([
    {
        path: '/', Component: Root, children: [
            { index: true, Component: Home },
            { path: '/allProducts', Component: AllProducts },
            { path: '/myProducts', Component: MyProducts },
            { path: '/myBids', element: <PrivateRoute><MyBids></MyBids></PrivateRoute> },
            {
                path: 'details2/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products2/${params.id}`),
                element: <PrivateRoute><DetailsPages></DetailsPages></PrivateRoute>
            },
            {
                path: 'createAProduct',
                element: <PrivateRoute><CreateAProduct></CreateAProduct></PrivateRoute>
            },
        ]
    },

    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            { index: true, Component: LogIn },
            { path: 'registation', Component: Registation }
        ]

    }

])
export default router;