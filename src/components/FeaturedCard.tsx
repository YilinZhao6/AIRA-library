import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Paper } from '../types/paper';

interface FeaturedCardProps {
  paper: Paper;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ paper }) => {
  return (
    <motion.div
      className="bg-surface-light dark:bg-surface-dark rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-border-light dark:border-border-dark"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-3">
        <h3 className="text-lg font-medium leading-tight text-gray-900 dark:text-gray-100 line-clamp-2">
          {paper.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {paper.abstract}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {paper.authors[0]}
          </span>
          <Link
            to={`/paper/${paper.id}`}
            className="inline-flex items-center text-sm text-primary-light dark:text-primary-dark font-medium hover:opacity-80 transition-opacity"
          >
            View Paper <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;