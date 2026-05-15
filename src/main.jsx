// React strict mode helps detect potential problems
import { StrictMode } from 'react'

// ReactDOM createRoot API
import { createRoot } from 'react-dom/client'

// Global CSS
import './index.css'

// Main App component
import App from './App.jsx'

// BrowserRouter enables routing/navigation
import { BrowserRouter } from 'react-router'

// Mount React app into div#root in index.html
createRoot(document.getElementById('root')).render(

  <StrictMode>

    {/* Enables React Router */}
    <BrowserRouter>

      {/* Main app */}
      <App />

    </BrowserRouter>

  </StrictMode>,
)