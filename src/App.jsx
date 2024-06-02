import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import NavPane from './components/blocks/NavPane';
import CategoriesPage from './pages/CategoriesPage';
import CollectionsPage from './pages/CollectionsPage';
import SearchPage from './pages/SearchPage';
import TeaPage from './pages/TeaPage';
import AddTeaPage from './pages/AddTeaPage';
import LibraryPage from './pages/LibraryPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={ <HomePage /> }/>
      <Route path='categories' element={ <CategoriesPage /> } />
      <Route path='library' element={ <LibraryPage /> } />
      <Route path='collections' element={ <CollectionsPage /> } />
      <Route path='search' element={ <SearchPage /> } />
      <Route path='tea' element={ <TeaPage /> } />
      <Route path='add-tea' element={ <AddTeaPage /> } />
      <Route path='nav' element={ <NavPane /> } />
      <Route path='*' element={ <NotFound /> } />
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
