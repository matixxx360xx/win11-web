import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Pulpit from './Pulpit/Pulpit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pulpit />
  </StrictMode>,
)
