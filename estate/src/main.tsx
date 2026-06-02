import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { TRPCProvider } from '@/providers/trpc'
import SmoothScrollProvider from '@/providers/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import App from './App.tsx'

const basename = typeof window !== 'undefined' && window.location.pathname.startsWith('/estate') ? '/estate' : undefined;

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <TRPCProvider>
      <SmoothScrollProvider>
        <CustomCursor />
        <App />
      </SmoothScrollProvider>
    </TRPCProvider>
  </BrowserRouter>
)
