import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const email = 'contact@airalibrary.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center pt-[10vh] lg:pt-[20vh] px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-surface-light dark:bg-surface-dark p-6 lg:p-8 rounded-xl shadow-xl border border-border-light dark:border-border-dark">
          <div className="flex flex-col items-center space-y-6 lg:space-y-8">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h1>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                Have questions about AIRA?
              </p>
            </div>
            
            <div 
              className="group relative flex items-center justify-center bg-white dark:bg-gray-800 px-4 lg:px-8 py-4 rounded-lg border border-border-light dark:border-border-dark cursor-pointer hover:border-primary-light dark:hover:border-primary-dark transition-colors w-full"
              onClick={handleCopyEmail}
            >
              <span className="text-lg lg:text-xl text-gray-900 dark:text-gray-100 mr-3">{email}</span>
              <motion.div
                initial={false}
                animate={copied ? { scale: 0 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="w-5 h-5 text-gray-400 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={copied ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4"
              >
                <Check className="w-5 h-5 text-green-500" />
              </motion.div>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={copied ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 bg-green-500 text-white px-3 py-1 rounded text-sm"
              >
                Copied to clipboard!
              </motion.div>
            </div>

            <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 text-center">
              Click the email address to copy it to your clipboard
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;