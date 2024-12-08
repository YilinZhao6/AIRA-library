import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-xl border border-border-light dark:border-border-dark"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Have questions about AIRA? We're here to help.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 text-primary-light dark:text-primary-dark bg-white dark:bg-gray-800 py-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm">
            <Mail className="w-6 h-6" />
            <a href="mailto:contact@aira.ai" className="text-lg hover:opacity-80 transition-opacity">
              contact@aira.ai
            </a>
          </div>
        </div>

        <form className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark shadow-sm">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Message
            </label>
            <textarea
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;