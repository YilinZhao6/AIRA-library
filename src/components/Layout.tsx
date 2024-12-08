import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" style={{ fontFamily: 'Futura, system-ui, sans-serif' }}>
      <header className="py-6 px-8 border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">AIRA</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 -mt-1">Artificial Intelligence Research Assistant</span>
          </Link>
          <div className="space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-primary-light dark:text-primary-dark' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-light dark:hover:text-primary-dark transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/archive" 
              className={`${isActive('/archive') ? 'text-primary-light dark:text-primary-dark' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-light dark:hover:text-primary-dark transition-colors`}
            >
              Archive
            </Link>
            <Link 
              to="/request" 
              className={`${isActive('/request') ? 'text-primary-light dark:text-primary-dark' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-light dark:hover:text-primary-dark transition-colors`}
            >
              Request Paper
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-primary-light dark:text-primary-dark' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-light dark:hover:text-primary-dark transition-colors`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="bg-background-light dark:bg-background-dark">
        {children}
      </main>

      <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">AIRA</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advancing research through artificial intelligence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Home</Link></li>
                <li><Link to="/archive" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Paper Archive</Link></li>
                <li><Link to="/request" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Request Paper</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">API Reference</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Research Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border-light dark:border-border-dark text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} AIRA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;