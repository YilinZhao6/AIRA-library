import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, Share2, Bookmark, Link, Quote, X, Copy, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { samplePapers } from '../data/samplePapers';
import { Paper } from '../types/paper';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  paper: Paper;
}

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  action: 'download' | 'preview';
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept, action }) => {
  const [showFullTerms, setShowFullTerms] = useState(false);

  const termsContent = `
    1. Acceptance of Terms
    By accessing and using AIRA Library's services, you agree to be bound by these Terms and Conditions.

    2. Use License
    Permission is granted to temporarily download or preview one copy of the materials (papers) for personal, non-commercial transitory viewing only.

    3. Disclaimer
    The materials on AIRA Library's website are provided on an 'as is' basis. AIRA Library makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

    4. Limitations
    In no event shall AIRA Library or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AIRA Library's website.

    5. Accuracy of Materials
    The materials appearing on AIRA Library's website could include technical, typographical, or photographic errors. AIRA Library does not warrant that any of the materials on its website are accurate, complete, or current.

    6. Links
    AIRA Library has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AIRA Library of the site. Use of any such linked website is at the user's own risk.

    7. Modifications
    AIRA Library may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.

    8. Governing Law
    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-surface-light dark:bg-surface-dark rounded-xl w-full max-w-2xl relative shadow-lg border border-border-light dark:border-border-dark"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-gray-100">
                Terms and Conditions
              </h2>
              
              {!showFullTerms ? (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    By clicking "Accept", you agree to our Terms and Conditions for {action === 'download' ? 'downloading' : 'previewing'} this paper.
                  </p>
                  <button
                    onClick={() => setShowFullTerms(true)}
                    className="text-primary-light dark:text-primary-dark hover:underline"
                  >
                    Read Terms and Conditions
                  </button>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onAccept}
                      className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-600 dark:text-gray-400">
                      {termsContent}
                    </pre>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => setShowFullTerms(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'download' | 'preview', url: string } | null>(null);

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

  const handleAction = (type: 'download' | 'preview', url: string) => {
    setIsTermsModalOpen(true);
    setPendingAction({ type, url });
  };

  const handleAcceptTerms = () => {
    if (pendingAction) {
      if (pendingAction.type === 'preview') {
        window.open(pendingAction.url, '_blank');
      } else {
        window.location.href = pendingAction.url;
      }
      setIsTermsModalOpen(false);
      setPendingAction(null);
    }
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
          <button
            onClick={() => handleAction('download', paper.pdfDownloadURL || '')}
            className="inline-flex items-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          <button
            onClick={() => handleAction('preview', paper.pdfPreviewURL || '')}
            className="inline-flex items-center px-6 py-3 bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-border-light dark:border-border-dark shadow-sm"
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview PDF
          </button>
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

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => {
          setIsTermsModalOpen(false);
          setPendingAction(null);
        }}
        onAccept={handleAcceptTerms}
        action={pendingAction?.type || 'download'}
      />
    </div>
  );
};

export default PaperView;