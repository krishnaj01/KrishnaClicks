import App from './App.jsx'
import './index.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop'

import AppContextProvider from './contexts/AppContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <ScrollToTop />
      <App />
    </AppContextProvider>
  </BrowserRouter>
)
