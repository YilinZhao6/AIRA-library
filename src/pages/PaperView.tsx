import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, Quote, X, Copy, Check } from 'lucide-react';
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
By accessing and using AIRA Library, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of the service.

2. Academic Use Only
AIRA Library is strictly for academic and educational purposes. Users may access, preview, and temporarily download materials for personal research, study, and scholarly inquiry. Any commercial, industrial, or non-academic use is strictly prohibited.

3. Citation and Attribution
AIRA-generated materials must be properly cited in any academic work. When using materials from AIRA Library, users must acknowledge AIRA (Automated Intelligent Research Assistant) as the source.

Users are strictly prohibited from resubmitting, publishing, or redistributing AIRA-generated materials to journals, conferences, or any other publication under their own name.
Any attempt to misrepresent AIRA's work as original human-authored research violates ethical research standards.

4. Disclaimer
The materials provided through AIRA Library are generated using automated research processes and are presented "as is" without guarantees of accuracy, completeness, or reliability. AIRA does not represent the viewpoints of any individual researcher or institution. The content reflects an automated synthesis of information and should not be interpreted as an authoritative academic stance.

5. Limitations of Liability
AIRA Library, its developers, and associated parties shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of its materials, including but not limited to inaccuracies, misinterpretations, or reliance on the information provided.

6. Accuracy and Errors
AIRA Library continuously improves its models, but its materials may contain technical, typographical, or analytical errors. Users are encouraged to critically evaluate all content before citing or applying it to their work.

7. External Links
AIRA Library may include links to external websites. These links are provided for reference only, and AIRA Library does not endorse, control, or assume responsibility for the content of external sources.

8. Modifications to Terms
AIRA Library reserves the right to update or modify these terms at any time without prior notice. Continued use of the service implies acceptance of the latest version of the Terms of Use.

9. Governing Law
These terms are governed by and construed in accordance with applicable legal frameworks. Users agree to submit to the jurisdiction of relevant courts for any disputes related to AIRA Library's usage policies.
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
            
            <div className="p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-medium mb-4 text-gray-900 dark:text-gray-100">
                Terms and Conditions
              </h2>
              
              {!showFullTerms ? (
                <div className="space-y-4">
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                    By clicking "Accept", you agree to our Terms and Conditions for {action === 'download' ? 'downloading' : 'previewing'} this paper.
                  </p>
                  <button
                    onClick={() => setShowFullTerms(true)}
                    className="text-sm lg:text-base text-primary-light dark:text-primary-dark hover:underline"
                  >
                    Read Terms and Conditions
                  </button>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onAccept}
                      className="px-4 py-2 text-sm lg:text-base bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                      {termsContent}
                    </pre>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => setShowFullTerms(false)}
                      className="px-4 py-2 text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl w-full max-w-2xl relative shadow-lg border border-border-light dark:border-border-dark">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-medium mb-6 text-gray-900 dark:text-gray-100">Citation Formats</h2>
          
          <div className="space-y-4 lg:space-y-6">
            {Object.entries(citationFormats).map(([format, citation]) => (
              <div key={format} className="p-4 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{format}</h3>
                  <button
                    onClick={() => handleCopy(format)}
                    className="text-primary-light dark:text-primary-dark hover:opacity-80 flex items-center gap-1 text-sm"
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
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">{citation}</p>
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
  const [isCitationModalOpen, setIsCitationModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'download' | 'preview', url: string } | null>(null);

  if (!paper) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">Paper Not Found</h2>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">The requested paper could not be found.</p>
        </div>
      </div>
    );
  }

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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-16 bg-background-light dark:bg-background-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 lg:p-8 shadow-xl border border-border-light dark:border-border-dark"
      >
        {/* Paper Info */}
        <div className="bg-background-light dark:bg-background-dark p-4 lg:p-6 rounded-lg border border-border-light dark:border-border-dark mb-6 lg:mb-8">
          <span className="text-xs lg:text-sm font-medium text-primary-light dark:text-primary-dark block mb-3 lg:mb-4">
            {paper.category}
          </span>
          <h1 className="text-xl lg:text-3xl font-medium mb-3 lg:mb-4 text-gray-900 dark:text-gray-100">{paper.title}</h1>
          
          <div className="flex flex-wrap items-center text-xs lg:text-sm text-gray-500 dark:text-gray-400 gap-2 lg:gap-4 mb-4 lg:mb-6">
            <span className="font-medium text-gray-800 dark:text-gray-200">{paper.authors.join(', ')}</span>
            <span>•</span>
            <span>{new Date(paper.date).toLocaleDateString()}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {paper.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block text-xs lg:text-sm bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark px-3 py-1 rounded-full hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 cursor-pointer transition-colors whitespace-nowrap"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-background-light dark:bg-background-dark p-4 lg:p-6 rounded-lg border border-border-light dark:border-border-dark mb-6 lg:mb-8">
          <div className="prose dark:prose-invert max-w-none mb-8 lg:mb-12">
            <div className="mb-6 lg:mb-8">
              <h2 className="text-lg lg:text-xl font-medium mb-3 lg:mb-4 text-gray-900 dark:text-gray-100">Abstract</h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">{paper.abstract}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <button
            onClick={() => handleAction('download', paper.pdfDownloadURL || '')}
            className="inline-flex items-center justify-center px-4 lg:px-6 py-2.5 lg:py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg text-sm lg:text-base"
          >
            <Download className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
            Download PDF
          </button>
          <button
            onClick={() => handleAction('preview', paper.pdfPreviewURL || '')}
            className="inline-flex items-center justify-center px-4 lg:px-6 py-2.5 lg:py-3 bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-border-light dark:border-border-dark shadow-sm text-sm lg:text-base"
          >
            <Eye className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
            Preview PDF
          </button>
          <button
            onClick={() => setIsCitationModalOpen(true)}
            className="inline-flex items-center justify-center px-4 lg:px-6 py-2.5 lg:py-3 bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-border-light dark:border-border-dark shadow-sm text-sm lg:text-base"
          >
            <Quote className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
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