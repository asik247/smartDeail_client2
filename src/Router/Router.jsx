import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";

const router = createBrowserRouter([
    {path:'/',Component:Root,children:[
        {index:true,Component:Home},
        {path:'/allProducts',Component:AllProducts},
        {path:'/myProducts',Component:MyProducts},
        {path:'/myBids',Component:MyBids}
    ]}
])
export default router;