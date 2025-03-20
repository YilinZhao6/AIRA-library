import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Youtube, Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
      <header className="py-4 lg:py-6 border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark sticky top-0 z-50">
        <nav className="flex items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              <span>AIRA</span>
              <span className="hidden lg:inline">:</span>
            </span>
            <span className="hidden lg:inline text-2xl text-gray-400 dark:text-gray-500">AUTONOMOUS INTELLIGENT RESEARCH ASSISTANT</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8 pr-8">
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

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[57px] bg-background-light dark:bg-background-dark z-40">
            <div className="flex flex-col space-y-4 p-4">
              <Link 
                to="/" 
                onClick={toggleMenu}
                className={`${isActive('/') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300'} text-xl py-2`}
              >
                Home
              </Link>
              <Link 
                to="/archive" 
                onClick={toggleMenu}
                className={`${isActive('/archive') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300'} text-xl py-2`}
              >
                Archive
              </Link>
              <Link 
                to="/request" 
                onClick={toggleMenu}
                className={`${isActive('/request') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300'} text-xl py-2`}
              >
                Request Paper
              </Link>
              <Link 
                to="/contact" 
                onClick={toggleMenu}
                className={`${isActive('/contact') ? 'text-primary-light dark:text-primary-dark font-bold' : 'text-gray-600 dark:text-gray-300'} text-xl py-2`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="bg-background-light dark:bg-background-dark">
        {children}
      </main>

      <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">AIRA</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Advancing research through artificial intelligence.
              </p>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/Ash9200/AIRA" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/watch?v=tYlSQMGkOYE" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark text-sm inline-flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4" />
                    Video
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
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