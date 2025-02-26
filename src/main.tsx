import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Subject from './pages/Subject.tsx';
import Module from './pages/Module.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VideoList from './pages/VideoList.tsx';
import VideoPlay from './pages/VideoPlay.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'/',
        element:<Subject />
      },
      {
        path:'/module/:id',
        element:<Module />
      },
      
      {
        path:'/videolist/:id',
        element:<VideoList />
      },
      
      {
        path:'/videoplay/:id',
        element:<VideoPlay />
      },
      
      
      
     
     
    ]
  },
 
]);
createRoot(document.getElementById('root')!).render(
 
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
