import React, { useState } from 'react';
import { Heart, Share2, Expand, ShoppingCart, Star } from 'lucide-react';
import { ArtworkLightboxModal } from '../modals/ArtworkLightboxModal';

interface ContestCardProps {
  artwork: {
    id: number;
    title: string;
    artist: string;
    price: string;
    rating: number;
    likes: number;
    image: string;
    prompt?: string;
    promptPrice?: string;
  };
  onExpandContestEntry?: (artwork: any) => void;
  lightboxConfig?: {
    showPurchaseOptions?: boolean;
    showVoteButton?: boolean;
    showAddToCart?: boolean;
    showHireCreator?: boolean;
    showDownload?: boolean;
    customButtons?: Array<{
      label: string;
      icon: React.ReactNode;
      onClick: (artwork: any) => void;
      variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    }>;
  };
}

export function ContestCard({ artwork, onExpandContestEntry, lightboxConfig }: ContestCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(artwork.likes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExpandContestEntry) {
      onExpandContestEntry(artwork);
    } else {
      setIsExpanded(true);
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: '🔗',
      action: () => navigator.clipboard.writeText(window.location.href)
    }
  ];

  return (
    <>
      <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 group">
        <div className="relative overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/90 text-white' 
                    : 'bg-black/50 text-white hover:bg-red-500/90'
                }`}
              >
                <Heart size={14} className={`sm:w-4 sm:h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-primary/90 backdrop-blur-sm transition-all duration-300"
                >
                  <Share2 size={14} className="sm:w-4 sm:h-4" />
                </button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[120px] z-50">
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

              {/* Expand Button */}
              <button
                onClick={handleExpand}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-primary/90 backdrop-blur-sm transition-all duration-300"
              >
                <Expand size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          
          {/* Information overlay - shows on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {artwork.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3">
              by {artwork.artist}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              {artwork.rating && (
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-current" size={12} />
                  <span className="text-sm font-medium text-white">{artwork.rating}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-white/80">
                <Heart size={12} className={isLiked ? 'fill-current text-red-500' : ''} />
                <span className="text-sm">{likes}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-lg font-bold text-primary">
                {artwork.price || 'Contest Entry'}
              </span>
              <button 
                onClick={handleExpand}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary/90 hover:glow transition-all duration-300 text-xs sm:text-sm font-bold"
              >
                <Expand size={14} />
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Use the extracted Lightbox Modal */}
      <ArtworkLightboxModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        artwork={artwork}
        isLiked={isLiked}
        onLike={handleLikeToggle}
        lightboxConfig={lightboxConfig}
      />
    </>
  );
}