import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
     
    </NextUIProvider>
  </StrictMode>,
)
