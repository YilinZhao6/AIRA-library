import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const RequestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    requirements: "",
    relatedPapers: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const sheetUrl = "https://script.google.com/macros/s/AKfycbwe_iu4d43KU3VdLIuDS2j4w5GhxM8SnoKzF6VQXkzj3GEaTzgmcOBPIykq4OPI0nTe/exec";

    try {
      const response = await fetch(sheetUrl, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      let jsonResult;
      try {
        jsonResult = JSON.parse(result);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
      }

      if (jsonResult?.status === "success" || result.includes("success")) {
        setIsSuccess(true);
        setFormData({
          topic: "",
          category: "",
          requirements: "",
          relatedPapers: "",
          name: "",
          email: "",
        });
      } else {
        throw new Error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setErrorMessage(
        "Submission failed. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="text-xl lg:text-2xl font-semibold text-green-600 dark:text-green-400">
            Request Submitted Successfully!
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            We'll process your request and get back to you soon.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="px-6 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-8 lg:py-16 px-4 lg:px-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl lg:text-4xl font-medium mb-4 lg:mb-8 text-center text-gray-900 dark:text-gray-100">
          Request a Paper
        </h1>
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 text-center">
          Fill out the form below to request a custom research paper. Our AI system will generate
          a paper based on your specifications while maintaining academic rigor and quality.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 lg:space-y-8 bg-surface-light dark:bg-surface-dark p-6 lg:p-8 rounded-xl shadow-xl border border-border-light dark:border-border-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-lg lg:text-xl font-semibold border-b border-border-light dark:border-border-dark pb-4 text-gray-900 dark:text-gray-100">
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

          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-lg lg:text-xl font-semibold border-b border-border-light dark:border-border-dark pb-4 text-gray-900 dark:text-gray-100">
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
            className="w-full px-6 py-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <span className="flex items-center justify-center">
                Submit Request <Send className="w-5 h-5 ml-2" />
              </span>
            )}
          </button>

          {errorMessage && (
            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default RequestPage;