import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GroupProvider } from './context/GroupContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GroupProvider>
    <App />
  </GroupProvider>
  </React.StrictMode>
);
