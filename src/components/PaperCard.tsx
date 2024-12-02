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
      className={`bg-white rounded-xl p-8 ${featured ? 'shadow-lg' : 'shadow-sm'} hover:shadow-md transition-shadow`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <span className="text-sm font-medium text-blue-600 block">
          {paper.category}
        </span>
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-medium leading-tight`}>
          {paper.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">
          {paper.abstract}
        </p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{paper.authors.join(', ')}</span>
          <span>•</span>
          <span>{new Date(paper.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-wrap gap-2">
            {paper.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
          <Link 
            to={`/paper/${paper.id}`}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-500"
          >
            View Paper <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard;