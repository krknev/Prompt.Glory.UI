"use client"
import React from 'react';
import { Search, Filter, Grid2x2 as Grid, List, TrendingUp, X, ChevronDown, Heart } from 'lucide-react';
import { ProductCard } from '@/components/cards/ProductCard';

export default function ExplorePage() {
  const categories = [
    { name: "Cyberpunk", count: 1234, color: "from-purple-500 to-pink-500" },
    { name: "Fantasy", count: 987, color: "from-green-500 to-blue-500" },
    { name: "Abstract", count: 756, color: "from-yellow-500 to-red-500" },
    { name: "Portraits", count: 543, color: "from-blue-500 to-purple-500" },
    { name: "Landscapes", count: 432, color: "from-green-500 to-teal-500" },
    { name: "Sci-Fi", count: 321, color: "from-cyan-500 to-blue-500" }
  ];

  const artworks = [
    {
      id: 1,
      title: "Digital Dreams",
      artist: "AIArtist_01",
      price: "$1,250",
      priceValue: 1250,
      rating: 4.8,
      likes: 234,
      category: "Cyberpunk",
      tags: ["cyberpunk", "neon", "cityscape"],
      createdAt: "2024-01-15",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
      prompt: "A futuristic cyberpunk cityscape with neon lights reflecting on water, ultra detailed, 8K resolution, digital art masterpiece",
      promptPrice: "$250"
    },
    {
      id: 2,
      title: "Cosmic Voyage",
      artist: "SpaceCreator",
      price: "$3,000",
      priceValue: 3000,
      rating: 4.9,
      likes: 456,
      category: "Sci-Fi",
      tags: ["space", "galaxy", "cosmic"],
      createdAt: "2024-01-10",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
      prompt: "Epic space exploration scene with galaxies, nebulas, and cosmic phenomena, photorealistic, cinematic lighting",
      promptPrice: "$375"
    },
    {
      id: 3,
      title: "Neon Nights",
      artist: "CyberArt",
      price: "$2,000",
      priceValue: 2000,
      rating: 4.7,
      likes: 189,
      category: "Cyberpunk",
      tags: ["neon", "night", "urban"],
      createdAt: "2024-01-12",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
      prompt: "Neon-lit urban street scene at night, rain reflections, cyberpunk aesthetic, moody atmosphere",
      promptPrice: "$200"
    },
    {
      id: 4,
      title: "Abstract Reality",
      artist: "ModernMind",
      price: "$750",
      priceValue: 750,
      rating: 4.6,
      likes: 123,
      category: "Abstract",
      tags: ["abstract", "geometric", "modern"],
      createdAt: "2024-01-08",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc",
      prompt: "Abstract geometric patterns with flowing colors, modern art style, vibrant palette, digital composition",
      promptPrice: "$125"
    }
  ];

  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({
    priceRange: { min: '', max: '' },
    category: '',
    rating: '',
    sortBy: 'newest',
    searchTerm: '',
    tags: [] as string[],
    artist: '',
    promptAvailable: false,
    onSale: false
  });
  const [filteredArtworks, setFilteredArtworks] = React.useState(artworks);

  const ratingOptions = ["All", "4.5+", "4.0+", "3.5+", "3.0+"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" }
  ];

  // Filter and sort artworks
  React.useEffect(() => {
    let filtered = [...artworks];

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(artwork => artwork.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(artwork => artwork.priceValue >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(artwork => artwork.priceValue <= parseFloat(filters.priceRange.max));
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      filtered = filtered.filter(artwork => artwork.rating >= minRating);
    }

    // Artist filter
    if (filters.artist) {
      filtered = filtered.filter(artwork => 
        artwork.artist.toLowerCase().includes(filters.artist.toLowerCase())
      );
    }

    // Prompt available filter
    if (filters.promptAvailable) {
      filtered = filtered.filter(artwork => artwork.prompt);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredArtworks(filtered);
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: value }
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      category: '',
      rating: '',
      sortBy: 'newest',
      searchTerm: '',
      tags: [],
      artist: '',
      promptAvailable: false,
      onSale: false
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'string') return value !== '';
    if (typeof value === 'boolean') return value;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== '');
    }
    return false;
  }).length;
  return (


    <div className="min-h-screen">
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Explore AI Art
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Discover amazing AI-generated artworks from creators around the world.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for artworks, artists, or styles..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-background-light dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-4 sm:px-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors relative text-sm sm:text-base"
              >
                <Filter size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 sm:px-4 py-2 bg-background-light dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white text-sm sm:text-base"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-xs sm:text-sm"
                >
                  <X size={14} />
                  Clear All
                </button>
              )}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              Showing {filteredArtworks.length} of {artworks.length} artworks
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mb-8 rounded-xl bg-background-light dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-4 sm:p-6 backdrop-blur-sm mx-4 sm:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300"
                  >
                    {categories.map(category => (
                      <option key={category.name} value={category.name === 'All' ? '' : category.color}>
                       {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range (USD)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300"
                      step="0.1"
                      min="0"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300"
                  >
                    {ratingOptions.map(rating => (
                      <option key={rating} value={rating === 'All' ? '' : rating}>
                        {rating === 'All' ? 'Any Rating' : `${rating} Stars`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Artist Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Artist
                  </label>
                  <input
                    type="text"
                    placeholder="Search by artist..."
                    value={filters.artist}
                    onChange={(e) => handleFilterChange('artist', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300"
                  />
                </div>

                {/* Additional Filters */}
                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Options
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.promptAvailable}
                        onChange={(e) => handleFilterChange('promptAvailable', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Prompt Available
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.onSale}
                        onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        On Sale
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
                    
                    {filters.category && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Category: {filters.category}
                        <button onClick={() => handleFilterChange('category', '')}>
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {(filters.priceRange.min || filters.priceRange.max) && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Price: ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                        <button onClick={() => handleFilterChange('priceRange', { min: '', max: '' })}>
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filters.rating && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Rating: {filters.rating}+ stars
                        <button onClick={() => handleFilterChange('rating', '')}>
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filters.artist && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Artist: {filters.artist}
                        <button onClick={() => handleFilterChange('artist', '')}>
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filters.promptAvailable && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Prompt Available
                        <button onClick={() => handleFilterChange('promptAvailable', false)}>
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    
                    {filters.onSale && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        On Sale
                        <button onClick={() => handleFilterChange('onSale', false)}>
                          <X size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Categories */}
          <section className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 px-4 sm:px-0">
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 px-4 sm:px-0">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 hover:glow-border"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative z-10">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {category.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {category.count} artworks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3 px-4 sm:px-0">
                <TrendingUp className="text-primary" size={28} />
                Explore Artworks
              </h3>
              <div className="flex items-center gap-2 px-4 sm:px-0">
                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Grid size={20} />
                </button>
                <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Artwork Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
              {filteredArtworks.map((artwork) => (
                <ProductCard 
                  key={artwork.id} 
                  artwork={artwork}
                  lightboxConfig={{
                    showPurchaseOptions: false,
                    showAddToCart: false,
                    showHireCreator: true,
                    showDownload: true,
                    showVoteButton: false,
                    customButtons: [
                      {
                        label: 'Add to Favorites',
                        icon: <Heart size={18} />,
                        onClick: (artwork) => console.log('Added to favorites:', artwork),
                        variant: 'secondary'
                      }
                    ]
                  }}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredArtworks.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-fit mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No artworks found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>

          {/* Load More */}
          {filteredArtworks.length > 0 && (
            <div className="text-center">
              <button className="px-8 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-bold">
                Load More Artworks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}