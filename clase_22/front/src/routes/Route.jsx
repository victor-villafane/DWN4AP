import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const Detalle = lazy(() => import("../pages/Detalle"))
const Logout = lazy(() => import("../pages/Logout"))
const Registro = lazy(() => import("../pages/Registro"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<div>Cargando...</div>} >
                    <ProtectedRoute element={<Home />} />
                </Suspense>
            },
            {
                path: "/login",
                element: <Suspense fallback={<div>Cargando...</div>} ><Login /></Suspense>
            },
            {
                path: "/registro",
                element: <Suspense fallback={<div>Cargando...</div>} ><Registro /></Suspense>
            },
            {
                path: "/logout",
                element: <Suspense fallback={<div>Cargando...</div>} ><Logout /></Suspense>
            },
            {
                path: "/detalle/:id",
                element: <Suspense fallback={<div>Cargando...</div>} >
                    <ProtectedRoute element={<Detalle />} />
                </Suspense>
            }
        ]
    }
]);

export default router