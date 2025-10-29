import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Plus, Check } from 'lucide-react';

interface UploadSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExisting: (artwork: any) => void;
  onUploadNew: () => void;
}

export function UploadSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectExisting, 
  onUploadNew 
}: UploadSelectionModalProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  // Mock user gallery - in real app this would come from user's uploaded artworks
  const userGallery = [
    {
      id: 1,
      title: "Cyber Warrior",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
      uploadDate: "2025-01-20",
      category: "Cyberpunk"
    },
    {
      id: 2,
      title: "Space Explorer",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
      uploadDate: "2025-01-18",
      category: "Sci-Fi"
    },
    {
      id: 3,
      title: "Abstract Vision",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
      uploadDate: "2025-01-15",
      category: "Abstract"
    },
    {
      id: 4,
      title: "Digital Portrait",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc",
      uploadDate: "2025-01-12",
      category: "Portrait"
    },
    {
      id: 5,
      title: "Future Vehicle",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrs070e6Z-qpBuV15ndqNYidQUGFH7nPhxW8iINPKgVGI_Qxf-gZaNUYzplIskO8ofLdv5NGmRgYoopZD9LBy4lIqKkDrWhfnSbJRO9yA4zyvvHtQr4pD5paQCxc6GUI8GnjxGhM1RCss8VdLLliih89CjIzeAprIEEsaIKn6EaKm5wWNi8sPSz2_6coiLgzniOZHnHXV4bvg72sZ1QGMezuEthn_I2KyRyjsXibDtbsCc4hmvIkSb8YFTZH88CxE2IYuLf4mHX4",
      uploadDate: "2025-01-10",
      category: "Sci-Fi"
    },
    {
      id: 6,
      title: "Nature Scene",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6LAuZTz0K8X-y8tdsB8ojZaqlGDbX8lHRUBcl8NmSod_JIye0JuHRzlcshUBbbfEc1soVi55t03ea6BabgDELQ4qwY9vJr8yd5UJ9hnXqZ-FsZrWIx1PNObo4WTWNosjSqk-fzS51CfKUS8HWUzdS6vvb3syozJAyopcQ5ZBU_b2nEw8Z6fJUIuGjTXoGofz3aTbwwe4XeoIqHdLzqIwpHbd9pqGjK8zFjqlnDWllxCFp6sbjDo1B-dFecPEvUDtaWEAtowYNLfY",
      uploadDate: "2025-01-08",
      category: "Nature"
    }
  ];

  const handleSelectArtwork = (artwork: any) => {
    setSelectedArtwork(artwork);
  };

  const handleConfirmSelection = () => {
    if (selectedArtwork) {
      onSelectExisting(selectedArtwork);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[95vh] my-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Upload className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Submit to Contest
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Choose Your Submission
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select an existing artwork from your gallery or upload a new one
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Upload New */}
            <button
              onClick={() => {
                onUploadNew();
                onClose();
              }}
              className="group relative overflow-hidden rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10 p-8 text-center transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Upload New Artwork
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create and upload a new artwork for this contest
                  </p>
                </div>
              </div>
            </button>

            {/* Select from Gallery */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Select from Gallery
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose from your existing artworks
                  </p>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4 max-h-48 overflow-y-auto">
                {userGallery.map((artwork) => (
                  <button
                    key={artwork.id}
                    onClick={() => handleSelectArtwork(artwork)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      selectedArtwork?.id === artwork.id
                        ? 'border-primary shadow-lg shadow-primary/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    {selectedArtwork?.id === artwork.id && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="p-1 rounded-full bg-primary text-white">
                          <Check size={16} />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Artwork Info */}
              {selectedArtwork && (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {selectedArtwork.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedArtwork.category} • {selectedArtwork.uploadDate}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleConfirmSelection}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-bold hover:bg-primary/90 hover:glow transition-all duration-300"
                  >
                    Submit This Artwork
                  </button>
                </div>
              )}

              {userGallery.length === 0 && (
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No artworks in your gallery yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can submit up to 3 artworks per contest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}