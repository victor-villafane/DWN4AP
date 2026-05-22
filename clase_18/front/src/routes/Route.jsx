import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router";
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const Detalle = lazy(() => import("../pages/Detalle"))
const Logout = lazy(() => import("../pages/Logout"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<div>Cargando...</div>} ><Home /></Suspense>
            },
            {
                path: "/login",
                element: <Suspense fallback={<div>Cargando...</div>} ><Login /></Suspense>
            },
            {
                path: "/logout",
                element: <Suspense fallback={<div>Cargando...</div>} ><Logout /></Suspense>
            },
            {
                path: "/detalle/:id",
                element: <Suspense fallback={<div>Cargando...</div>} ><Detalle /></Suspense>
            }
        ]
    }
]);

export default router