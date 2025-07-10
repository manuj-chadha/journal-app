
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { RouterProvider } from 'react-router'
import Login from './components/auth/Login'
import Home from './pages/Home'
import Layout from './pages/MainLayout'
import CollectionPage from './pages/CollectionPage'
import Signup from './components/auth/Signup'
import Dashboard from './pages/Dashboard'
import JournalEntryPage from './pages/JournalEntry'
import EntryLayout from './components/EntryLayout'
import NotFound from './pages/not-found'

function App() {

  const router=createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/',
      element: <Layout><Home /></Layout>
    },
    {
      path: '/dashboard',
      element: <Layout><Dashboard /></Layout>
    },
    {
      path: '/journal/write',
      element: <Layout><EntryLayout><JournalEntryPage /></EntryLayout></Layout>
    },
    {
      path: '*',
      element: <NotFound />
    },
  ])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
