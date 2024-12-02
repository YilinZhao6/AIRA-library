import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PaperCard from '../components/PaperCard';
import { samplePapers, categories } from '../data/samplePapers';

const ArchivePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPapers = samplePapers.filter(paper => {
    const matchesCategory = !selectedCategory || paper.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-medium mb-12">Paper Archive</h1>
      
      <div className="flex gap-8 mb-12">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search papers (Note: Results may be limited as we continuously generate new content)"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-8">
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
          <p className="text-gray-600">No papers found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">
            Try adjusting your search or check back later as we continuously generate new papers.
          </p>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;