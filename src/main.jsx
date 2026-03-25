import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Pulpit from './Pulpit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pulpit />
  </StrictMode>,
)
