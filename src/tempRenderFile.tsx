/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/login';
import FeedPage from './pages/feed';

function TempRenderApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('authToken')
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    window.addEventListener('authStateChange', handleAuthChange);
    return () => window.removeEventListener('authStateChange', handleAuthChange);
  }, []);

  if (isAuthenticated) {
    return <FeedPage onLogout={() => setIsAuthenticated(false)} />;
  }

  return <LoginPage />;
}

export default TempRenderApp;
