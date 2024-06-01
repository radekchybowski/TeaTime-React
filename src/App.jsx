import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home';
import Categories from './pages/Categories';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={ <Home /> }/>
      <Route path='categories' element={ <Categories /> } />
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
