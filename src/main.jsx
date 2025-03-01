import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';


createRoot(document.getElementById('root')).render(
    <div>
        <App/>
    </div>
);