import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, ThemeProvider, useTheme } from './context';
import App from './App';
import './styles/index.css';

// Toast wrapper component that uses theme context
const ThemedToaster = () => {
  const { isDark } = useTheme();
  
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? '#1F2937' : '#FFFFFF',
          color: isDark ? '#FFFFFF' : '#111827',
          border: isDark ? '1px solid rgba(55, 65, 81, 0.5)' : '1px solid rgba(209, 213, 219, 0.5)',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          boxShadow: isDark 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: isDark ? '#FFFFFF' : '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: isDark ? '#FFFFFF' : '#FFFFFF',
          },
        },
      }}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <ThemedToaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
