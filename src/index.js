import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { QuizzProvider } from './contexts/QuizContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizzProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QuizzProvider>
);


