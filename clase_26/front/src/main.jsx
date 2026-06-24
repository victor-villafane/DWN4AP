import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './routes/Route';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { SessionProvider } from './context/session.context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
