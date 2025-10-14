import React from 'react';
import {   Heart } from 'lucide-react';
import { ProductCard } from '../cards/ProductCard';

export function WeeklyWinnersSection() {
  const winners = [
    {
      id: 1,
      title: "Cybernetic Dreamscape",
      artist: "ArtistA",
      price: "$1,250",
      priceValue: 1250,
      rating: 4.8,
      likes: 234,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
      prompt: "Cybernetic dreamscape with neural networks and digital consciousness, ultra detailed, 8K resolution",
      promptPrice: "$200"
    },
    {
      id: 2,
      title: "Galactic Odyssey",
      artist: "ArtistB",
      price: "$2,100",
      priceValue: 2100,
      rating: 4.9,
      likes: 456,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
      prompt: "Epic galactic odyssey with space exploration and cosmic phenomena, cinematic lighting",
      promptPrice: "$300"
    },
    {
      id: 3,
      title: "Neon Noir",
      artist: "ArtistC",
      price: "$890",
      priceValue: 890,
      rating: 4.7,
      likes: 189,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
      prompt: "Neon noir cyberpunk scene with dramatic lighting and urban atmosphere",
      promptPrice: "$150"
    },
    {
      id: 4,
      title: "Quantum Bloom",
      artist: "ArtistD",
      price: "$1,450",
      priceValue: 1450,
      rating: 4.6,
      likes: 298,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc",
      prompt: "Quantum bloom with particle effects and energy fields, abstract digital art",
      promptPrice: "$180"
    },
    {
      id: 5,
      title: "Future Relics",
      artist: "ArtistE",
      price: "$750",
      priceValue: 750,
      rating: 4.5,
      likes: 167,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrs070e6Z-qpBuV15ndqNYidQUGFH7nPhxW8iINPKgVGI_Qxf-gZaNUYzplIskO8ofLdv5NGmRgYoopZD9LBy4lIqKkDrWhfnSbJRO9yA4zyvvHtQr4pD5paQCxc6GUI8GnjxGhM1RCss8VdLLliih89CjIzeAprIEEsaIKn6EaKm5wWNi8sPSz2_6coiLgzniOZHnHXV4bvg72sZ1QGMezuEthn_I2KyRyjsXibDtbsCc4hmvIkSb8YFTZH88CxE2IYuLf4mHX4",
      prompt: "Future relics and archaeological discoveries in cyberpunk setting",
      promptPrice: "$120"
    }
  ];

  return (
    <section className="bg-background-light dark:bg-background-dark py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
          Top 5 Weekly Winners
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {winners.map((winner) => (
            <ProductCard
              key={winner.id}
              artwork={winner}
              lightboxConfig={{
                showPurchaseOptions: true,
                showAddToCart: true,
                showHireCreator: true,
                showDownload: false,
                showVoteButton: false,
                customButtons: [
                  {
                    label: 'View Profile',
                    icon: <Heart size={18} />,
                    onClick: (artwork) => console.log('View profile:', artwork.artist),
                    variant: 'secondary'
                  }
                ]
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}