import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Add error boundary for development
if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (/Warning.*Cannot update a component/.test(args[0])) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

const container = document.getElementById('root');

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element with ID "root". Please ensure index.html contains <div id="root"></div>.');
}