import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import PaperCard from '../components/PaperCard';
import { samplePapers } from '../data/samplePapers';

const MainPage = () => {
  const featuredPapers = samplePapers.filter(paper => paper.featured);
  const [currentPaper, setCurrentPaper] = useState(0);

  const nextPaper = () => {
    setCurrentPaper((prev) => (prev + 1) % featuredPapers.length);
  };

  useEffect(() => {
    const interval = setInterval(nextPaper, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <motion.h1 
            className="text-6xl font-medium tracking-tight text-gray-900 mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Advancing Research Through
            <span className="text-blue-600"> Artificial Intelligence</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AIRA generates high-quality academic papers using advanced AI technology. 
            Explore our collection or request custom research papers tailored to your needs.
          </motion.p>
          <motion.a
            href="https://arxiv.org/abs/2024.xxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FileText className="w-5 h-5 mr-2" />
            Read Our System Paper on arXiv
          </motion.a>
        </div>
      </div>

      {/* Featured Papers Slider */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-medium mb-12">Featured Papers</h2>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPaper}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <PaperCard paper={featuredPapers[currentPaper]} featured />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {featuredPapers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPaper(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPaper === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* System Introduction */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-medium mb-8">How AIRA Works</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Advanced Language Models</h3>
                  <p className="text-gray-600">
                    AIRA utilizes state-of-the-art language models specifically trained on academic papers
                    and research documents to generate high-quality content.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Knowledge Integration</h3>
                  <p className="text-gray-600">
                    Our system integrates vast amounts of academic knowledge from various fields,
                    ensuring accurate and relevant content generation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">
                    Each generated paper undergoes rigorous automated validation to ensure
                    accuracy, coherence, and adherence to academic standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium mb-2">Input Processing</h4>
                <p className="text-sm text-gray-600">Analysis of research requirements and context</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium mb-2">Content Generation</h4>
                <p className="text-sm text-gray-600">AI-powered research and writing</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium mb-2">Validation</h4>
                <p className="text-sm text-gray-600">Automated quality checks and verification</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium mb-2">Delivery</h4>
                <p className="text-sm text-gray-600">Final paper compilation and formatting</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;