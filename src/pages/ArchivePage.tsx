import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { samplePapers, categories } from '../data/samplePapers';
import PaperCard from '../components/PaperCard';

const SIDEBAR_WIDTH = '16rem';
const GRID_GAP = '2rem';
const PAPERS_PER_ROW = 2;

const ArchivePage = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = samplePapers.filter(paper => paper.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  const toggleCategory = (category: string) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(category)) {
      newSelectedCategories.delete(category);
    } else {
      newSelectedCategories.add(category);
    }
    setSelectedCategories(newSelectedCategories);
  };

  const filteredPapers = samplePapers.filter(paper => 
    selectedCategories.size === 0 || selectedCategories.has(paper.category)
  );

  return (
    <div className="max-w-[100rem] mx-auto px-8 py-16">
      <h1 className="text-4xl font-medium mb-12 text-gray-900 dark:text-gray-100">Paper Archive</h1>
      
      <div className="flex gap-12">
        {/* Category Filter Panel */}
        <div style={{ width: SIDEBAR_WIDTH }} className="flex-shrink-0">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Categories</h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center group cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark"
                  />
                  <div className="flex justify-between items-center flex-1 ml-3">
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                      {categoryCount[category]}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            
            {selectedCategories.size > 0 && (
              <button
                onClick={() => setSelectedCategories(new Set())}
                className="mt-6 text-sm text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="flex-1">
          <div 
            className="grid gap-8" 
            style={{
              gridTemplateColumns: `repeat(${PAPERS_PER_ROW}, minmax(0, 1fr))`,
              gap: GRID_GAP
            }}
          >
            {filteredPapers.map((paper) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PaperCard paper={paper} />
              </motion.div>
            ))}
          </div>
          
          {filteredPapers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400">No papers found in the selected categories.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Try selecting different categories or clear all filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;