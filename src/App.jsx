import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFoundPage';
import NavPane from './components/blocks/NavPane';
import CategoriesPage from './pages/CategoriesPage';
import AddTeaPage from './pages/AddTeaPage';
import LibraryPage from './pages/LibraryPage';
import LoginPage from './pages/LoginPage';
import RootLayout from './layouts/RootLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TeaPage from './pages/TeaPage';
import CategoryPage from './pages/CategoryPage';
import { createContext, useState } from 'react';
import EditTeaPage from './pages/EditTeaPage';
import SettingsPage from './pages/SettingsPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='/' element={<AppLayout />}>
        <Route index element={ <HomePage /> }/>
        <Route path='categories' element={ <CategoriesPage /> } />
        <Route path='categories/:id' element={ <CategoryPage /> } />
        <Route path='library' element={ <LibraryPage /> } />
        <Route path='teas/:id' element={ <TeaPage /> } />
        <Route path='add-tea' element={ <AddTeaPage /> } />
        <Route path='edit-tea/:id' element={ <EditTeaPage /> } />
        <Route path='settings' element={ <SettingsPage /> } />
        <Route path='nav' element={ <NavPane /> } />
        <Route path='*' element={ <NotFound /> } />
      </Route>
    </Route>
  )
)
const queryClient = new QueryClient(); // Initialize queryClient with a new instance of QueryClient

export const AuthContext = createContext({
  auth: {
    user: false,
    token: null
  },
  setAuth: () => {}
});

function App() {
  const setAuth = (auth) => {
    setState({...state, auth: auth})
  }

  const initState = {
    auth: {
      user: false,
      token: null
    },
    setAuth: setAuth
  } 

  const [state, setState] = useState(initState)

  return (
    <AuthContext.Provider value={state}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContext.Provider>
  )
}

export default App
