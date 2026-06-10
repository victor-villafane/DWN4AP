import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import NuevoPersonaje from "../pages/crud/NuevoPersonaje";
import ModificarPersonaje from "../pages/crud/ModificarPersonaje";
const Home = lazy(() => import("../pages/crud/Home"))
const Login = lazy(() => import("../pages/auth/Login"))
const Detalle = lazy(() => import("../pages/crud/Detalle"))
const Logout = lazy(() => import("../pages/auth/Logout"))
const Registro = lazy(() => import("../pages/auth/Registro"))

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
            },
            {
                path: "/nuevo-personaje",
                element: <NuevoPersonaje />
            },
            {
                path: "/modificar/:id",
                element: <ModificarPersonaje />
            }            
        ]
    }
]);

export default router