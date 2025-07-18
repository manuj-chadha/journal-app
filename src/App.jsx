
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Route, RouterProvider, Routes } from 'react-router'
import Login from './components/auth/Login'
import Home from './pages/Home'
import Layout from './pages/MainLayout'
import CollectionPage from './pages/CollectionPage'
import Signup from './components/auth/Signup'
import Dashboard from './pages/Dashboard'
import EntryLayout from './components/EntryLayout'
import NotFound from './pages/not-found'
import CreateJournalEntry from './pages/CreateJournalEntry'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import JournalEntryPage from './pages/JournalEntryPage'
import { ThemeProvider } from './components/theme-provider'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  const queryClient = new QueryClient();

  return (
    <>
    <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal/write" element={<EntryLayout><CreateJournalEntry /></EntryLayout>} />
          <Route path="/collection/:collectionId" element={<CollectionPage />} />
          <Route path="/collection/unorganized" element={<CollectionPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/journal/:journalId' element={<JournalEntryPage />} />
        </Routes>
      </Layout>
      </QueryClientProvider>
    </ThemeProvider>
    </BrowserRouter>
  </PersistGate>
</Provider>
    </>
  )
}

export default App
