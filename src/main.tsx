import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.ts'
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<Provider store={store}>
  <App />
  </Provider>
    
  </StrictMode>,
)
