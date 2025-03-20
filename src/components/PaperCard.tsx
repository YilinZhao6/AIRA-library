import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Paper } from '../types/paper';

interface PaperCardProps {
  paper: Paper;
  featured?: boolean;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, featured = false }) => {
  return (
    <motion.div 
      className={`bg-surface-light dark:bg-surface-dark rounded-xl p-6 lg:p-8 ${featured ? 'shadow-lg' : 'shadow-sm'} hover:shadow-md transition-shadow border border-border-light dark:border-border-dark`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <span className="text-sm font-medium text-primary-light dark:text-primary-dark block">
          {paper.category}
        </span>
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-medium leading-tight text-gray-900 dark:text-gray-100`}>
          {paper.title}
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3">
          {paper.abstract}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
          <span>{paper.authors.join(', ')}</span>
          <span>•</span>
          <span>{new Date(paper.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-wrap gap-2">
            {paper.keywords.slice(0, 3).map((keyword, index) => (
              <span 
                key={index}
                className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
          <Link 
            to={`/paper/${paper.id}`}
            className="inline-flex items-center text-primary-light dark:text-primary-dark font-medium hover:opacity-80 transition-opacity"
          >
            View Paper <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard;