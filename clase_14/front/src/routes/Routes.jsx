import { createBrowserRouter } from 'react-router'
import Layout from '../components/Layout.jsx'
import { lazy, Suspense } from 'react'

const Personajes = lazy( () => import('../pages/Personajes.jsx') )
const Chat = lazy( () => import('../pages/Chat.jsx') )
const Fetch = lazy( () => import('../pages/Fetch.jsx') )
const Detalle = lazy( () => import('../pages/Detalle.jsx') )
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={ <p>Cargando..</p> }><Personajes /></Suspense>,
            },
            {
                path: "/chat",
                element: <Suspense fallback={ <p>Cargando..</p> }><Chat /></Suspense>
            },
            {
                path: "/dogs",
                element: <Suspense fallback={ <p>Cargando..</p> }><Fetch /></Suspense>
            },
            {
                path: "/detalle/:id",
                element: <Suspense fallback={ <p>Cargando..</p> }><Detalle /></Suspense>
            }
        ]
    }
])
