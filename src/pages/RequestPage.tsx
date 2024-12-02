import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';

const RequestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 px-8 bg-white">
      <div className="w-full max-w-2xl">
        {!isSuccess && (
          <>
            <h1 className="text-4xl font-medium mb-8 text-center">Request a Paper</h1>
            <p className="text-gray-600 mb-12 text-center">
              Fill out the form below to request a custom research paper. Our AI system will generate
              a paper based on your specifications while maintaining academic rigor and quality.
            </p>
          </>
        )}

        {!isSuccess ? (
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-8 bg-gray-50 p-8 rounded-xl shadow-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-8">
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-4">Paper Details</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Research Topic *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="e.g., Advanced Machine Learning Algorithms"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="e.g., Machine Learning, Computer Vision, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Research Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Describe your specific requirements, methodology preferences, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Related Papers (Optional)
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Add URLs of related or background papers"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-4">Your Information</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Preferred Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center justify-center w-full px-6 py-4 rounded-lg text-white font-medium shadow-md hover:shadow-lg
                ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'}
                transition-colors
              `}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Submit Request
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-50 p-8 rounded-xl shadow-xl border border-gray-200 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            <h2 className="text-2xl font-medium text-green-800 mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-green-700 mb-8">
              Thank you for your request. We'll begin processing your paper generation request
              and will contact you via email with updates on the progress.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Main Page
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RequestPage;