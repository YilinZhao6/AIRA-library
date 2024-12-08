import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Share2, Bookmark, Link, Quote, X, Copy, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { samplePapers } from '../data/samplePapers';
import { Paper } from '../types/paper';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  paper: Paper;
}

const CitationModal: React.FC<CitationModalProps> = ({ isOpen, onClose, paper }) => {
  const [copiedFormat, setCopiedFormat] = useState<string>('');
  
  const citationFormats: Record<string, string> = {
    APA: `${paper.authors.join(', ')}. (${new Date(paper.date).getFullYear()}). ${paper.title}`,
    MLA: `AIRA. "${paper.title}." ${new Date(paper.date).getFullYear()}.`,
    Chicago: `${paper.authors.join(', ')}. "${paper.title}." ${new Date(paper.date).getFullYear()}.`
  };

  const handleCopy = (format: string) => {
    navigator.clipboard.writeText(citationFormats[format]);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl w-full max-w-2xl mx-4 relative shadow-lg border border-border-light dark:border-border-dark">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-medium mb-6 text-gray-900 dark:text-gray-100">Citation Formats</h2>
          
          <div className="space-y-6">
            {Object.entries(citationFormats).map(([format, citation]) => (
              <div key={format} className="p-4 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{format}</h3>
                  <button
                    onClick={() => handleCopy(format)}
                    className="text-primary-light dark:text-primary-dark hover:opacity-80 flex items-center gap-1"
                  >
                    {copiedFormat === format ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{citation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaperView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const paper = samplePapers.find(p => p.id === id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCitationModalOpen, setIsCitationModalOpen] = useState(false);

  if (!paper) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">Paper Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The requested paper could not be found.</p>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 bg-background-light dark:bg-background-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-light dark:bg-surface-dark rounded-xl p-8 shadow-xl border border-border-light dark:border-border-dark"
      >
        {/* Top Actions Bar */}
        <div className="flex justify-end space-x-4 mb-8">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg ${
              isBookmarked 
                ? 'bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            } hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button 
            onClick={handleCopyLink}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          >
            <Link className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Info */}
        <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg border border-border-light dark:border-border-dark mb-8">
          <span className="text-sm font-medium text-primary-light dark:text-primary-dark block mb-4">
            {paper.category}
          </span>
          <h1 className="text-3xl font-medium mb-4 text-gray-900 dark:text-gray-100">{paper.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-6">
            <span className="font-medium text-gray-800 dark:text-gray-200">{paper.authors.join(', ')}</span>
            <span>•</span>
            <span>{new Date(paper.date).toLocaleDateString()}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {paper.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block text-sm bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark px-4 py-1.5 rounded-full hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 cursor-pointer transition-colors whitespace-nowrap"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg border border-border-light dark:border-border-dark mb-8">
          <div className="prose dark:prose-invert max-w-none mb-12">
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-gray-100">Abstract</h2>
              <p className="text-gray-600 dark:text-gray-400">{paper.abstract}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <a
            href={paper.pdfDownloadURL}
            className="inline-flex items-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </a>
          <a
            href={paper.pdfPreviewURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-border-light dark:border-border-dark shadow-sm"
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview PDF
          </a>
          <button
            onClick={() => setIsCitationModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-border-light dark:border-border-dark shadow-sm"
          >
            <Quote className="w-5 h-5 mr-2" />
            Cite Paper
          </button>
        </div>
      </motion.div>

      <CitationModal 
        isOpen={isCitationModalOpen}
        onClose={() => setIsCitationModalOpen(false)}
        paper={paper}
      />
    </div>
  );
};

export default PaperView;