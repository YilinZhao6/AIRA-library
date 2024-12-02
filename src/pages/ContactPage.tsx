import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-50 p-8 rounded-xl shadow-xl border border-gray-200"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-gray-600">
            Have questions about AIRA? We're here to help.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 text-blue-600 bg-white py-4 rounded-lg border border-gray-200 shadow-sm">
            <Mail className="w-6 h-6" />
            <a href="mailto:contact@aira.ai" className="text-lg hover:text-blue-500 transition-colors">
              contact@aira.ai
            </a>
          </div>
        </div>

        <form className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Message
            </label>
            <textarea
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;