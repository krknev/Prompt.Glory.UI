import React, { useState } from 'react';
import { X, Heart, Share2, User, Trophy, Eye } from 'lucide-react';

interface SubmissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: {
    id: number;
    image: string;
    artist: string;
    votes: number;
    title?: string;
    description?: string;
  };
  onVote: (submissionId: number) => void;
  isVoted: boolean;
}

export   function SubmissionDetailModal({ 
  isOpen, 
  onClose, 
  submission, 
  onVote, 
  isVoted 
}: SubmissionDetailModalProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!isOpen) return null;

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(submission.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const shareOptions = [
    { 
      name: 'Twitter', 
      icon: '🐦', 
      action: () => window.open(`https://twitter.com/intent/tweet?text=Check out this amazing contest submission by ${submission.artist}!`) 
    },
    { 
      name: 'Facebook', 
      icon: '📘', 
      action: () => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`) 
    },
    { 
      name: 'Copy Link', 
      icon: '🔗', 
      action: () => navigator.clipboard.writeText(window.location.href) 
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] my-4 shadow-2xl flex flex-col">
        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Image Section */}
          <div className="lg:w-2/3 relative min-h-[300px] lg:min-h-[500px]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            <img
              src={submission.image}
              alt={`Contest submission by ${submission.artist}`}
              className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 p-6 flex flex-col overflow-y-auto">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {submission.title || "Contest Submission"}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <User size={16} />
                  <span>by {submission.artist}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Heart size={16} className={isVoted ? 'fill-current text-red-500' : 'text-gray-400'} />
                  <span className="font-medium">{submission.votes} votes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Eye size={16} />
                  <span>Contest Entry</span>
                </div>
              </div>

              {/* Description */}
              {submission.description && (
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {submission.description}
                  </p>
                </div>
              )}

              {/* Contest Info */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-primary/5 dark:bg-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-primary" size={16} />
                  <h3 className="font-bold text-gray-900 dark:text-white">Contest Entry</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This artwork is participating in the Cyberpunk Cityscapes contest. Vote to support the artist!
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleVote}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all duration-300 ${
                    isVoted
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-primary text-white hover:bg-primary/90 hover:glow'
                  }`}
                >
                  <Heart size={16} className={isVoted ? 'fill-current' : ''} />
                  {isVoted ? 'Voted!' : 'Vote for this artwork'}
                </button>

                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-bold"
                  >
                    <Share2 size={16} />
                    Share Submission
                  </button>
                  
                  {/* Share Menu */}
                  {showShareMenu && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      {shareOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            option.action();
                            setShowShareMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                        >
                          <span>{option.icon}</span>
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold">
                  <User size={16} />
                  View Artist Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}