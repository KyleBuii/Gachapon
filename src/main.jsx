import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Disclaimer from './Disclaimer';
import Hotbar from './Hotbar';
import './index.scss';


createRoot(document.getElementById('root')).render(
    <div>
        <Disclaimer/>
        <Hotbar/>
    </div>
);