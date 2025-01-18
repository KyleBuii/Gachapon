import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import Homepage from './Homepage'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Homepage/>
    </StrictMode>
);