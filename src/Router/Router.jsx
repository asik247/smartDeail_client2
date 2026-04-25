import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import AuthLayout from "../Layout/AuthLayout";
import Registation from "../Pages/Registation";
import LogIn from "../Pages/LogIn";

const router = createBrowserRouter([
    {
        path: '/', Component: Root, children: [
            { index: true, Component: Home },
            { path: '/allProducts', Component: AllProducts },
            { path: '/myProducts', Component: MyProducts },
            { path: '/myBids', Component: MyBids }
        ]
    },
    {path:'auth',
    Component:AuthLayout,
    children:[
        {index:true,Component:LogIn},
        {path:'registation',Component:Registation}
    ]

    }

])
export default router;