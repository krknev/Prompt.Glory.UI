import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Share2, 
  X, 
  ShoppingCart, 
  Star, 
  Download, 
  ZoomIn,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ChevronRight,
  User,
  Images,
  Sparkles,
  Eye,
  BadgeCheck,
  CreditCard,
  Wallet,
  DollarSign
} from 'lucide-react';

interface ArtworkLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: {
    id: number;
    title: string;
    artist: string;
    price?: string;
    rating?: number;
    likes: number;
    image: string;
    prompt?: string;
    promptPrice?: string;
  };
  isLiked: boolean;
  onLike: () => void;
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

// Helper components
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200">
      {children}
    </span>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {new Array(5).fill(0).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full 
              ? "fill-yellow-400 stroke-yellow-400" 
              : half && i === full 
                ? "fill-yellow-400/70 stroke-yellow-400/70" 
                : "stroke-gray-400"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">{value.toFixed(1)}</span>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(price);
}

export default function ArtworkLightboxModal({ 
  isOpen, 
  onClose, 
  artwork, 
  isLiked, 
  onLike,
  lightboxConfig = {
    showPurchaseOptions: true,
    showVoteButton: false,
    showAddToCart: false,
    showHireCreator: false,
    showDownload: false,
    customButtons: []
  }
}: ArtworkLightboxModalProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showZoomLightbox, setShowZoomLightbox] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState('personal');
  const [copied, setCopied] = useState(false);
  const [isPromptUnlocked, setIsPromptUnlocked] = useState(() => {
    return !artwork.promptPrice || artwork.promptPrice === "0 ETH" || artwork.promptPrice === "Free";
  });

  // Mock data - in real app this would come from props
  const productData = {
    subtitle: "AI-generated masterpiece • High resolution",
    basePrice: 9.90,
    downloads: 57,
    tags: ["Cyberpunk", "Night", "AI Art", "Digital"],
    prompt: artwork.prompt || "A futuristic cyberpunk cityscape with neon lights reflecting on water, ultra detailed, 8K resolution",
    negativePrompt: "low quality, blurry, watermark, text",
    formats: ["JPG", "PNG", "PSD"],
    dpi: 300,
    size: { width: 4096, height: 5120, mb: 18.4 },
    creator: {
      name: artwork.artist.replace('@', ''),
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7GHspCzuQbnENC4YNyBxuRqupEMyh_RBRmdUbp58jhAVmxhp7wftD09ZJsxAsoCTpIDXiOuE8JwKh8t-svwOcgbfRO7o7RfijqncOyTZSKEuEuaNKjvpLp5hvTUdmJXcrtViw5P6getgnxJ42urBDJJ5frVlsM2LgcXDQEepIK8T4CFrMot15GZrD_wMjATnf-cBwCcgI2rFJIUTUxUH4B6G27Qo9jb44ycjITM0jlcif53PjYSnoit5J0emcc6c9xyrcbamQLos",
      sales: 1240,
      rating: 4.9
    },
    licenses: [
      {
        id: "personal",
        name: "Personal",
        desc: "Personal projects, social posts",
        multiplier: 1,
        bullets: ["Non-commercial use", "Social media allowed"]
      },
      {
        id: "commercial", 
        name: "Commercial",
        desc: "Business use, client work",
        multiplier: 2.2,
        bullets: ["Commercial use", "Up to 5,000 prints"]
      },
      {
        id: "extended",
        name: "Extended",
        desc: "Print-on-demand, unlimited",
        multiplier: 4.5,
        bullets: ["POD allowed", "Unlimited prints", "Priority support"]
      }
    ],
    reviews: [
      {
        user: "John S.",
        rating: 5,
        text: "Amazing quality! Used it for our website hero section and it looks incredible."
      },
      {
        user: "Maria D.",
        rating: 4,
        text: "Beautiful artwork with great attention to detail. Perfect for my project."
      }
    ],
    related: [
      {
        id: 1,
        title: "Neon Dreams",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
        price: "7.90"
      },
      {
        id: 2,
        title: "Digital Rain",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
        price: "8.90"
      },
      {
        id: 3,
        title: "Future City",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc",
        price: "12.90"
      },
      {
        id: 4,
        title: "Cyber Portal",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrs070e6Z-qpBuV15ndqNYidQUGFH7nPhxW8iINPKgVGI_Qxf-gZaNUYzplIskO8ofLdv5NGmRgYoopZD9LBy4lIqKkDrWhfnSbJRO9yA4zyvvHtQr4pD5paQCxc6GUI8GnjxGhM1RCss8VdLLliih89CjIzeAprIEEsaIKn6EaKm5wWNi8sPSz2_6coiLgzniOZHnHXV4bvg72sZ1QGMezuEthn_I2KyRyjsXibDtbsCc4hmvIkSb8YFTZH88CxE2IYuLf4mHX4",
        price: "15.90"
      },
      {
        id: 5,
        title: "Neon Streets",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6LAuZTz0K8X-y8tdsB8ojZaqlGDbX8lHRUBcl8NmSod_JIye0JuHRzlcshUBbbfEc1soVi55t03ea6BabgDELQ4qwY9vJr8yd5UJ9hnXqZ-FsZrWIx1PNObo4WTWNosjSqk-fzS51CfKUS8HWUzdS6vvb3syozJAyopcQ5ZBU_b2nEw8Z6fJUIuGjTXoGofz3aTbwwe4XeoIqHdLzqIwpHbd9pqGjK8zFjqlnDWllxCFp6sbjDo1B-dFecPEvUDtaWEAtowYNLfY",
        price: "6.90"
      },
      {
        id: 6,
        title: "Tech Noir",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
        price: "11.90"
      }
    ]
  };

  const currentLicense = useMemo(() => 
    productData.licenses.find(l => l.id === selectedLicense) || productData.licenses[0], 
    [selectedLicense]
  );
  
  const finalPrice = useMemo(() => 
    productData.basePrice * currentLicense.multiplier, 
    [currentLicense.multiplier]
  );

  // Handle mobile back button - must be at top level
  React.useEffect(() => {
    if (isOpen) {
      const handlePopState = (event: PopStateEvent) => {
        event.preventDefault();
        onClose();
        window.history.pushState(null, '', window.location.href);
      };
      
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen, onClose]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleUnlockPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPromptUnlocked(true);
    console.log('Prompt unlocked for:', artwork.title);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(productData.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  const shareOptions = [
    { name: 'Twitter', icon: '🐦', action: () => window.open(`https://twitter.com/intent/tweet?text=Check out this amazing AI art: ${artwork.title}`) },
    { name: 'Facebook', icon: '📘', action: () => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`) },
    { name: 'Pinterest', icon: '📌', action: () => window.open(`https://pinterest.com/pin/create/button/?url=${window.location.href}&description=${artwork.title}`) },
    { name: 'Copy Link', icon: '🔗', action: () => navigator.clipboard.writeText(window.location.href) }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background-light dark:bg-background-dark rounded-2xl max-w-7xl w-full max-h-[95vh] my-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="hover:text-primary cursor-pointer">Explore</span>
            <ChevronRight className="h-4 w-4" />
            <span className="hover:text-primary cursor-pointer">Cyberpunk</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white">{artwork.title}</span>
          </nav>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
            {/* Media Gallery - Left Side */}
            <div className="lg:col-span-7">
              {/* Main Image */}
              <div className="group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="h-full w-full object-cover"
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={onLike}
                      className={`rounded-full p-2 backdrop-blur-sm transition-all duration-300 ${
                        isLiked 
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/30" 
                          : "bg-white/80 text-gray-900 hover:bg-white hover:scale-110"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    
                    <div className="relative">
                      <button 
                        onClick={handleShare}
                        className="rounded-full bg-white/80 p-2 text-gray-900 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                      
                      {/* Share Menu */}
                      {showShareMenu && (
                        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[140px] z-50">
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
                    
                    <button
                      onClick={() => setShowZoomLightbox(true)}
                      className="rounded-full bg-white/80 p-2 text-gray-900 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description & Details */}
              <div className="mt-8 space-y-6">
                {/* Title & Info */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                      {artwork.title}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{productData.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Pill>
                      <Images className="h-4 w-4" /> {productData.size.width}×{productData.size.height}px
                    </Pill>
                    <Pill>
                      <Download className="h-4 w-4" /> {productData.downloads} downloads
                    </Pill>
                    <Pill>
                      <User className="h-4 w-4" /> By {productData.creator.name}
                    </Pill>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag) => (
                    <Badge key={tag}>#{tag}</Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  High-fidelity cyberpunk scene with moody neon reflections and cinematic depth. 
                  Perfect for landing pages, posters, and editorial use. This AI-generated masterpiece 
                  captures the essence of futuristic urban landscapes.
                </p>

                {/* AI Prompt Section */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">AI Generation Prompt</h3>
                    <button
                      onClick={copyPrompt}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <p className={`text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed ${
                      !isPromptUnlocked ? 'filter blur-sm select-none' : ''
                    }`}>
                      {productData.prompt}
                    </p>
                    
                    {!isPromptUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg">
                        <div className="text-center">
                          <Lock className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Prompt Locked</p>
                          <button
                            onClick={handleUnlockPrompt}
                            className="px-3 py-1 bg-primary text-white text-xs rounded-md hover:bg-primary/90 transition-colors"
                          >
                            Unlock for {artwork.promptPrice || "$5"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Negative prompt:</span> {productData.negativePrompt}
                    </div>
                  </div>
                </div>

                {/* Creator Section */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-4">
                    <img 
                      src={productData.creator.avatar} 
                      alt={productData.creator.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/50" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{productData.creator.name}</span>
                        <Badge>
                          <Sparkles className="h-3.5 w-3.5" /> Top Creator
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                        <span>Sales: {productData.creator.sales.toLocaleString()}</span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400"/> 
                          {productData.creator.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      View Portfolio
                    </button>
                    <button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                      Hire Creator
                    </button>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stars value={artwork.rating || 4.8} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {productData.reviews.length} reviews
                      </span>
                    </div>
                    <button className="text-sm text-primary hover:underline">Write a review</button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {productData.reviews.map((review, idx) => (
                      <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{review.user}</span>
                          <Stars value={review.rating} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">"{review.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Uses */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Perfect for</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-300/40">
                      <div className="text-2xl mb-2">🌐</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Websites</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Hero sections, backgrounds</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-300/40">
                      <div className="text-2xl mb-2">👕</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Merchandise</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">T-shirts, posters, prints</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-300/40">
                      <div className="text-2xl mb-2">🎮</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Games</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Concept art, backgrounds</div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="rounded-lg bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Formats</span>
                      <div className="mt-1 font-medium text-gray-900 dark:text-white">{productData.formats.join(", ")}</div>
                    </div>
                    <div className="rounded-lg bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Resolution</span>
                      <div className="mt-1 font-medium text-gray-900 dark:text-white">{productData.size.width}×{productData.size.height}</div>
                    </div>
                    <div className="rounded-lg bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">DPI</span>
                      <div className="mt-1 font-medium text-gray-900 dark:text-white">{productData.dpi}</div>
                    </div>
                    <div className="rounded-lg bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">File Size</span>
                      <div className="mt-1 font-medium text-gray-900 dark:text-white">{productData.size.mb} MB</div>
                    </div>
                  </div>
                </div>

                {/* Related Artworks */}
                <div className="mt-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">You may also like</h3>
                    <button className="text-sm text-primary hover:underline">See all</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {productData.related.map((item) => (
                      <div key={item.id} className="group block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                        <div className="aspect-[4/5] overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-2 text-sm">
                          <span className="line-clamp-1 text-gray-900 dark:text-white">{item.title}</span>
                          <span className="font-medium text-primary">${item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Purchase Card - Right Side */}
            <div className="lg:col-span-5">
              <div className="sticky top-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg bg-white dark:bg-gray-900">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Get this artwork</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Instant download • Multiple licenses</p>
                  </div>
                  <Stars value={artwork.rating || 4.8} />
                </div>

                {/* License Selector */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Choose License</h3>
                  {productData.licenses.map((license) => (
                    <label 
                      key={license.id} 
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedLicense === license.id 
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="license"
                        className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                        checked={selectedLicense === license.id}
                        onChange={() => setSelectedLicense(license.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-gray-900 dark:text-white">{license.name}</div>
                          <div className="text-sm font-bold text-primary">
                            {formatPrice(productData.basePrice * license.multiplier)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{license.desc}</div>
                        <div className="flex flex-wrap gap-2">
                          {license.bullets.map((bullet) => (
                            <span key={bullet} className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <CheckCircle2 className="h-3 w-3 text-green-500" /> {bullet}
                            </span>
                          ))}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Price & Actions */}
                <div className="mb-6">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-xs uppercase text-gray-500 dark:text-gray-400">Total Price</div>
                      <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {formatPrice(finalPrice)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:glow transition-all duration-300">
                      <DollarSign className="h-5 w-5" /> Buy Now
                    </button>
                    
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Bundle Offer */}
                <div className="mb-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white">Bundle Deal</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary text-white font-bold">Save 20%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Buy 3 artworks from this creator and save 20%
                  </p>
                  <button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                    🎉 View Bundle
                  </button>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Secure Payment</h4>
                  <div className="flex items-center justify-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <CreditCard className="h-4 w-4" />
                      Stripe
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Wallet className="h-4 w-4" />
                      PayPal
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <BadgeCheck className="h-4 w-4" />
                      Crypto
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 text-xs mb-6">
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800">
                    <ShieldCheck className="h-4 w-4 text-green-500" /> 
                    <span className="text-gray-700 dark:text-gray-300">Safe checkout</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800">
                    <Lock className="h-4 w-4 text-blue-500" /> 
                    <span className="text-gray-700 dark:text-gray-300">License included</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800">
                    <Download className="h-4 w-4 text-purple-500" /> 
                    <span className="text-gray-700 dark:text-gray-300">Instant download</span>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-300/40 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Already downloaded by {productData.downloads} people
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Join the community of satisfied customers
                  </div>
                </div>

                {/* Licensing Info */}
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Personal use allowed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Commercial use (with license)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-3 w-3 text-red-500" />
                    <span>No resale as stock</span>
                  </div>
                  <p className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    By purchasing, you agree to the{" "}
                    <button className="text-primary hover:underline">License Terms</button> and{" "}
                    <button className="text-primary hover:underline">Creator Agreement</button>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur p-3 lg:hidden">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{currentLicense.name} license</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(finalPrice)}</div>
            </div>
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30">
              <DollarSign className="h-4 w-4" /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Zoom Lightbox */}
      {showZoomLightbox && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowZoomLightbox(false)}
        >
          <button 
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors" 
            onClick={() => setShowZoomLightbox(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex h-full items-center justify-center">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}