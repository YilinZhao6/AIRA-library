import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, Code, Database, Shield, Pause, Play, MessageCircle, ThumbsUp } from 'lucide-react';
import { samplePapers } from '../data/samplePapers';
import { sampleComments } from '../data/sampleComments';
import { Paper } from '../types/paper';
import FeaturedCard from '../components/FeaturedCard';

const sections = ['intro', 'video', 'papers'] as const;
type Section = typeof sections[number];

const MainPage = () => {
  const featuredPapersByCategory = samplePapers
    .filter(paper => paper.featured)
    .reduce((acc, paper) => {
      if (!acc[paper.category]) {
        acc[paper.category] = [];
      }
      acc[paper.category].push(paper);
      return acc;
    }, {} as Record<string, Paper[]>);

  const categories = Object.keys(featuredPapersByCategory);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [focusedSection, setFocusedSection] = useState<Section>('intro');
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);

  useEffect(() => {
    if (!hasCompletedIntro) {
      const sequence = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFocusedSection('papers');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFocusedSection('video');
        setHasCompletedIntro(true);
      };
      sequence();
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlayPaused && categories.length > 1) {
      const categoryInterval = setInterval(() => {
        setCurrentCategory((prev) => (prev + 1) % categories.length);
      }, 3000);
      return () => clearInterval(categoryInterval);
    }
  }, [categories.length, isAutoPlayPaused]);

  const getSectionStyle = (section: Section) => ({
    width: focusedSection === section ? '50%' : '25%',
    opacity: focusedSection === section ? 1 : 0.85,
  });

  return (
    <div className="h-screen flex overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Introduction Section */}
      <motion.div 
        className="h-full p-8 bg-surface-light dark:bg-surface-dark"
        animate={getSectionStyle('intro')}
        transition={{ duration: 0.5 }}
        onClick={() => setFocusedSection('intro')}
        style={{ cursor: 'pointer' }}
      >
        <div className="h-full flex flex-col">
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-100"
              animate={{ scale: focusedSection === 'intro' ? 1 : 0.8 }}
            >
              Advancing Research Through
              <span className="text-primary-light dark:text-primary-dark"> Artificial Intelligence</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              animate={{ opacity: focusedSection === 'intro' ? 1 : 0.7 }}
            >
              AIRA generates high-quality academic papers using advanced AI technology.
              Experience the future of academic research with our cutting-edge AI system.
            </motion.p>
            <motion.a
              href="https://arxiv.org/abs/2024.xxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-lg hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Read Our Paper on arXiv
            </motion.a>
          </div>

          <motion.div 
            className="mt-8 grid grid-cols-2 gap-4"
            animate={{ opacity: focusedSection === 'intro' ? 1 : 0.7 }}
          >
            <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
              <Brain className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <h3 className="text-xl font-medium mb-1 text-gray-900 dark:text-gray-100">Advanced Language Models</h3>
              <p className="text-gray-600 dark:text-gray-400">State-of-the-art models trained extensively on academic papers and research documents.</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
              <Code className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <h3 className="text-xl font-medium mb-1 text-gray-900 dark:text-gray-100">Knowledge Integration</h3>
              <p className="text-gray-600 dark:text-gray-400">Seamless integration of vast academic knowledge across multiple disciplines.</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
              <Database className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <h3 className="text-xl font-medium mb-1 text-gray-900 dark:text-gray-100">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-400">Rigorous automated validation ensuring research integrity and accuracy.</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
              <Shield className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <h3 className="text-xl font-medium mb-1 text-gray-900 dark:text-gray-100">Research Ethics</h3>
              <p className="text-gray-600 dark:text-gray-400">Committed to maintaining high ethical standards in AI-generated research.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div 
        className="h-full p-8 bg-surface-light dark:bg-surface-dark"
        animate={getSectionStyle('video')}
        transition={{ duration: 0.5 }}
        onClick={() => setFocusedSection('video')}
        style={{ cursor: 'pointer' }}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center">
            <motion.div 
              className="w-full aspect-video rounded-lg overflow-hidden shadow-lg"
              animate={{ scale: focusedSection === 'video' ? 1 : 0.8 }}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/_fuimO6ErKI"
                title="Product Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            <motion.h2 
              className="text-2xl font-medium mt-6 mb-4 text-gray-900 dark:text-gray-100"
              animate={{ opacity: focusedSection === 'video' ? 1 : 0.7 }}
            >
              See AIRA in Action
            </motion.h2>
          </div>

          {/* Comments Section */}
          <motion.div 
            className="mt-4 space-y-4 overflow-auto max-h-64"
            animate={{ opacity: focusedSection === 'video' ? 1 : 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-primary-light dark:text-primary-dark" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Comments</h3>
            </div>
            {sampleComments.map((comment) => (
              <div key={comment.id} className="bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{comment.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{comment.role}</p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{comment.timeAgo}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{comment.content}</p>
                <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{comment.likes}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Papers Section */}
      <motion.div 
        className="h-full p-8 bg-surface-light dark:bg-surface-dark"
        animate={getSectionStyle('papers')}
        transition={{ duration: 0.5 }}
        onClick={() => setFocusedSection('papers')}
        style={{ cursor: 'pointer' }}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">Featured Papers</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoPlayPaused(!isAutoPlayPaused);
              }}
              className="p-2 hover:bg-background-light dark:hover:bg-background-dark rounded-full transition-colors"
              aria-label={isAutoPlayPaused ? "Resume autoplay" : "Pause autoplay"}
            >
              {isAutoPlayPaused ? (
                <Play className="w-5 h-5 text-primary-light dark:text-primary-dark" />
              ) : (
                <Pause className="w-5 h-5 text-primary-light dark:text-primary-dark" />
              )}
            </button>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <motion.h3
              className="text-lg text-primary-light dark:text-primary-dark font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={categories[currentCategory]}
            >
              {categories[currentCategory]}
            </motion.h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentCategory + 1} / {categories.length}
            </span>
          </div>
          
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                className="absolute inset-0 bg-background-light dark:bg-background-dark rounded-lg p-6 shadow-sm border border-border-light dark:border-border-dark"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.5,
                  opacity: { duration: 0.3 }
                }}
              >
                <div className="space-y-3 overflow-auto max-h-full pr-2">
                  {featuredPapersByCategory[categories[currentCategory]].map((paper) => (
                    <FeaturedCard key={paper.id} paper={paper} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Dot Navigation */}
          <div className="flex justify-center mt-4 space-x-3 select-none">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentCategory(index);
                }}
                className="group relative p-2"
                aria-label={`Go to ${category} category`}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentCategory === index 
                    ? 'bg-primary-light dark:bg-primary-dark scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`} />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainPage;