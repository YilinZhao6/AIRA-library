import React, { useState } from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-48"
            >
              <div className="space-y-2">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;