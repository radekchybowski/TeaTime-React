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
import LoginPage from './pages/LoginPage';
import RootLayout from './layouts/RootLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='login' element={<LoginPage/>}/>
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
    </Route>
  )
)

const queryClient = new QueryClient(); // Initialize queryClient with a new instance of QueryClient

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
