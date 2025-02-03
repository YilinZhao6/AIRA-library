import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Youtube } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
      <header className="py-6 border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark sticky top-0 z-50">
        <nav className="flex items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">AIRA:</span>
            <span className="text-2xl text-gray-400 dark:text-gray-500">AUTONOMOUS INTELLIGENCE RESEARCH ASSISTANT</span>
          </Link>
          <div className="flex items-center space-x-8 pr-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300 font-bold'} hover:text-primary-light dark:hover:text-primary-dark transition-colors text-2xl`}
            >
              Home
            </Link>
            <Link 
              to="/archive" 
              className={`${isActive('/archive') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300 font-bold'} hover:text-primary-light dark:hover:text-primary-dark transition-colors text-2xl`}
            >
              Archive
            </Link>
            <Link 
              to="/request" 
              className={`${isActive('/request') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300 font-bold'} hover:text-primary-light dark:hover:text-primary-dark transition-colors text-2xl`}
            >
              Request Paper
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300 font-bold'} hover:text-primary-light dark:hover:text-primary-dark transition-colors text-2xl`}
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
          <div className="flex justify-between">
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">AIRA</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Advancing research through artificial intelligence.
              </p>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/yourusername/aira" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </li>
                <li>
                  <a 
                    href="https://youtube.com/your-channel" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm inline-flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4" />
                    Video
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Home</Link></li>
                <li><Link to="/archive" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Paper Archive</Link></li>
                <li><Link to="/request" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Request Paper</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;