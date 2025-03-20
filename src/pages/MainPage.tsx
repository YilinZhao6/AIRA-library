import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { samplePapers } from '../data/samplePapers';
import FeaturedCard from '../components/FeaturedCard';

const MainPage = () => {
  const featuredPapers = samplePapers.filter(paper => paper.featured);
  const papersPerPage = 3;
  const totalPages = Math.ceil(featuredPapers.length / papersPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const getCurrentPagePapers = () => {
    const start = currentPage * papersPerPage;
    return featuredPapers.slice(start, start + papersPerPage);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background-light dark:bg-background-dark">
      {/* Introduction Section */}
      <div className="w-full lg:w-1/4 p-6 lg:p-8 bg-gray-50 dark:bg-surface-dark flex flex-col justify-center">
        <div className="space-y-6 lg:-mt-[20vh]">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-center">
            <span className="text-primary-light dark:text-primary-dark">A Complete</span>{' '}
            <span className="text-primary-light dark:text-primary-dark">Multi-Disciplinary</span>
            <br />
            <span className="text-gray-900 dark:text-gray-100 mt-0 inline-block">AI Research System</span>
          </h1>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 text-center">
            AIRA is a system and framework for automating the research process from end to end—from generating research hypotheses, running code-based experiments, grounding in source documents and writing a full paper. AIRA can adapt to any research domain, including the "soft" and "hard" sciences, allowing a near limitless number of use cases and opportunities for iteration and development.
          </p>
          <div className="flex justify-center">
            <a
              href="https://pub-10c4f01544774ad9be52149bfb9943d8.r2.dev/aira_autonomous_intelligent_research_assistant.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-lg hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors text-sm lg:text-base"
            >
              <FileText className="w-4 h-4 mr-2" />
              Read AIRA's System Paper
            </a>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-white dark:bg-surface-dark-focus">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/tYlSQMGkOYE?si=FWWVnMXFeIXTn_qE"
                title="Product Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="text-xl lg:text-2xl font-medium mt-6 mb-4 text-gray-900 dark:text-gray-100">
              See AIRA in Action
            </h2>
          </div>
        </div>
      </div>

      {/* Featured Papers Section */}
      <div className="w-full lg:w-1/4 p-6 lg:p-8 bg-gray-50 dark:bg-surface-dark min-h-[400px] lg:min-h-screen">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl lg:text-2xl font-medium text-gray-900 dark:text-gray-100">Featured Papers</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded-full transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-primary-light dark:text-primary-dark" />
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded-full transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-primary-light dark:text-primary-dark" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="h-full bg-background-light dark:bg-background-dark rounded-lg p-4 lg:p-6 shadow-sm border border-border-light dark:border-border-dark"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.5,
                  opacity: { duration: 0.3 }
                }}
              >
                <div className="space-y-4 h-full overflow-y-auto">
                  {getCurrentPagePapers().map((paper) => (
                    <FeaturedCard key={paper.id} paper={paper} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page Navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === index 
                    ? 'bg-primary-light dark:bg-primary-dark w-4' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;