import React from 'react';
import { Users, Star, Trophy, Briefcase, Share2, Expand } from 'lucide-react';

export default function CreatorsPage() {
  const creators = [
    {
      id: 1,
      name: "Alex Chen",
      username: "@alexai_art",
      speciality: "Cyberpunk & Sci-Fi",
      rating: 4.9,
      artworks: 156,
      followers: "12.5K",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7GHspCzuQbnENC4YNyBxuRqupEMyh_RBRmdUbp58jhAVmxhp7wftD09ZJsxAsoCTpIDXiOuE8JwKh8t-svwOcgbfRO7o7RfijqncOyTZSKEuEuaNKjvpLp5hvTUdmJXcrtViw5P6getgnxJ42urBDJJ5frVlsM2LgcXDQEepIK8T4CFrMot15GZrD_wMjATnf-cBwCcgI2rFJIUTUxUH4B6G27Qo9jb44ycjITM0jlcif53PjYSnoit5J0emcc6c9xyrcbamQLos",
      portfolio: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc"
      ]
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      username: "@maya_dreams",
      speciality: "Fantasy & Nature",
      rating: 4.8,
      artworks: 203,
      followers: "18.2K",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
      portfolio: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrs070e6Z-qpBuV15ndqNYidQUGFH7nPhxW8iINPKgVGI_Qxf-gZaNUYzplIskO8ofLdv5NGmRgYoopZD9LBy4lIqKkDrWhfnSbJRO9yA4zyvvHtQr4pD5paQCxc6GUI8GnjxGhM1RCss8VdLLliih89CjIzeAprIEEsaIKn6EaKm5wWNi8sPSz2_6coiLgzniOZHnHXV4bvg72sZ1QGMezuEthn_I2KyRyjsXibDtbsCc4hmvIkSb8YFTZH88CxE2IYuLf4mHX4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI"
      ]
    }
  ];

  return (


    <div className="min-h-screen">
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Top AI Art Creators
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Connect with talented AI artists and hire them for your next creative project.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
              <Users className="text-primary mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Creators</p>
            </div>
            <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
              <Trophy className="text-primary mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15,000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Artworks Created</p>
            </div>
            <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
              <Briefcase className="text-primary mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,200+</h3>
              <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1"
                style={{
                  backgroundImage: `url(${creator.portfolio[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-all duration-300"></div>
                
                {/* Content overlay */}
                <div className="relative z-10">
                  {/* Full height content area */}
                  <div className="h-full flex flex-col">
                    {/* Header with avatar and rating */}
                    <div className="flex items-start justify-between p-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-white/90 shadow-lg"
                      />
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="font-bold text-sm">{creator.rating}</span>
                      </div>
                    </div>

                    {/* Spacer to push content to bottom */}
                    <div className="flex-1"></div>

                    {/* Bottom content area - lightbox style */}
                    <div className="p-6 glassmorphism backdrop-blur-xl bg-black/40 border-t border-white/20">
                      {/* Creator Info */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {creator.name}
                        </h3>
                        <p className="text-primary font-medium mb-1">{creator.username}</p>
                        <p className="text-white/80 text-sm">
                          {creator.speciality}
                        </p>
                      </div>

                      {/* Stats - lightbox style */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white">{creator.artworks}</span>
                          <span className="text-white/70 text-xs">Artworks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white">{creator.followers}</span>
                          <span className="text-white/70 text-xs">Followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span className="font-bold text-white">{creator.rating}</span>
                        </div>
                      </div>

                      {/* Action Buttons - lightbox style */}
                      <div className="space-y-3">
                        {/* Primary Action */}
                        <button className="w-full bg-primary text-white py-4 px-6 rounded-xl hover:bg-primary/90 hover:glow transition-all duration-300 font-bold text-lg shadow-lg shadow-primary/30">
                          Hire Creator
                        </button>
                        
                        {/* Secondary Actions */}
                        <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold backdrop-blur-sm">
                            Portfolio
                          </button>
                          <button className="flex items-center justify-center gap-2 py-3 px-4 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors font-bold backdrop-blur-sm">
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-bold">
              Load More Creators
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}