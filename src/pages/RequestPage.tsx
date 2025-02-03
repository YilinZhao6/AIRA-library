import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';

const RequestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    category: '',
    requirements: '',
    relatedPapers: '',
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const emailSubject = `Paper Request: ${formData.topic}`;
    const emailBody = `
New Paper Request

Research Topic: ${formData.topic}
Category: ${formData.category}

Research Requirements:
${formData.requirements}

Related Papers:
${formData.relatedPapers}

Requester Information:
Name: ${formData.name}
Email: ${formData.email}
    `.trim();

    // Open email client
    window.location.href = `mailto:contact@airalibrary.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Show success state after a brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 px-8">
      <div className="w-full max-w-2xl">
        {!isSuccess && (
          <>
            <h1 className="text-4xl font-medium mb-8 text-center text-gray-900 dark:text-gray-100">
              Request a Paper
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12 text-center">
              Fill out the form below to request a custom research paper. Our AI system will generate
              a paper based on your specifications while maintaining academic rigor and quality.
            </p>
          </>
        )}

        {!isSuccess ? (
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-8 bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-xl border border-border-light dark:border-border-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-8">
              <h2 className="text-xl font-semibold border-b border-border-light dark:border-border-dark pb-4 text-gray-900 dark:text-gray-100">
                Paper Details
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Research Topic *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
                  placeholder="e.g., Advanced Machine Learning Algorithms"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
                  placeholder="e.g., Machine Learning, Computer Vision, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Research Requirements *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
                  placeholder="Describe your specific requirements, methodology preferences, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Related Papers (Optional)
                </label>
                <textarea
                  name="relatedPapers"
                  value={formData.relatedPapers}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
                  placeholder="Add URLs of related or background papers"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl font-semibold border-b border-border-light dark:border-border-dark pb-4 text-gray-900 dark:text-gray-100">
                Your Information
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Preferred Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center justify-center w-full px-6 py-4 rounded-lg text-white font-medium shadow-md hover:shadow-lg
                ${isSubmitting ? 'bg-gray-400 dark:bg-gray-600' : 'bg-primary-light dark:bg-primary-dark hover:opacity-90'}
                transition-all
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
            className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-xl border border-border-light dark:border-border-dark text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-10 h-10 text-green-600 dark:text-green-400"
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
            <h2 className="text-2xl font-medium text-green-800 dark:text-green-200 mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-8">
              Thank you for your request. We'll begin processing your paper generation request
              and will contact you via email with updates on the progress.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center mx-auto px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
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